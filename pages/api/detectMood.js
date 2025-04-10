
export default async function handler(req, res) {
  const { message } = JSON.parse(req.body);

  const prompt = `Detect the user's mood based on this input: "${message}". Only respond with one of the following: happy, sad, stressed, angry, motivated, tired.`;

  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 5
    })
  });

  const data = await openaiRes.json();
  console.log("GPT Response:", data);
  const mood = data.choices?.[0]?.message?.content?.toLowerCase().trim();
  console.log("Detected mood from GPT:", mood);
  res.status(200).json({ mood });
}
