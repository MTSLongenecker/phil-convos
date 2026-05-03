# GitHub Pages Setup Instructions

## Quick Start Guide

### 1. Create GitHub Repository
1. Go to GitHub.com and create a new repository named `phil-convos`
2. Make sure it's public (private repos can't use GitHub Pages)

### 2. Push Your Code
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Derek Parfit philosophical dialogue website"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/phil-convos.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click Settings → Pages
3. Under "Source", select "GitHub Actions"
4. Or select "Deploy from a branch" and choose the `main` branch
5. Your site will be published at: `https://YOUR_USERNAME.github.io/phil-convos`

### 4. Site Structure
```
phil-convos/
├── index.html                    # Main landing page with all philosophers
├── philosophers/
│   ├── parfit.html               # Derek Parfit dialogue page
│   └── socrates.html           # Socrates dialogue page
├── css/
│   ├── styles.css               # Main styles
│   └── philosopher.css          # Philosopher-specific styles
├── js/
│   ├── main.js                  # Main JavaScript
│   └── dialogue.js              # Dialogue functionality
├── assets/
│   └── images/                  # Placeholder icons (create SVG files)
├── README.md                     # Project documentation
├── .github/workflows/deploy.yml # GitHub Pages deployment workflow
└── GITHUB_SETUP.md              # This setup guide
```

### 5. Custom Domain (Optional)
If you want to use a custom domain:
1. In GitHub Pages settings, add your custom domain
2. Update the DNS records for your domain to point to GitHub Pages

## Features

### Interactive Dialogue
- Chat with Derek Parfit about personal identity
- Chat with Socrates using the Socratic Method
- Random question generators
- Clear conversation functionality

### Planned Features
- More philosophers (Aristotle, Nietzsche, etc.)
- Advanced dialogue with AI integration
- Discussion forums
- Educational resources
- Community features

## Contributing

### Adding New Philosophers
1. Create a new HTML file in `philosophers/` folder
2. Add philosopher-specific CSS styles
3. Add dialogue JavaScript logic
4. Update `index.html` to include the new philosopher

### Customizing AI Responses
Edit the JavaScript arrays in each philosopher's page:
- `phil-convos/philosophers/parfit.html`: Edit `parfitResponses` and `parfitQuestions`
- `phil-convos/philosophers/socrates.html`: Edit `socratesResponses` and `socratesQuestions`

### Adding Images
Create SVG icons in `assets/images/` folder:
- `parfit-icon.svg`
- `socrates-icon.svg`
- `philosophy-icon.svg`

## Deployment Notes

### GitHub Pages Limitations
- GitHub Pages hosts static websites only
- No server-side functionality (all dialogue is simulated in JavaScript)
- Maximum file size: 100MB per repository
- Free hosting with GitHub Pages

### Future Enhancements
For more advanced features (real AI integration, user accounts, etc.), consider:
- **Replit**: Full coding environment with backend support
- **Vercel**: Free hosting with serverless functions
- **Netlify**: Free hosting with form handling and functions
- **Heroku**: Backend hosting with database support

## Troubleshooting

### Common Issues
1. **Site not loading**: Check GitHub Pages source branch
2. **Images not showing**: Ensure SVG files exist in assets folder
3. **JavaScript not working**: Check browser console for errors
4. **CSS not loading**: Verify file paths in HTML

### Testing Locally
```bash
# Install Python if needed
python3 --version

# Run simple HTTP server
python3 -m http.server 8000

# Or use Node.js
npm install -g serve
serve -p 8000
```

## Contact
For issues or suggestions, create an issue in the GitHub repository.