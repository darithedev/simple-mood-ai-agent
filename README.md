# Mood Quote AI Agent

This is a basic AI-powered web app that takes natural language input, detects the user's mood using OpenAI's GPT-3.5-turbo, and responds with a relevant motivational or reflective quote. If no static quote exists, it generates one using GPT and caches it for future reuse.

## Features

- Natural language mood detection
- Predefined mood-based quotes
- GPT fallback quote generation
- Persistent caching of generated quotes
- Ready to deploy on Vercel or run locally

---

## 🚀 Getting Started (From Scratch)

Follow these instructions **even if your system doesn't have Node.js, npm, or nvm installed**.

### 1. Install Node Version Manager (nvm)

#### macOS / Linux

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Then activate it:
```bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
```

#### Windows

Use [nvm-windows installer](https://github.com/coreybutler/nvm-windows/releases)

---

### 2. Install Node.js (LTS)

```bash
nvm install 20
nvm use 20
```

---

### 3. Clone the Repository

```bash
git clone https://github.com/your-username/mood-quote-ai-agent.git
cd mood-quote-ai-agent
```

---

### 4. Install Dependencies

```bash
npm install
```

---

### 5. Add Your OpenAI API Key

Create a file named `.env.local` in the root directory:

```bash
touch .env.local
```

Open it and add:

```
OPENAI_API_KEY=your_openai_api_key_here
```

> Replace `your_openai_api_key_here` with your actual API key from [OpenAI](https://platform.openai.com/account/api-keys)

---

### 6. Run the App

```bash
npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000) in your browser.

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

Open an issue or reach out for feature ideas, bugs, or improvements!