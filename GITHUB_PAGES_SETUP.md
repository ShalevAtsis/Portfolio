# Publishing to GitHub Pages (Instructions for Shalev)

This project is set up to build a **static export** of your Next.js site and deploy it with **GitHub Actions**. Follow these steps once to configure GitHub Pages for your repository.

---

## 1. Push your code to GitHub

If you haven’t already:

1. Create a **new repository** on GitHub (e.g. `portfolio` or `shalev-atsis.github.io`).
2. From your project folder, run:

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your GitHub username and `YOUR_REPO_NAME` with the repo name (e.g. `portfolio`).

---

## 2. Configure GitHub Pages to use GitHub Actions

1. Open your repository on GitHub.
2. Go to **Settings** → **Pages** (left sidebar, under “Code and automation”).
3. Under **Build and deployment**:
   - **Source:** choose **GitHub Actions** (not “Deploy from a branch”).

No need to create a `gh-pages` branch or set a branch source; the workflow will build and deploy for you.

---

## 3. Trigger the first deployment

- **Option A:** Push a commit to the `main` branch (e.g. `git push origin main`). The workflow runs on every push to `main`.
- **Option B:** Run the workflow manually: **Actions** tab → **Deploy to GitHub Pages** → **Run workflow** → **Run workflow**.

---

## 4. Where your site will be available

It depends on the **repository name**:

| Repository name              | Site URL                                      |
|-----------------------------|-----------------------------------------------|
| `portfolio`                 | **https://YOUR_USERNAME.github.io/portfolio/** |
| `shalev-atsis.github.io`    | **https://shalev-atsis.github.io/**           |

- If the repo is **not** named `username.github.io`, the site is served under `/<repo-name>/` (e.g. `/portfolio/`). The workflow sets `BASE_PATH` automatically.
- If the repo **is** named `username.github.io`, the site is at the root (`https://username.github.io/`).

---

## 5. If your default branch is not `main`

The workflow is triggered by pushes to **`main`**. If your default branch is `master` (or something else):

- Either rename the branch to `main` (GitHub: **Settings** → **Branches** → default branch).
- Or edit `.github/workflows/deploy.yml` and change `branches: ['main']` to your branch name (e.g. `branches: ['master']`).

---

## 6. Check that deployment worked

1. Go to the **Actions** tab; the “Deploy to GitHub Pages” workflow should show a green check.
2. Go to **Settings** → **Pages**. After the first run you should see something like: “Your site is live at **https://…**”.
3. Open that URL in the browser. For a repo named `portfolio`, use **https://YOUR_USERNAME.github.io/portfolio/** (with the trailing slash).

---

## 7. Local build (optional)

To test the same build that runs in CI (e.g. for a project repo named `portfolio`):

**Windows (PowerShell):**

```powershell
$env:BASE_PATH="/portfolio"; npm run build
```

**macOS / Linux:**

```bash
BASE_PATH=/portfolio npm run build
```

Then open the generated `out` folder with a static server (e.g. `npx serve out`) and visit `http://localhost:3000/portfolio/`.

---

## Summary checklist

- [ ] Repository created on GitHub and code pushed (e.g. to `main`).
- [ ] **Settings** → **Pages** → **Source** set to **GitHub Actions**.
- [ ] At least one run of the “Deploy to GitHub Pages” workflow (push to `main` or manual run).
- [ ] Site URL noted (e.g. `https://shalev-atsis.github.io/portfolio/`).

After this, every push to `main` will rebuild and redeploy the site automatically.
