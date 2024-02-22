import * as React from "react";
import sendIcon from "../../images/send-q.png";
import CircularProgress from "@mui/material/CircularProgress";
import sendQuestion from "../../huggingFace/chatBot";

export default function ChatBot() {
  const [isClicked, setIsClicked] = React.useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = React.useState<string>("");
  const [answer, setAnswer] = React.useState<string | null>(null);
  const [questions, setQuestions] = React.useState<string[]>([]);

  const handleSendIconClick = async () => {
    setIsClicked(true);

    if (currentQuestion.trim().length > 0) {
      const response = await sendQuestion({
        inputs: currentQuestion,
      });
      try {
        if (response[0] && response[0].generated_text) {
          setAnswer(JSON.stringify(response[0].generated_text));
          setCurrentQuestion("");
          setQuestions((prevQuestions) => [currentQuestion, ...prevQuestions]);
        }
        // TODO: else: use the estimated_time key to wait and then send request again
      } catch (e) {
        // TODO: show error message

        console.error("Error fetching the answer:", e);
      } finally {
        setCurrentQuestion("");
        setIsClicked(false);
      }
    } else {
      setTimeout(() => {
        setIsClicked(false);
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendIconClick();
    }
  };

  return (
    <div className="model-page chat">
      <h1 className="test">Medical Chat Bot</h1>
      <div className="question">
        <input
          className="chat-input"
          placeholder="Type your question here..."
          onChange={(e) => setCurrentQuestion(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        {isClicked ? (
          <CircularProgress
            className="comment-progress-indicator"
            size="35px"
          />
        ) : (
          <img
            src={sendIcon}
            alt="Comment Icon"
            className="comment-icon"
            onClick={handleSendIconClick}
          />
        )}
      </div>
      {questions.map((q, index) => (
        <div key={index} className="question map">
          <div className="chat-input q">{q}</div>
          <br />
          <div className="chat-input a">{answer}</div>
        </div>
      ))}
    </div>
  );
}
