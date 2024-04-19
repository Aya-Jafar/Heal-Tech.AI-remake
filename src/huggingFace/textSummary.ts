async function summarizeText(text: object) {
	
  const response = await fetch(`${process.env.REACT_APP_SUMMARY_URL}`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ long_text: text }),
  });
  const result = await response.json();
  return result;
}

export default summarizeText;
