async function summarizeText(text: any) {

  const response = await fetch(`${process.env.REACT_APP_SUMMARY_URL}`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ long_text: text['inputs'] }),
  });
  const result = await response.json();
  return result;
}

export default summarizeText;
