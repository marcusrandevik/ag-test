# Deploying to GitHub Pages

This project is configured to automatically deploy to GitHub Pages when you push to the main branch.

## Setup Instructions

1. **Create a GitHub repository** (if you haven't already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Build and deployment", set **Source** to "GitHub Actions"

3. **Update the base path** in `vite.config.js`:
   - Replace `/ag-test/` with `/YOUR_REPO_NAME/`
   - This ensures assets load correctly on GitHub Pages

4. **Push your changes**:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push
   ```

5. **Wait for deployment**:
   - Go to the **Actions** tab in your GitHub repository
   - Watch the deployment workflow run
   - Once complete, your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Local Development

To run the project locally:
```bash
npm install
npm run dev
```

## Building for Production

To build the project locally:
```bash
npm run build
npm run preview  # Preview the production build
```
