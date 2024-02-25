const fetchSuggestions = async (
  text: string,
  setAIText: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);

  if (text.trim().length > 0) {
    const response = await fetch(`${process.env.REACT_APP_NEXT_WORD_URL}`, {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_HF_TOKEN}` },
      method: "POST",
      body: JSON.stringify(text),
    });
    const result = await response.json();

    if (result && Array.isArray(result)) {
      const generatedTextWords = result[0].generated_text;

      if (generatedTextWords.includes(text)) {
        // Remove duplicated input from the response
        const endIndex = generatedTextWords.indexOf(text) + text.length;
        const remainingText = generatedTextWords.slice(endIndex).trim();
        setAIText(remainingText);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }
};

export default fetchSuggestions;
