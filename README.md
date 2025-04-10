# Mood Quote AI Agent

This is a simple AI-powered app that detects your mood from natural language and returns a motivational quote using GPT and predefined content.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env.local` file or edit `.env.example` file to `.env.local`:
   ```
   OPENAI_API_KEY=your-openai-key-here
   ```

3. Run the app:
   ```
   npm run dev
   ```

Open your browser to `http://localhost:3000`
---

## ⚠️ Node.js Version Requirement

This app uses modern JavaScript features (like optional chaining `?.`) which require **Node.js v14 or later** (v16+ recommended).

### ✅ Recommended: Use `nvm` to manage Node versions

1. Install `nvm` (Node Version Manager):
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   ```

2. Restart your terminal, then install and use Node 20:
   ```bash
   nvm install 20
   nvm use 20
   ```

3. Verify the version:
   ```bash
   node -v
   # Should be v20.x.x
   ```

This ensures full compatibility with the app. If you see an error like `SyntaxError: Unexpected token '?'`, it's because your Node version is too old.

---

## 📁 File Structure Overview

```
pages/
  index.js             // Frontend UI
  api/
    getQuote.js        // Quote logic + GPT fallback
    detectMood.js      // Mood detection via GPT
utils/
  quotes.js            // Static quotes
  quote_cache.json     // Persistent GPT-generated quotes
.env.local             // Your API key (not committed)
```

---

## 💬 Need Help?

Open an issue or reach out