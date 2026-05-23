// Full Page Fixed Sections - Like a Slideshow

class FullPageScroll {
    constructor() {
        this.currentSection = 0;
        this.sections = [];
        this.isScrolling = false;
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.scrollPositions = {}; // Store scroll positions for each section

        this.init();
    }

    init() {
        // Disable on mobile and tablets - use static scrolling instead
        if (window.innerWidth <= 1024) {
            console.log('Mobile/Tablet detected - scroll-snap disabled');
            // Remove all animation classes on mobile
            document.querySelectorAll('.section, .hero-section').forEach(section => {
                section.classList.remove('active', 'prev');
                section.style.position = 'relative';
                section.style.opacity = '1';
                section.style.visibility = 'visible';
                section.style.transform = 'none';
            });
            return; // Exit - no full-page scroll on mobile
        }

        // Get hero section first, then other sections in order
        const heroSection = document.querySelector('.hero-section');
        const otherSections = Array.from(document.querySelectorAll('.section'));

        this.sections = heroSection ? [heroSection, ...otherSections] : otherSections;

        if (this.sections.length === 0) return;

        // Check if there's a hash in the URL
        const hash = window.location.hash.substring(1);
        let initialIndex = 0;

        if (hash) {
            const hashIndex = this.sections.findIndex(section => section.id === hash);
            if (hashIndex !== -1) {
                initialIndex = hashIndex;
            }
        }

        // Ensure all sections start hidden except initial
        this.sections.forEach((section, index) => {
            section.classList.remove('active', 'prev');
            if (index < initialIndex) {
                section.classList.add('prev');
            } else if (index === initialIndex) {
                section.classList.add('active');
            }
        });

        // Set current section
        this.currentSection = initialIndex;

        // Handle wheel scroll
        this.handleWheelScroll();

        // Handle keyboard navigation
        this.handleKeyboard();

        // Handle touch navigation
        this.handleTouch();

        // Handle navigation clicks
        this.handleNavigation();

        // Handle hero button clicks
        this.handleHeroButtons();

        // Update nav active state immediately
        setTimeout(() => {
            this.updateNavigation();
        }, 100);
    }

    showSection(index, direction = 'next') {
        if (index < 0 || index >= this.sections.length) return;
        if (this.isScrolling && index === this.currentSection) return;

        this.isScrolling = true;
        const previousSection = this.currentSection;
        const prevSectionElement = this.sections[previousSection];

        // Save scroll position of current section before leaving
        if (prevSectionElement) {
            const sectionId = prevSectionElement.id;
            this.scrollPositions[sectionId] = prevSectionElement.scrollTop;
        }

        this.currentSection = index;

        // Add prev class to previous section for slide-out animation
        if (direction === 'next') {
            this.sections.forEach((section, i) => {
                section.classList.remove('prev');
                if (i < index) {
                    section.classList.add('prev');
                }
            });
        } else {
            this.sections.forEach((section, i) => {
                section.classList.remove('prev');
                if (i < index) {
                    section.classList.add('prev');
                }
            });
        }

        // Remove active from all
        this.sections.forEach(section => {
            section.classList.remove('active');
        });

        // Add active to current
        const currentSectionElement = this.sections[index];
        currentSectionElement.classList.add('active');

        // Update URL hash without triggering scroll
        const sectionId = currentSectionElement.id;
        if (sectionId) {
            history.replaceState(null, null, `#${sectionId}`);
        }

        // Restore saved scroll position or reset to top
        if (direction === 'prev' && this.scrollPositions[sectionId] !== undefined) {
            // Going back - restore scroll position
            setTimeout(() => {
                currentSectionElement.scrollTop = this.scrollPositions[sectionId];
            }, 50);
        } else if (direction === 'next') {
            // Going forward - start at top
            currentSectionElement.scrollTop = 0;
        }

        // Update navigation
        this.updateNavigation();

        // Animate fade-in elements
        const fadeElements = currentSectionElement.querySelectorAll('.fade-in');
        fadeElements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, i * 100);
        });

        // Allow next scroll after transition (shorter to allow navigation clicks)
        setTimeout(() => {
            this.isScrolling = false;
        }, 800);
    }

    isAtTop(element) {
        return element.scrollTop <= 5;
    }

    isAtBottom(element) {
        const tolerance = 5;
        return element.scrollHeight - element.clientHeight - element.scrollTop < tolerance;
    }

    canScrollDown(element) {
        return element.scrollTop + element.clientHeight < element.scrollHeight - 5;
    }

    canScrollUp(element) {
        return element.scrollTop > 5;
    }

    handleWheelScroll() {
        let wheelTimeout;
        let wheelDelta = 0;
        let lastWheelTime = 0;

        window.addEventListener('wheel', (e) => {
            if (this.isScrolling) {
                e.preventDefault();
                return;
            }

            const now = Date.now();
            const activeSection = this.sections[this.currentSection];
            if (!activeSection) return;

            const scrollingDown = e.deltaY > 0;
            const scrollingUp = e.deltaY < 0;

            // Special handling for hero section (usually doesn't scroll)
            const isHeroSection = activeSection.classList.contains('hero-section');

            // Check if section has scrollable content with better tolerance
            const hasScroll = activeSection.scrollHeight > activeSection.clientHeight + 20;

            if (hasScroll) {
                // Section has scrollable content - allow scrolling within section
                const atTop = this.isAtTop(activeSection);
                const atBottom = this.isAtBottom(activeSection);

                if (scrollingDown && atBottom) {
                    // At bottom and scrolling down - go to next section
                    e.preventDefault();

                    if (now - lastWheelTime > 300) {
                        wheelDelta = 0;
                    }

                    wheelDelta += Math.abs(e.deltaY);
                    lastWheelTime = now;

                    clearTimeout(wheelTimeout);
                    wheelTimeout = setTimeout(() => {
                        if (wheelDelta > 50) { // Increased threshold
                            this.nextSection();
                            wheelDelta = 0;
                        }
                    }, 150);
                } else if (scrollingUp && atTop) {
                    // At top and scrolling up - go to previous section
                    e.preventDefault();

                    if (now - lastWheelTime > 300) {
                        wheelDelta = 0;
                    }

                    wheelDelta += Math.abs(e.deltaY);
                    lastWheelTime = now;

                    clearTimeout(wheelTimeout);
                    wheelTimeout = setTimeout(() => {
                        if (wheelDelta > 50) { // Increased threshold
                            this.prevSection();
                            wheelDelta = 0;
                        }
                    }, 150);
                } else {
                    // Not at edge - allow normal scrolling within section
                    // Don't prevent default here
                }
            } else {
                // No scrollable content (like hero section) - directly navigate
                e.preventDefault();

                if (now - lastWheelTime > 300) {
                    wheelDelta = 0;
                }

                wheelDelta += Math.abs(e.deltaY);
                lastWheelTime = now;

                clearTimeout(wheelTimeout);
                wheelTimeout = setTimeout(() => {
                    if (wheelDelta > 50) {
                        if (scrollingDown) {
                            this.nextSection();
                        } else {
                            this.prevSection();
                        }
                        wheelDelta = 0;
                    }
                }, 150);
            }
        }, { passive: false });
    }

    handleKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (this.isScrolling) return;

            if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
                e.preventDefault();
                this.nextSection();
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                this.prevSection();
            } else if (e.key === 'Home') {
                e.preventDefault();
                this.showSection(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                this.showSection(this.sections.length - 1);
            }
        });
    }

    handleTouch() {
        window.addEventListener('touchstart', (e) => {
            this.touchStartY = e.touches[0].clientY;
        });

        window.addEventListener('touchend', (e) => {
            this.touchEndY = e.changedTouches[0].clientY;
            const deltaY = this.touchStartY - this.touchEndY;

            if (Math.abs(deltaY) > 50) {
                if (deltaY > 0) {
                    this.nextSection();
                } else {
                    this.prevSection();
                }
            }
        });
    }

    handleNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Skip external pages (blog.html, post.html, etc.)
                if (href && (href === 'blog.html' || href === 'post.html' || href.endsWith('.html'))) {
                    // Let browser handle normal navigation
                    return;
                }

                // Handle both #section and index.html#section formats
                let targetId = null;
                if (href && href.startsWith('#')) {
                    targetId = href.substring(1);
                } else if (href && href.includes('#')) {
                    // Extract hash from index.html#section format
                    const parts = href.split('#');
                    if (parts.length > 1) {
                        targetId = parts[1];
                    }
                }

                if (targetId) {
                    e.preventDefault();

                    // Close mobile menu if open
                    if (window.innerWidth <= 1024) {
                        const navMenu = document.querySelector('.nav-menu');
                        const menuToggle = document.querySelector('.mobile-menu-toggle');
                        if (navMenu) navMenu.classList.remove('active');
                        if (menuToggle) menuToggle.classList.remove('active');
                    }

                    const targetIndex = this.sections.findIndex(section =>
                        section.id === targetId
                    );

                    if (targetIndex !== -1 && targetIndex !== this.currentSection) {
                        // Force immediate transition for navigation clicks
                        this.isScrolling = false;
                        this.showSection(targetIndex, targetIndex > this.currentSection ? 'next' : 'prev');
                    } else if (targetIndex === this.currentSection) {
                        // Already on this section - just ensure it's visible
                        this.showSection(targetIndex, 'next');
                    }
                }
            });
        });
    }

    handleHeroButtons() {
        const heroButtons = document.querySelectorAll('.hero-buttons a');

        heroButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const href = button.getAttribute('href');

                // Handle hash links
                if (href && href.startsWith('#')) {
                    e.preventDefault();

                    // Close mobile menu if open
                    if (window.innerWidth <= 1024) {
                        const navMenu = document.querySelector('.nav-menu');
                        const menuToggle = document.querySelector('.mobile-menu-toggle');
                        if (navMenu) navMenu.classList.remove('active');
                        if (menuToggle) menuToggle.classList.remove('active');
                    }

                    const targetId = href.substring(1);
                    const targetIndex = this.sections.findIndex(section =>
                        section.id === targetId
                    );

                    if (targetIndex !== -1 && targetIndex !== this.currentSection) {
                        this.isScrolling = false;
                        this.showSection(targetIndex, targetIndex > this.currentSection ? 'next' : 'prev');
                    }
                }
            });
        });
    }

    updateNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentSection = this.sections[this.currentSection];
        const currentId = currentSection ? currentSection.id : '';

        let foundActive = false;

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            // Handle both direct hash links and index.html#hash links
            if (href === `#${currentId}` || href === `index.html#${currentId}`) {
                link.classList.add('active');
                foundActive = true;
            }
        });

        // Update the nav indicator position
        setTimeout(() => {
            const activeLink = document.querySelector('.nav-link.active');
            if (activeLink && window.updateNavIndicator) {
                window.updateNavIndicator(activeLink, false);
            }
        }, 50);
    }

    nextSection() {
        if (this.currentSection < this.sections.length - 1) {
            this.showSection(this.currentSection + 1, 'next');
        }
    }

    prevSection() {
        if (this.currentSection > 0) {
            this.showSection(this.currentSection - 1, 'prev');
        }
    }
}

// Initialize full page scroll
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new FullPageScroll();
    });
} else {
    new FullPageScroll();
}
