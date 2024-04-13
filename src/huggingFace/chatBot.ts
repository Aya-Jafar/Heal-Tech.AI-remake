async function sendQuestion(data: string) {
  const response = await fetch(`${process.env.REACT_APP_CHAT_URL}`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ prompt: data }),
  });
  const result = await response.json();

  if (result && result.generated_text) {
    const generatedTextWords = result?.generated_text;

    if (generatedTextWords.includes(data)) {
      // Remove duplicated input from the response
      
      const endIndex = generatedTextWords.indexOf(data) + data.length;
      var remainingText = generatedTextWords.slice(endIndex).trim();
      remainingText = remainingText.split('"').join("");
      return remainingText.replace("?", "");
    }
  }
}

export default sendQuestion;
