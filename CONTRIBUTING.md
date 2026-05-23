# Contributing Guide

Thank you for considering contributing to this project! This guide will help you get started.

## Development Workflow

### 1. Fork & Clone
```bash
git clone https://github.com/jayaharisai/jayaharisai.git
cd jayaharisai
```

### 2. Create a Branch
Always create a new branch for your work:
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

**Branch naming convention:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `style/` - Code formatting, CSS changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 3. Make Your Changes
- Write clean, readable code
- Follow existing code style
- Test your changes locally
- Keep commits focused and atomic

### 4. Commit Your Changes
Use conventional commit messages:
```bash
git add .
git commit -m "type: brief description"
```

**Commit types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `perf:` Performance improvements
- `test:` Tests
- `chore:` Maintenance

**Examples:**
```bash
git commit -m "feat: add dark mode toggle"
git commit -m "fix: resolve mobile navigation issue"
git commit -m "docs: update installation instructions"
```

### 5. Push Your Branch
```bash
git push -u origin feature/your-feature-name
```

### 6. Create Pull Request
- Go to GitHub and create a Pull Request
- Provide clear title and description
- Reference any related issues
- Wait for review

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Maintain proper indentation (2 spaces)
- Add descriptive `alt` attributes to images
- Use meaningful class names

### CSS
- Follow BEM naming convention where applicable
- Keep selectors simple and efficient
- Use CSS variables for theme values
- Group related properties together
- Add comments for complex styles

### JavaScript
- Use ES6+ features
- Keep functions small and focused
- Use meaningful variable names
- Add JSDoc comments for complex functions
- Handle errors appropriately
- Avoid global variables

### JSON Data Files
- Maintain proper formatting
- Validate JSON before committing
- Use consistent property names
- Keep data organized and clean

## Testing Checklist

Before submitting your PR, ensure:

- [ ] Code works on desktop browsers (Chrome, Firefox, Safari)
- [ ] Code works on mobile browsers (iOS Safari, Chrome Mobile)
- [ ] Responsive design works at all breakpoints
- [ ] Dark mode toggle works correctly
- [ ] No console errors
- [ ] Links work and navigate correctly
- [ ] Images load properly
- [ ] SEO meta tags are correct
- [ ] Service worker registers successfully
- [ ] Performance is not degraded

## Local Development

### Using Python
```bash
python3 -m http.server 8000
```

### Using Node.js
```bash
npx http-server -p 8000
```

### Using PHP
```bash
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Project Structure

```
jayaharisai/
├── index.html          # Main landing page
├── blog.html           # Blog listing
├── post.html           # Blog post template
├── css/                # Stylesheets
├── js/                 # JavaScript files
├── data/               # JSON content
├── assets/             # Images, icons
├── sw.js               # Service worker
├── manifest.json       # PWA manifest
└── sitemap.xml         # SEO sitemap
```

## Adding New Content

### Add a Blog Post
Edit `data/blog-posts.json`:
```json
{
  "id": "unique-slug",
  "title": "Your Post Title",
  "date": "2024-01-01",
  "category": "blog",
  "tags": ["javascript", "webdev"],
  "excerpt": "Short description...",
  "content": "<h2>Full HTML content</h2><p>...</p>",
  "readTime": "5 min read",
  "featured": false
}
```

### Add a Project
Edit `data/projects.json`:
```json
{
  "title": "Project Name",
  "description": "Project description...",
  "tags": ["Python", "ML"],
  "image": "assets/project-image.jpg",
  "github": "https://github.com/...",
  "demo": "https://demo-url.com",
  "featured": true
}
```

### Update Profile
Edit `data/profile.json` to update personal information, bio, social links, etc.

## Common Issues

### Service Worker Not Updating
Clear browser cache or use incognito mode during development.

### JSON Syntax Errors
Validate your JSON at https://jsonlint.com before committing.

### CSS Not Loading
Check file paths and ensure proper linking in HTML.

### Mobile Layout Issues
Test with browser DevTools mobile emulation.

## Questions or Problems?

- Open an issue on GitHub
- Check existing issues for solutions
- Contact via email: jayaharisai1212@gmail.com

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the project
- Show empathy towards others

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing! 🎉
