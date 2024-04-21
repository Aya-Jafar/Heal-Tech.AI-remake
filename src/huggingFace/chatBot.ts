async function sendQuestion(data: string) {
  const response = await fetch(`${process.env.REACT_APP_CHAT_URL}`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ prompt: data }),
  });
  const result = await response.json();

  if (result && result.generated_text && result.generated_text.length > 0) {
    let generatedTextWords = result?.generated_text;
    generatedTextWords = generatedTextWords.replace(/"/g, "");
    return generatedTextWords.replace("?", "");
  }
}

export default sendQuestion;
