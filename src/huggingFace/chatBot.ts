async function sendQuestion(data: string) {
  const response = await fetch(`${process.env.REACT_APP_CHAT_URL}`, {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_HF_TOKEN}` },
    method: "POST",
    body: JSON.stringify({ inputs: data }),
  });
  const result = await response.json();

  console.log(result);
  

  if (result && Array.isArray(result)) {
    const generatedTextWords = result[0].generated_text;

    if (generatedTextWords.includes(data)) {
      // Remove duplicated input from the response

      const endIndex = generatedTextWords.indexOf(data) + data.length;
      var remainingText = generatedTextWords.slice(endIndex).trim();

      return remainingText.replace("?", "");
    }
  }
}

export default sendQuestion;
