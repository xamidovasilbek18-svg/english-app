exports.handler = async (event) => {
  const { messages, system } = JSON.parse(event.body);
  
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
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
