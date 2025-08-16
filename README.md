# RimWorld Log Checker

**➡️ [https://orionfive.github.io/rw-log-check](https://orionfive.github.io/rw-log-check)**

Analyzes RimWorld logs to find mod conflicts and errors. Paste a HugsLib log URL, get instant diagnostics.

## Features

- Identifies startup vs runtime errors
- Finds problematic mods
- Groups similar errors with counts
- Shows your active mod list
- Runs entirely in browser (no data sent to servers)

## How to Use

1. Press `Ctrl+F12` in RimWorld (requires HugsLib)
2. Paste the GitHub Gist URL into the tool
3. Review the analysis

## Tech Stack

- Jekyll static site on GitHub Pages
- JavaScript pattern matching for error detection
- Classifiers in `assets/js/logParser/` for known issues

## Run Locally

```bash
git clone https://github.com/OrionFive/rw-log-check.git
cd rw-log-check
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`

## Contributing

Add new error patterns as JavaScript classifiers in the `logParser` directory. Each classifier matches patterns and provides explanations.

---

**Issues?** Make sure your Gist is public and JavaScript is enabled.  
**Bugs?** [Open an issue](https://github.com/OrionFive/rw-log-check/issues)
