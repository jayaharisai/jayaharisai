// Main JavaScript

// Prevent default hash scroll on page load and handle it ourselves
(function() {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
})();

// Theme Toggle with Telegram-style Animation
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const currentTheme = localStorage.getItem('theme') ||
                        (prefersDark.matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';

            // Get click position
            const rect = themeToggle.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            // Trigger theme transition animation
            animateThemeChange(x, y, newTheme);

            // Change theme after a slight delay
            setTimeout(() => {
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            }, 50);
        });
    }
}

// Animate theme change with circular reveal
function animateThemeChange(x, y, newTheme) {
    const overlay = document.getElementById('theme-transition-overlay');
    const circle = document.getElementById('theme-transition-circle');

    if (!overlay || !circle) return;

    // Calculate the maximum radius needed to cover the entire screen
    const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
    );

    // Set circle properties
    circle.style.width = maxRadius * 2 + 'px';
    circle.style.height = maxRadius * 2 + 'px';
    circle.style.left = x - maxRadius + 'px';
    circle.style.top = y - maxRadius + 'px';

    // Set circle color based on new theme
    if (newTheme === 'dark') {
        circle.style.background = '#001524'; // Dark theme background
    } else {
        circle.style.background = '#ffffff'; // Light theme background
    }

    // Activate overlay and animate
    overlay.classList.add('active');
    circle.classList.add('animate');

    // Clean up after animation
    setTimeout(() => {
        overlay.classList.remove('active');
        circle.classList.remove('animate');
        circle.style.transform = 'scale(0)';
    }, 600);
}

// Smooth Scroll with offset for sticky header
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;

            // Check if it's a link to another page (contains .html)
            const fullHref = link.getAttribute('href');
            if (fullHref && fullHref.includes('.html')) {
                // Let the browser handle navigation to another page
                return;
            }

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 70;
                const offsetTop = targetElement.offsetTop - headerHeight - 20; // Add 20px buffer

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                if (window.innerWidth <= 768) {
                    const navMenu = document.querySelector('.nav-menu');
                    const menuToggle = document.querySelector('.mobile-menu-toggle');
                    navMenu?.classList.remove('active');
                    menuToggle?.classList.remove('active');
                }
            }
        });
    });
}

// Active Section Highlighting with Animated Indicator
function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenu = document.querySelector('.nav-menu');

    if (!navMenu) return;

    function updateIndicator(activeLink, skipTransition = false) {
        if (!activeLink || !navMenu) return;

        const linkRect = activeLink.getBoundingClientRect();
        const menuRect = navMenu.getBoundingClientRect();

        // Position the pill background exactly over the link
        const left = linkRect.left - menuRect.left;
        const width = linkRect.width;

        // Disable transition for initial load
        if (skipTransition) {
            navMenu.classList.remove('indicator-ready');
            navMenu.style.setProperty('--indicator-left', `${left}px`);
            navMenu.style.setProperty('--indicator-width', `${width}px`);

            // Show indicator after positioning (no transition)
            requestAnimationFrame(() => {
                navMenu.classList.add('indicator-ready');
            });
        } else {
            navMenu.style.setProperty('--indicator-left', `${left}px`);
            navMenu.style.setProperty('--indicator-width', `${width}px`);
            navMenu.classList.add('indicator-ready');
        }
    }

    // Make updateIndicator available globally for scroll-snap.js
    window.updateNavIndicator = updateIndicator;

    // For pages with sections (index.html) - disabled for full-page scroll
    // Full-page scroll now handles navigation updates

    if (sections && sections.length > 0) {
        // Only handle window resize for nav indicator repositioning
        window.addEventListener('resize', () => {
            const activeLink = document.querySelector('.nav-link.active');
            if (activeLink) updateIndicator(activeLink, false);
        });

        // Set initial active state
        setTimeout(() => {
            const activeLink = document.querySelector('.nav-link.active');
            if (activeLink) {
                updateIndicator(activeLink, true);
            }
        }, 200);
    } else {
        // For pages without sections (blog.html, post.html)
        // Set indicator on the active link immediately WITHOUT animation
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            // Use skipTransition=true on initial load to prevent animation from starting position
            setTimeout(() => updateIndicator(activeLink, true), 10);
        }

        window.addEventListener('resize', () => {
            const activeLink = document.querySelector('.nav-link.active');
            if (activeLink) updateIndicator(activeLink, true);
        });
    }

    // Update indicator on click for smooth transitions
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const href = this.getAttribute('href');
            // Update indicator for anchor links on the same page
            if (href && href.startsWith('#') && href !== '#') {
                const targetElement = document.getElementById(href.substring(1));
                if (targetElement) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    setTimeout(() => updateIndicator(this), 10);
                }
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Load profile name in nav and footer
async function loadProfileName() {
    try {
        const response = await fetch('data/profile.json');
        const data = await response.json();

        const navName = document.getElementById('nav-name');
        const footerName = document.getElementById('footer-name');

        if (navName && data.nickname) {
            navName.textContent = data.nickname;
        }
        if (footerName && data.name) {
            footerName.textContent = data.name;
        }
    } catch (error) {
        console.error('Error loading profile name:', error);
    }
}

// Handle hash navigation on page load
function handleHashNavigation() {
    const hash = window.location.hash;
    if (!hash) return;

    const targetId = hash.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        // Wait a bit longer to ensure layout is complete
        setTimeout(() => {
            const header = document.getElementById('header');
            const headerHeight = header ? header.offsetHeight : 70;
            const offsetTop = targetElement.offsetTop - headerHeight - 20;

            // Scroll to the correct position
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'smooth'
            });

            // Update the active nav item
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === hash || link.getAttribute('href') === `index.html${hash}`) {
                    link.classList.add('active');
                }
            });
        }, 200);
    }
}

// Read More Button
function initReadMore() {
    const readMoreBtn = document.getElementById('read-more-btn');
    const bioText = document.getElementById('about-bio');

    if (readMoreBtn && bioText) {
        readMoreBtn.addEventListener('click', () => {
            const isExpanded = readMoreBtn.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                // Collapse
                bioText.classList.remove('expanded');
                bioText.classList.add('collapsed');
                readMoreBtn.setAttribute('aria-expanded', 'false');
            } else {
                // Expand
                bioText.classList.remove('collapsed');
                bioText.classList.add('expanded');
                readMoreBtn.setAttribute('aria-expanded', 'true');
            }
        });
    }
}

// Fixed navbar scroll shadow
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// Initialize all
function init() {
    initTheme();
    initSmoothScroll();
    initActiveSection();
    initMobileMenu();
    setCurrentYear();
    loadProfileName();
    handleHashNavigation();
    initReadMore();
    initHeaderScroll();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Also handle hash changes when navigating
window.addEventListener('hashchange', handleHashNavigation);
