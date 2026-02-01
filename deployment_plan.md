# Deployment Plan: Java Learning Platform

This document outlines the step-by-step process to deploy the application from source code to a live public URL. Since this is a Client-Side Single Page Application (SPA), we will use **Vercel** or **Netlify** for free, high-performance hosting.

## 1. Prerequisites
- **GitHub Repository**: The code must be pushed to a remote repository (GitHub/GitLab).
- **Build Verification**: The app must build without errors locally.

## 2. Pre-Deployment checks
Before deploying, we ensure the app production build is stable.

### Step 2.1: Run Production Build
Run the following terminal command to simulate the CI environment:
```bash
npm run build
```
*   **Success**: A `dist/` folder is created containing optimized HTML/JS/CSS.
*   **Failure**: If errors occur (TypeScript/Lint), they must be fixed before deploying.

### Step 2.2: Routing Configuration (SPA)
For Single Page Apps using `react-router-dom`, we need to ensure direct links (e.g., `/learn/module-1`) work when refreshed.
- **Netlify**: require a `public/_redirects` file.
- **Vercel**: Handles this automatically with Vite preset.

I have added a `public/_redirects` file to the codebase to support Netlify out-of-the-box.

---

## 3. Deploy to Vercel (Recommended)
**Why Vercel?** It's the creators of Next.js and has the best defaults for React/Vite.

1.  **Create Account**: Go to [vercel.com](https://vercel.com) and sign up with GitHub.
2.  **Import Project**:
    - Click **"Add New..."** > **"Project"**.
    - Select your GitHub repository: `java-learning-platform`.
3.  **Configure Build**:
    - **Framework Preset**: Verify it says `Vite`.
    - **Root Directory**: `./`
    - **Build Command**: `npm run build`
    - **Output Directory**: `dist`
4.  **Deploy**:
    - Click **Deploy**.
    - Wait ~1 minute.
    - You will get a live URL (e.g., `java-learning-platform.vercel.app`).

---

## 4. Deploy to Netlify (Alternative)
**Why Netlify?** Great drag-and-drop support and robust free tier.

1.  **Create Account**: Go to [netlify.com](https://netlify.com) and sign up with GitHub.
2.  **Import Project**:
    - Click **"Add new site"** > **"Import an existing project"**.
    - Choose **GitHub**.
    - Authorize and select `java-learning-platform`.
3.  **Configure Build**:
    - **Base directory**: (leave empty)
    - **Build command**: `npm run build`
    - **Publish directory**: `dist`
4.  **Deploy**:
    - Click **Deploy Site**.
    - Netlify will detect the `_redirects` file and configure routing automatically.

---

## 5. Post-Deployment
### Continuous Deployment (CD)
- Both Vercel and Netlify connect to your Git repository.
- **Every time you `git push`**, they will automatically trigger a new build and deploy the changes live.
- You do **not** need to manually deploy updates.

### Custom Domain
- You can add a custom domain (e.g., `www.learn-java-visualized.com`) in the "Settings" > "Domains" section of your hosting dashboard.
