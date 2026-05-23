// Data Loader - Fetch and render JSON data

let cachedData = {};

// Fetch JSON data with caching
async function fetchData(filename) {
    if (cachedData[filename]) {
        return cachedData[filename];
    }

    try {
        const response = await fetch(`data/${filename}`);
        if (!response.ok) throw new Error(`Failed to load ${filename}`);
        const data = await response.json();
        cachedData[filename] = data;
        return data;
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return null;
    }
}

// Render Hero Section
async function renderHero() {
    const data = await fetchData('profile.json');
    if (!data) return;

    document.getElementById('hero-name').textContent = data.name || '';
    document.getElementById('hero-title').textContent = data.title || '';
    document.getElementById('hero-tagline').textContent = data.tagline || '';

    // Load profile image
    const profileImg = document.getElementById('hero-profile-img');
    if (profileImg && data.avatar) {
        profileImg.src = data.avatar;
        profileImg.alt = data.name || 'Profile';
    }
}

// Render About Section
async function renderAbout() {
    const data = await fetchData('profile.json');
    if (!data) return;

    document.getElementById('about-bio').textContent = data.bio || '';
}

// Render Experience Timeline
async function renderExperience() {
    const data = await fetchData('experience.json');
    if (!data || !data.experience) return;

    const container = document.getElementById('experience-timeline');
    container.innerHTML = '';

    data.experience.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'timeline-item fade-in';

        const endDate = exp.endDate === 'Present' ? 'Present' :
                       new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        const startDate = new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

        let achievementsHTML = '';
        if (exp.achievements && exp.achievements.length > 0) {
            achievementsHTML = `
                <ul class="timeline-achievements">
                    ${exp.achievements.map(a => `<li>${a}</li>`).join('')}
                </ul>
            `;
        }

        let technologiesHTML = '';
        if (exp.technologies && exp.technologies.length > 0) {
            technologiesHTML = `
                <div class="timeline-technologies">
                    ${exp.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
            `;
        }

        let logoHTML = '';
        if (exp.logo) {
            logoHTML = `<img src="${exp.logo}" alt="${exp.company} logo" class="timeline-company-logo" />`;
        }

        item.innerHTML = `
            <div class="timeline-header">
                ${logoHTML}
                <div class="timeline-company">${exp.company}</div>
            </div>
            <div class="timeline-position">${exp.position}</div>
            <div class="timeline-date">${startDate} - ${endDate}</div>
            <div class="timeline-description">${exp.description}</div>
            ${achievementsHTML}
            ${technologiesHTML}
        `;

        container.appendChild(item);
    });
}

// Render Projects Grid
async function renderProjects() {
    const data = await fetchData('projects.json');
    if (!data || !data.projects) return;

    const container = document.getElementById('projects-grid');
    container.innerHTML = '';

    data.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card fade-in';

        let logoHTML = '';
        if (project.logo) {
            logoHTML = `
                <div class="project-logo">
                    <img src="${project.logo}" alt="${project.name} logo" />
                </div>
            `;
        }

        let technologiesHTML = '';
        if (project.technologies && project.technologies.length > 0) {
            technologiesHTML = `
                <div class="project-technologies">
                    ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
            `;
        }

        let linksHTML = '';
        if (project.links) {
            const linkItems = [];
            if (project.links.github) {
                linkItems.push(`<a href="${project.links.github}" target="_blank" rel="noopener" class="project-link">GitHub</a>`);
            }
            if (project.links.demo) {
                linkItems.push(`<a href="${project.links.demo}" target="_blank" rel="noopener" class="project-link">Live Demo</a>`);
            }
            if (project.links.website) {
                linkItems.push(`<a href="${project.links.website}" target="_blank" rel="noopener" class="project-link">Website</a>`);
            }
            if (linkItems.length > 0) {
                linksHTML = `<div class="project-links">${linkItems.join('')}</div>`;
            }
        }

        card.innerHTML = `
            ${logoHTML}
            <h3 class="project-title">${project.name}</h3>
            <p class="project-description">${project.description}</p>
            ${technologiesHTML}
            ${linksHTML}
        `;

        container.appendChild(card);
    });
}

// Render Skills
async function renderSkills() {
    const data = await fetchData('skills.json');
    if (!data || !data.categories) return;

    const container = document.getElementById('skills-container');
    container.innerHTML = '';

    data.categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category fade-in';

        categoryDiv.innerHTML = `
            <h3 class="skill-category-title">${category.name}</h3>
            <div class="skill-items">
                ${category.skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
            </div>
        `;

        container.appendChild(categoryDiv);
    });
}

// Render Education
async function renderEducation() {
    const data = await fetchData('education.json');
    if (!data || !data.education) return;

    const container = document.getElementById('education-list');
    container.innerHTML = '';

    data.education.forEach(edu => {
        const item = document.createElement('div');
        item.className = 'education-item fade-in';

        const startDate = new Date(edu.startDate).getFullYear();
        const endDate = edu.endDate === 'Present' ? 'Present' : new Date(edu.endDate).getFullYear();

        item.innerHTML = `
            <div class="education-degree">${edu.degree}</div>
            <div class="education-institution">${edu.institution}</div>
            <div class="education-date">${startDate} - ${endDate}</div>
            ${edu.description ? `<div class="education-description">${edu.description}</div>` : ''}
        `;

        container.appendChild(item);
    });
}

// Render Blog Preview
async function renderBlogPreview() {
    const data = await fetchData('blog-posts.json');
    if (!data || !data.posts) return;

    const container = document.getElementById('blog-preview-grid');
    container.innerHTML = '';

    const featuredPosts = data.posts.filter(p => p.featured).slice(0, 3);
    const postsToShow = featuredPosts.length > 0 ? featuredPosts : data.posts.slice(0, 3);

    postsToShow.forEach(post => {
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

// Render Contact Info
async function renderContact() {
    const data = await fetchData('profile.json');
    if (!data) return;

    if (data.email) {
        const emailLink = document.getElementById('contact-email');
        emailLink.href = `mailto:${data.email}`;
        emailLink.textContent = data.email;
    }

    if (data.location) {
        document.getElementById('contact-location').textContent = data.location;
    }

    if (data.social) {
        const socialContainer = document.getElementById('social-links');
        socialContainer.innerHTML = '';

        const socialLinks = [];
        if (data.social.github) {
            socialLinks.push({ name: 'GitHub', url: `https://github.com/${data.social.github}` });
        }
        if (data.social.linkedin) {
            socialLinks.push({ name: 'LinkedIn', url: `https://linkedin.com/in/${data.social.linkedin}` });
        }
        if (data.social.twitter) {
            socialLinks.push({ name: 'Twitter', url: `https://twitter.com/${data.social.twitter}` });
        }

        socialLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.className = 'social-link';
            a.textContent = link.name;
            socialContainer.appendChild(a);
        });
    }
}

// Initialize all data loading
async function initDataLoader() {
    await Promise.all([
        renderHero(),
        renderAbout(),
        renderExperience(),
        renderProjects(),
        renderSkills(),
        renderEducation(),
        renderBlogPreview(),
        renderContact()
    ]);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDataLoader);
} else {
    initDataLoader();
}
