

async function sendQuestion(data: object) {
  const response = await fetch(`${process.env.REACT_APP_CHAT_URL}`, {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_HF_TOKEN}` },
    method: "POST",
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

export default sendQuestion;
