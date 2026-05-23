// Lazy Loading with Intersection Observer

function initLazyLoad() {
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe fade-in elements
    const observeElements = () => {
        const fadeElements = document.querySelectorAll('.fade-in:not(.visible)');
        fadeElements.forEach(el => observer.observe(el));
    };

    observeElements();

    const mutationObserver = new MutationObserver(() => {
        observeElements();
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, observerOptions);

    lazyImages.forEach(img => imageObserver.observe(img));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoad);
} else {
    initLazyLoad();
}
