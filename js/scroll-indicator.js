// Scroll Indicator Controller

class ScrollIndicator {
    constructor() {
        this.indicator = document.getElementById('scroll-indicator');
        this.progressCircle = document.getElementById('progress-circle');
        this.positionText = document.getElementById('scroll-position-text');
        this.circumference = 163.4; // 2 * PI * 26 (radius)

        if (!this.indicator || !this.progressCircle || !this.positionText) return;

        this.init();
    }

    init() {
        // Listen for scroll events on active section
        this.updateIndicator();

        // Set up mutation observer to watch for section changes
        this.observeSections();
    }

    observeSections() {
        // Watch for class changes on sections
        const observer = new MutationObserver(() => {
            this.updateIndicator();
        });

        const sections = document.querySelectorAll('.section, .hero-section');
        sections.forEach(section => {
            observer.observe(section, {
                attributes: true,
                attributeFilter: ['class']
            });

            // Add scroll listener to each section
            section.addEventListener('scroll', () => {
                if (section.classList.contains('active')) {
                    this.updateIndicator();
                }
            });
        });
    }

    updateIndicator() {
        const activeSection = document.querySelector('.section.active, .hero-section.active');

        if (!activeSection) {
            this.indicator.classList.remove('visible');
            return;
        }

        // Always show indicator
        this.indicator.classList.add('visible');

        // Check if section has scrollable content
        const hasScroll = activeSection.scrollHeight > activeSection.clientHeight + 10;

        if (!hasScroll) {
            // No scroll needed - show as complete/ready for next
            this.progressCircle.style.strokeDashoffset = 0;
            this.positionText.textContent = 'Next →';
            this.indicator.classList.add('at-bottom', 'ready-next');
            return;
        }

        // Calculate scroll progress
        const scrollTop = activeSection.scrollTop;
        const scrollHeight = activeSection.scrollHeight - activeSection.clientHeight;
        const scrollProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

        // Update progress circle
        const offset = this.circumference - (scrollProgress * this.circumference);
        this.progressCircle.style.strokeDashoffset = offset;

        // Update position text and states
        this.indicator.classList.remove('at-bottom', 'ready-next');

        if (scrollProgress < 0.3) {
            this.positionText.textContent = 'Start';
        } else if (scrollProgress < 0.7) {
            this.positionText.textContent = 'Middle';
        } else if (scrollProgress < 0.95) {
            this.positionText.textContent = 'Almost';
        } else {
            this.positionText.textContent = 'Next →';
            this.indicator.classList.add('at-bottom', 'ready-next');
        }
    }

    hide() {
        this.indicator.classList.remove('visible');
    }

    show() {
        this.indicator.classList.add('visible');
    }
}

// Initialize scroll indicator
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ScrollIndicator();
    });
} else {
    new ScrollIndicator();
}
