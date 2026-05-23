// Analytics and Performance Monitoring
// Replace with your actual tracking IDs

// Google Analytics (GA4) - Placeholder
// Uncomment and add your tracking ID when ready
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX');
*/

// Custom Event Tracking
const trackEvent = (category, action, label = '', value = 0) => {
    // Send to Google Analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label,
            'value': value
        });
    }

    // Log for development
    console.log('Event:', category, action, label, value);
};

// Track page views
const trackPageView = (page) => {
    if (typeof gtag !== 'undefined') {
        gtag('config', 'G-XXXXXXXXXX', {
            'page_path': page
        });
    }
    console.log('Page view:', page);
};

// Track navigation clicks
document.addEventListener('DOMContentLoaded', () => {
    // Track navigation link clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const section = link.getAttribute('href');
            trackEvent('Navigation', 'Click', section);
        });
    });

    // Track button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = button.textContent.trim();
            trackEvent('Button', 'Click', buttonText);
        });
    });

    // Track social link clicks
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const platform = link.textContent.trim();
            trackEvent('Social', 'Click', platform);
        });
    });

    // Track blog post views
    if (window.location.pathname.includes('post.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        if (postId) {
            trackEvent('Blog', 'View Post', postId);
        }
    }

    // Track theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            trackEvent('Theme', 'Toggle', theme);
        });
    }
});

// Performance monitoring
window.addEventListener('load', () => {
    // Use Performance API
    if ('performance' in window && 'getEntriesByType' in performance) {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];

            if (perfData) {
                // Log performance metrics
                const metrics = {
                    'DNS Lookup': perfData.domainLookupEnd - perfData.domainLookupStart,
                    'TCP Connection': perfData.connectEnd - perfData.connectStart,
                    'Request Time': perfData.responseStart - perfData.requestStart,
                    'Response Time': perfData.responseEnd - perfData.responseStart,
                    'DOM Processing': perfData.domComplete - perfData.domInteractive,
                    'Load Complete': perfData.loadEventEnd - perfData.loadEventStart,
                    'Total Load Time': perfData.loadEventEnd - perfData.fetchStart
                };

                console.log('Performance Metrics:', metrics);

                // Track slow page loads
                if (metrics['Total Load Time'] > 3000) {
                    trackEvent('Performance', 'Slow Load', window.location.pathname, metrics['Total Load Time']);
                }
            }
        }, 0);
    }
});

// Error tracking
window.addEventListener('error', (event) => {
    trackEvent('Error', 'JavaScript Error', event.message);
});

// Export functions for use in other scripts
window.analytics = {
    trackEvent,
    trackPageView
};
