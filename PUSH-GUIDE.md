# Push the portfolio to GitHub (no installs needed)

You don't need Node or Git on your laptop. GitHub's website accepts uploads, and
GitHub Actions then runs lint, type-check, tests and the build on GitHub's servers.

## 1. Create the repository

1. Sign in at github.com with your **personal** account.
2. Click **+** (top right), then **New repository**.
3. Name it `portfolio`. Choose **Public** (or Private while testing). Do **not** tick
   "Add a README", ".gitignore" or a licence. Click **Create repository**.

## 2. Upload the files

1. On the empty repository page, click **uploading an existing file**.
2. Open the `portfolio` folder on your computer. Select **everything inside it**
   (not the folder itself) and drag it into the browser window. That includes the
   `.github`, `src`, `tests`, `public` and `scripts` folders and the files at the top.
3. Wait for the upload bar to finish. GitHub allows up to 100 files per upload;
   this project has well under that.
4. In "Commit changes", write: `feat: add portfolio site, tests and CI workflow`
5. Choose **Commit directly to the main branch**, then click **Commit changes**.

Check that `.github/workflows/ci.yml` is listed in the repository. If the `.github`
folder is missing, drag it in on its own through **Add file > Upload files**.

## 3. Read the CI result

1. Open the **Actions** tab. A run called "CI" starts by itself. It takes a few minutes.
2. A green tick means all four steps passed. A red cross means one failed.
3. If it failed, click the run, then the failed step (it has the red cross). Copy the
   last 40 lines or so of that step's log and paste them to me. I'll fix the code and
   tell you which files to re-upload (**Add file > Upload files** replaces files with
   the same name).

## 4. Save the lockfile (after the first green run)

On the successful run's page, scroll to **Artifacts** and download `package-lock`.
Unzip it and upload `package-lock.json` to the repository the same way. Then tell me,
and I'll switch the workflow to the faster, stricter `npm ci`.

## 5. Preview the site (optional, needs a free Vercel account)

1. Sign in at vercel.com with your GitHub account, click **Add New > Project**, and
   pick the `portfolio` repository. Keep the default settings and click **Deploy**.
2. Vercel builds the site and gives you a preview URL. Open it and tell me what you
   see on a phone and on a desktop. Screenshots help.
3. In Vercel's project settings, add an environment variable named
   `NEXT_PUBLIC_SITE_URL` set to your site's URL.

## Keep this out of the repository

- Anything from ChargePoint: internal data, documents, code, tool names or customer details.
  Your internship and education details are fine.
- Passwords, API keys and tokens. Nothing in this project needs one.
- `.env` files. The `.gitignore` already blocks them if you use Git later.

## If you later install Git (optional)

```
cd portfolio
git init -b main
git add .
git commit -m "feat: add portfolio site, tests and CI workflow"
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```
