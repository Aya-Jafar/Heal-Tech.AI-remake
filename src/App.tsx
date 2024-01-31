import React, { FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const AutoCompletion = lazy(() => import("./pages/services/AutoCompletion"));
const Summarization = lazy(() => import("./pages/services/summarization"));
const ChatBot = lazy(() => import("./pages/services/ChatBot"));

const App: FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        ></Route>
        <Route
          path="/services/auto-completion"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AutoCompletion />
            </Suspense>
          }
        ></Route>
        <Route
          path="/services/summarization"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Summarization />
            </Suspense>
          }
        ></Route>
        <Route
          path="/services/chat-bot"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ChatBot />
            </Suspense>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
