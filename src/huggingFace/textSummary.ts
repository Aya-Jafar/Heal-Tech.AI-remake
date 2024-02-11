async function summarizeText(text: object) {
	
  const response = await fetch(`${process.env.REACT_APP_SUMMARY_URL}`, {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_HF_TOKEN}` },
    method: "POST",
    body: JSON.stringify(text),
  });
  const result = await response.json();
  return result;
}

export default summarizeText;
