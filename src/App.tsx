import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AutoCompletion from "./pages/services/AutoCompletion";
import Summarization from "./pages/services/summarization";
import ChatBot from "./pages/services/ChatBot";

function App() {
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

export default App;
