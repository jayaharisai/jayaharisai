# Personal Portfolio Website

A modern, responsive portfolio website showcasing my work as an AI/ML Engineer.

## 🚀 Features

- **Responsive Design** - Optimized for all devices
- **Progressive Web App (PWA)** - Offline support and installable
- **Dark/Light Theme** - Toggle between themes with smooth transitions
- **Blog System** - Full-featured blog with categories and search
- **Smooth Navigation** - Scroll-snap and progress indicators
- **SEO Optimized** - Sitemap, structured data, and meta tags
- **Fast Performance** - Vanilla JavaScript, no heavy frameworks

## 🛠 Tech Stack

- HTML5, CSS3, JavaScript (ES6+)
- Service Workers for PWA
- JSON-based content management
- GitHub Pages for hosting

## 📁 Project Structure

```
.
├── index.html              # Main landing page
├── blog.html              # Blog listing page
├── post.html              # Individual blog post page
├── css/                   # Stylesheets
│   ├── main.css
│   ├── theme.css
│   ├── responsive.css
│   └── ...
├── js/                    # JavaScript files
│   ├── main.js
│   ├── blog.js
│   ├── data-loader.js
│   └── ...
├── data/                  # JSON data files
│   ├── profile.json
│   ├── projects.json
│   ├── experience.json
│   ├── blog-posts.json
│   └── ...
├── assets/                # Images and media
├── sw.js                  # Service worker
├── manifest.json          # PWA manifest
└── sitemap.xml           # SEO sitemap
```

## 🚀 Quick Start

### Local Development

1. Clone the repository
```bash
git clone https://github.com/jayaharisai/jayaharisai.git
cd jayaharisai
```

2. Open in browser
```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

3. Visit `http://localhost:8000`

### Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

**Live Site:** https://jayaharisai.github.io

## 📝 Content Management

All content is managed through JSON files in the `/data` directory:

- `profile.json` - Personal information, bio, contact details
- `experience.json` - Work experience and timeline
- `projects.json` - Portfolio projects
- `skills.json` - Technical skills and expertise
- `blog-posts.json` - Blog articles and content

Simply edit these files to update the website content.

## 🎨 Customization

### Theme Colors

Edit CSS variables in `css/theme.css`:

```css
:root {
  --primary-color: #e26d5c;
  --secondary-color: #6c5ce7;
  --background: #ffffff;
  --text: #2d3436;
}
```

### Adding Blog Posts

Add new entries to `data/blog-posts.json`:

```json
{
  "id": "unique-id",
  "title": "Post Title",
  "date": "2024-01-01",
  "category": "blog",
  "tags": ["tag1", "tag2"],
  "excerpt": "Brief description...",
  "content": "<h2>Full HTML content...</h2>",
  "readTime": "5 min read"
}
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

- **Email:** jayaharisai1212@gmail.com
- **GitHub:** [@jayaharisai](https://github.com/jayaharisai)
- **LinkedIn:** [jayaharisai](https://linkedin.com/in/jayaharisai)

---

**Built with ❤️ by Jayaharisai Tothala**
