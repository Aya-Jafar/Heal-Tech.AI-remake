import React, { FC, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const Home: FC = lazy(() => import("./pages/Home"));
const AutoCompletion: FC = lazy(
  () => import("./pages/services/AutoCompletion")
);
const Summarization: FC = lazy(() => import("./pages/services/summarization"));
const ChatBot: FC = lazy(() => import("./pages/services/ChatBot"));


export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/services/auto-completion"
          element={<AutoCompletion />}
        ></Route>
        <Route
          path="/services/summarization"
          element={<Summarization />}
        ></Route>
        <Route path="/services/chat-bot" element={<ChatBot />}></Route>
      </Routes>
    </div>
  );
}
