# Phil-Convos

A philosophical dialogue platform featuring AI chatbots representing various philosophers that users can chat with.

## Featured Philosophers

### Derek Parfit
- British philosopher specializing in personal identity, rationality, and ethics
- Known for rigorous analytical style and thought-provoking questions

*(More philosophers will be added soon)*

## Project Structure

```
phil-convos/
├── index.html          # Main landing page
├── philosophers/       # Individual philosopher pages
│   ├── parfit.html    # Derek Parfit dialogue interface
│   └── (more to come)
├── css/
│   └── styles.css     # Website styling
├── js/
│   └── dialogue.js    # JavaScript for interactive dialogue
└── assets/
    └── images/        # Philosopher portraits and images
```

## How to Use

1. Visit the website
2. Select a philosopher from the main page
3. Engage in philosophical dialogue with the AI chatbot
4. Explore philosophical concepts and thought experiments

## Features Planned

- Interactive dialogue interface
- Philosophical concept explanations
- Thought experiment simulations
- Community discussion forums
- Educational resources
- Multiple philosopher AI chatbots

## Deployment

This site is designed to be deployed on GitHub Pages.

### Quick Deployment Steps:
1. Create a GitHub repository named `phil-convos`
2. Push this code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/phil-convos.git
   git push -u origin main
   ```
3. Enable GitHub Pages in repository Settings → Pages
4. Your site will be available at `https://<username>.github.io/phil-convos/`

For detailed setup instructions, see [GITHUB_SETUP.md](./GITHUB_SETUP.md).

### Alternative Deployment Options:
- **Replit**: Import repository and run as a web project
- **Netlify**: Deploy via Netlify CLI or GitHub integration
- **Vercel**: Deploy via Vercel CLI or GitHub integration

## License

This project uses a custom license that restricts commercial use. See the [LICENSE](./LICENSE) file for details.

## Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Add new philosophers
3. Improve dialogue functionality
4. Enhance UI/UX
5. Submit issues or feature requests

### Adding a New Philosopher:
- Create a new HTML file in `philosophers/` folder
- Add philosopher-specific CSS if needed
- Update `index.html` to include the philosopher card
- Consider adding AI dialogue responses for the philosopher

## Contributing

Contributions are welcome! Feel free to submit suggestions for:
- Additional philosophers to include
- Improved dialogue interfaces
- Educational content
- Design improvements