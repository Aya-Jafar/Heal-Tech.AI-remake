import * as React from "react";
import sendIcon from "../../images/send-q.png";
import CircularProgress from "@mui/material/CircularProgress";

export default function ChatBot() {
  const [isClicked, setIsClicked] = React.useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = React.useState<string>("");
  const [answer, setAnswer] = React.useState<string | null>(null);
  const [questions, setQuestions] = React.useState<string[]>([]);

  const handleSendIconClick = () => {
    setIsClicked(true);

    if (currentQuestion.length > 0) {
      // TODO: Send a request to the model and set the answer
      const mockAnswer = "This is a mock answer from the model.";
      setAnswer(mockAnswer);
      setCurrentQuestion("");
      // Save the current question to the history
      setQuestions((prevQuestions) => [currentQuestion,...prevQuestions]);
    }

    setTimeout(() => {
      setIsClicked(false);
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendIconClick();
    }
  };

  return (
    <div className="model-page chat">
      <h1>Medical Chat Bot</h1>
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
