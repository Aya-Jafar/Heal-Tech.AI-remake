import * as React from "react";
import sendIcon from "../../images/send-q.png";
import CircularProgress from "@mui/material/CircularProgress";
import sendQuestion from "../../huggingFace/chatBot";
import { ChatBotState, ChatBotStateAction } from "../../schema";

export default function ChatBot() {
  const initialState = {
    isClicked: false,
    currentQuestion: "",
    answer: null,
    questions: [],
  };

  function reducer(
    state: ChatBotState,
    action: ChatBotStateAction
  ): ChatBotState {
    switch (action.type) {
      case "SEND_ICON_CLICK":
        return { ...state, isClicked: true };

      case "SET_CURRENT_QUESTION":
        return { ...state, currentQuestion: action.payload };

      case "SET_ANSWER":
        return {
          ...state,
          answer: action.payload,
          currentQuestion: "",
          questions: [state.currentQuestion, ...state.questions],
        };

      case "SET_ERROR":
        return {
          ...state,
          answer: action.payload,
          currentQuestion: "",
          questions: [state.currentQuestion, ...state.questions],
        };

      case "RESET_CLICK":
        return { ...state, isClicked: false };

      default:
        return state;
    }
  }

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleSendIconClick = async () => {
    dispatch({ type: "SEND_ICON_CLICK" });

    if (state.currentQuestion.trim().length > 0) {
      try {
        const response = await sendQuestion(state.currentQuestion);
        
        if (response) {
          dispatch({
            type: "SET_ANSWER",
            payload: JSON.stringify(response),
          });
        } else {
          dispatch({
            type: "SET_ERROR",
            payload: "😥 Something went wrong, Please try again",
          });
        }
      } catch (e) {
        dispatch({
          type: "SET_ERROR",
          payload: "😥 Something went wrong, Please try again",
        });
      } finally {
        dispatch({ type: "RESET_CLICK" });
      }
    } else {
      setTimeout(() => {
        dispatch({ type: "RESET_CLICK" });
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
      <h1>Medical Chat Bot</h1>
      <div className="question">
        <input
          className="chat-input"
          placeholder="Type your question here..."
          value={state.currentQuestion}
          onChange={(e) =>
            dispatch({ type: "SET_CURRENT_QUESTION", payload: e.target.value })
          }
          onKeyDown={handleKeyPress}
        />
        {state.isClicked ? (
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
      {state.questions.map((q: string, index: number) => (
        <div key={index} className="question map">
          <div className="chat-input q">{q}</div>
          <br />
          <div className="chat-input a">{state.answer}</div>
        </div>
      ))}
    </div>
  );
}
