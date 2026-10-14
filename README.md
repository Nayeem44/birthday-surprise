# Birthday Surprise

A birthday experience built with Next.js and exported as a static site.

## Run locally

```bash
npm ci
npm run dev
```

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the static site and deploys
the `out/` directory when changes are pushed to `master`.

In the repository settings, open **Settings → Pages** and set **Build and
deployment → Source** to **GitHub Actions**. The site is published at
https://nayeem44.github.io/birthday-surprise/.
