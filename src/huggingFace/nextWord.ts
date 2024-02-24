const fetchSuggestions = (
  text: string,
  setAIText: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    // TODO: Change URL and make actual requests
  if (text.trim().length) {
    setLoading(true);
    // fetch(
    //   `http://localhost:3001/api/suggestions?text=${encodeURIComponent(text)}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    setAIText("New "); // Update this line to match your JSON structure
    setLoading(false);
    // })
    // .catch((error) => {
    //   console.error("Error fetching AI text:", error);
    //   setLoading(false);
    // });
  }
};

export default fetchSuggestions;
