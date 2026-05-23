// Neural Network Animation
class NeuralNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.neurons = [];
        this.connections = [];
        this.pulses = [];
        this.neuronCount = 50;
        this.maxDistance = 150;

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());

        // Update colors when theme changes
        this.updateColors();
        const observer = new MutationObserver(() => this.updateColors());
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

    updateColors() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        this.neuronColor = isDark ? 'rgba(226, 109, 92, 1)' : 'rgba(43, 58, 103, 1)';
        this.connectionColor = isDark ? 'rgba(226, 109, 92, 0.5)' : 'rgba(43, 58, 103, 0.5)';
        this.pulseColor = isDark ? 'rgba(226, 109, 92, 1)' : 'rgba(43, 58, 103, 1)';
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    init() {
        // Create neurons
        this.neurons = [];
        for (let i = 0; i < this.neuronCount; i++) {
            this.neurons.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 2,
                active: false,
                pulseTimer: 0
            });
        }

        // Create connections
        this.connections = [];
        for (let i = 0; i < this.neurons.length; i++) {
            for (let j = i + 1; j < this.neurons.length; j++) {
                const dx = this.neurons[i].x - this.neurons[j].x;
                const dy = this.neurons[i].y - this.neurons[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.maxDistance) {
                    this.connections.push({
                        from: i,
                        to: j,
                        distance: distance
                    });
                }
            }
        }

        // Initialize pulses
        this.pulses = [];
    }

    createPulse(fromIndex, toIndex) {
        this.pulses.push({
            from: fromIndex,
            to: toIndex,
            progress: 0,
            speed: 0.02 + Math.random() * 0.03
        });
    }

    triggerRandomNeuron() {
        const index = Math.floor(Math.random() * this.neurons.length);
        const neuron = this.neurons[index];
        neuron.active = true;
        neuron.pulseTimer = 30;

        // Send pulses to connected neurons
        this.connections.forEach(conn => {
            if (conn.from === index) {
                this.createPulse(conn.from, conn.to);
            } else if (conn.to === index) {
                this.createPulse(conn.to, conn.from);
            }
        });
    }

    update() {
        // Update neurons
        this.neurons.forEach(neuron => {
            neuron.x += neuron.vx;
            neuron.y += neuron.vy;

            // Bounce off walls
            if (neuron.x < 0 || neuron.x > this.width) neuron.vx *= -1;
            if (neuron.y < 0 || neuron.y > this.height) neuron.vy *= -1;

            // Keep in bounds
            neuron.x = Math.max(0, Math.min(this.width, neuron.x));
            neuron.y = Math.max(0, Math.min(this.height, neuron.y));

            // Update pulse timer
            if (neuron.pulseTimer > 0) {
                neuron.pulseTimer--;
            } else {
                neuron.active = false;
            }
        });

        // Update connections dynamically
        if (Math.random() < 0.05) {
            this.connections = [];
            for (let i = 0; i < this.neurons.length; i++) {
                for (let j = i + 1; j < this.neurons.length; j++) {
                    const dx = this.neurons[i].x - this.neurons[j].x;
                    const dy = this.neurons[i].y - this.neurons[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.maxDistance) {
                        this.connections.push({
                            from: i,
                            to: j,
                            distance: distance
                        });
                    }
                }
            }
        }

        // Update pulses
        this.pulses = this.pulses.filter(pulse => {
            pulse.progress += pulse.speed;
            if (pulse.progress >= 1) {
                // Activate target neuron
                this.neurons[pulse.to].active = true;
                this.neurons[pulse.to].pulseTimer = 30;
                return false;
            }
            return true;
        });

        // Trigger random neurons periodically
        if (Math.random() < 0.02) {
            this.triggerRandomNeuron();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw connections
        this.connections.forEach(conn => {
            const from = this.neurons[conn.from];
            const to = this.neurons[conn.to];
            const opacity = 1 - (conn.distance / this.maxDistance);

            this.ctx.strokeStyle = this.connectionColor.replace('0.5', opacity * 0.5);
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            this.ctx.lineTo(to.x, to.y);
            this.ctx.stroke();
        });

        // Draw pulses
        this.pulses.forEach(pulse => {
            const from = this.neurons[pulse.from];
            const to = this.neurons[pulse.to];
            const x = from.x + (to.x - from.x) * pulse.progress;
            const y = from.y + (to.y - from.y) * pulse.progress;

            // Pulse glow
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 12);
            gradient.addColorStop(0, this.pulseColor);
            gradient.addColorStop(1, this.pulseColor.replace('1)', '0)'));

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 12, 0, Math.PI * 2);
            this.ctx.fill();

            // Pulse core
            this.ctx.fillStyle = this.pulseColor;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 5, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw neurons
        this.neurons.forEach(neuron => {
            if (neuron.active) {
                // Active neuron glow
                const gradient = this.ctx.createRadialGradient(
                    neuron.x, neuron.y, 0,
                    neuron.x, neuron.y, neuron.radius * 4
                );
                gradient.addColorStop(0, this.pulseColor);
                gradient.addColorStop(1, this.pulseColor.replace('1)', '0)'));

                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(neuron.x, neuron.y, neuron.radius * 4, 0, Math.PI * 2);
                this.ctx.fill();
            }

            // Neuron
            this.ctx.fillStyle = neuron.active ? this.pulseColor : this.neuronColor;
            this.ctx.beginPath();
            this.ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize neural network animation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new NeuralNetwork('neural-network-canvas');
    });
} else {
    new NeuralNetwork('neural-network-canvas');
}
