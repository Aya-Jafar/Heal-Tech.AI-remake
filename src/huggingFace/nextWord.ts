const fetchSuggestions = async (
  text: string,
  setAIText: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);

  if (text.trim().length > 0) {
    const response = await fetch(`${process.env.REACT_APP_NEXT_WORD_URL}`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ prompt: text }),
    });
    const result = await response.json();

    if (result && result.generated_text) {
      const generatedTextWords = result?.generated_text;
      // Remove duplicated input from the response
      const endIndex = generatedTextWords.indexOf(text) + text.length;
      const remainingText = generatedTextWords.slice(endIndex).trim();
      setAIText(remainingText);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }
};

export default fetchSuggestions;
