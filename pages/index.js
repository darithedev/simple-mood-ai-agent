
import { useState } from 'react';

export default function Home() {
  const [feeling, setFeeling] = useState('');
  const [quote, setQuote] = useState('');
  const [mood, setMood] = useState('');

  const getQuoteFromFeeling = async () => {
    const moodRes = await fetch('/api/detectMood', {
      method: 'POST',
      body: JSON.stringify({ message: feeling })
    });
    const moodData = await moodRes.json();
    if (!moodData.mood) {
        alert("Could not detect mood. Try rephrasing your message.");
        return;
    }

    setMood(moodData.mood);

    const quoteRes = await fetch(`/api/getQuote?mood=${moodData.mood}`);
    const quoteData = await quoteRes.json();
    setQuote(quoteData.quote);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>How are you feeling today?</h1>
      <textarea
        rows="3"
        placeholder="Tell me what's going on..."
        value={feeling}
        onChange={(e) => setFeeling(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', maxWidth: '500px' }}
      />
      <br />
      <button onClick={getQuoteFromFeeling} style={{ marginTop: '1rem', padding: '0.5rem' }}>
        Send
      </button>
      {quote && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Your mood: <em>{mood}</em></h3>
          <p style={{ fontStyle: 'italic' }}>{quote}</p>
        </div>
      )}
    </div>
  );
}
