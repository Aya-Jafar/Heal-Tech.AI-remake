async function summarizeText(text: any) {
  console.log(text, "inside summary");

  if (text && text.inputs && text["inputs"].length > 0) {
    const response = await fetch(`${process.env.REACT_APP_SUMMARY_URL}`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ long_text: text["inputs"] }),
    });
    const result = await response.json();
    return result;
  } else {
    return null;
  }
}

export default summarizeText;
