# Summarium

> Client-side document summarization agent (static single-file web UI).

A minimal static HTML app to generate structured summaries of long documents. The UI calls a generative model endpoint; for security the API key is not stored in the repo. Configure your API key at runtime.

## Quick start

1. Set your Gemini/GCP API key in the environment or a browser-side secret manager (do NOT commit it):

- For local testing, you can run a static server and inject the key via browser extension or a dev proxy.

2. Serve locally (Python's simple server):

```powershell
cd "d:\Projects\Summarium -- text to summarize agent"
python -m http.server 8000
```

Open http://localhost:8000/summarium.html in your browser.

## GitHub Pages
This repository includes a Pages workflow to publish the site from the `main` branch root. After pushes, GitHub Pages will publish the static HTML.

## Security
- The repository intentionally does not contain API keys. Add your API key at runtime (e.g., via an environment-injecting proxy or browser extension).
- A CI job scans for obvious API-key patterns and fails the build if found.

## License
This project is licensed under the MIT License — see `LICENSE`.