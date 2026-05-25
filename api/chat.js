export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, system } = req.body;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "openrouter/free",
      max_tokens: 1000,
      system,
      messages
    })
  });

  const data = await response.json();
  return res.status(200).json(data);
}
