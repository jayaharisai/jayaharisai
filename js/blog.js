// Blog Page Functionality

let allPosts = [];
let currentCategory = 'all';

// Load all posts
async function loadPosts() {
    try {
        const response = await fetch('data/blog-posts.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        allPosts = data.posts || [];
        renderPosts(allPosts);
    } catch (error) {
        console.error('Error loading posts:', error);
        const container = document.getElementById('posts-grid');
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">⚠️ Please run this website on a local server (e.g., <code>python3 -m http.server 8000</code>) to view blog posts.</p>';
        } else {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">Error loading posts. Please try again later.</p>';
        }
    }
}

// Render posts
function renderPosts(posts) {
    const container = document.getElementById('posts-grid');
    const noResults = document.getElementById('no-results');

    if (posts.length === 0) {
        container.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    container.innerHTML = '';

    posts.forEach(post => {
        const card = document.createElement('a');
        card.href = `post.html?id=${post.id}`;
        card.className = 'blog-card fade-in';

        const date = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const categoryDisplay = post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

        card.innerHTML = `
            <span class="blog-category">${categoryDisplay}</span>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <div class="blog-meta">
                <span>${date}</span>
                <span>•</span>
                <span>${post.readTime}</span>
            </div>
        `;

        container.appendChild(card);
    });
}

// Filter by category
function filterByCategory(category) {
    currentCategory = category;

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });

    applyFilters();
}

// Search posts
function searchPosts(query) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = query;
    }
    applyFilters();
}

// Apply all filters
function applyFilters() {
    const searchQuery = document.getElementById('search-input')?.value.toLowerCase() || '';

    let filtered = allPosts;

    if (currentCategory !== 'all') {
        filtered = filtered.filter(post => post.category === currentCategory);
    }

    if (searchQuery) {
        filtered = filtered.filter(post =>
            post.title.toLowerCase().includes(searchQuery) ||
            post.excerpt.toLowerCase().includes(searchQuery) ||
            post.content.toLowerCase().includes(searchQuery) ||
            (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery)))
        );
    }

    renderPosts(filtered);
}

// Initialize blog page
function initBlog() {
    loadPosts();

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterByCategory(btn.dataset.category);
        });
    });

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                applyFilters();
            }, 300);
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlog);
} else {
    initBlog();
}
