import fs from 'fs';
import path from 'path';
import { moodQuotes } from '../../utils/quotes';

const cacheFilePath = path.resolve('./utils/quote_cache.json');

function readCache() {
  try {
    const data = fs.readFileSync(cacheFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

function writeCache(cache) {
  fs.writeFileSync(cacheFilePath, JSON.stringify(cache, null, 2));
}

const generatedQuotesCache = {}; // In-memory cache

export default async function handler(req, res) {
  const { mood } = req.query;
  const moodKey = mood?.toLowerCase();

  const cache = readCache();

  if (cache[moodKey]) {
    return res.status(200).json({ quote: cache[moodKey], source: "file-cache" });
  }

  // Check if we already generated and cached this
  if (generatedQuotesCache[moodKey]) {
    return res.status(200).json({ quote: generatedQuotesCache[moodKey], source: "cache" });
  }

  // Check if it's in the static quote list
  const quotes = moodQuotes[moodKey];
  if (quotes) {
    const random = Math.floor(Math.random() * quotes.length);
    return res.status(200).json({ quote: quotes[random], source: "predefined" });
  }

  // GPT fallback
  const prompt = `Give me a short motivational or reflective quote for someone who is feeling "${mood}". Just the quote, nothing else.`;

  try {
    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 50,
        temperature: 0.8
      })
    });

    const gptData = await gptRes.json();
    const generatedQuote = gptData.choices?.[0]?.message?.content?.trim();

    if (!generatedQuote) {
      throw new Error("No quote returned by GPT");
    }

    cache[moodKey] = generatedQuote;
    writeCache(cache);

    res.status(200).json({ quote: generatedQuote, source: "gpt" });
  } catch (err) {
    console.error("GPT fallback failed:", err);
    res.status(500).json({ quote: "Sorry, I couldn't find a quote right now." });
  }
}