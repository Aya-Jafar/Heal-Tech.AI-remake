import React, { FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

const Home = lazy(() => import("./pages/Home"));
const AutoCompletion = lazy(() => import("./pages/services/AutoCompletion"));
const Summarization = lazy(() => import("./pages/services/summarization"));
const ChatBot = lazy(() => import("./pages/services/ChatBot"));
const Profile = lazy(() => import("./pages/Profile"));
const SavedGenerated = lazy(() => import("./pages/SavedGenerated"));

const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense
              fallback={
                <div className="loader-container">
                  <span className="loader"></span>
                </div>
              }
            >
              <Home />
            </Suspense>
          }
        ></Route>
        <Route
          path="/services/auto-completion"
          element={
            <Suspense
              fallback={
                <div className="loader-container">
                  <span className="loader"></span>
                </div>
              }
            >
              <AutoCompletion />
            </Suspense>
          }
        ></Route>
        <Route
          path="/services/summarization"
          element={
            <Suspense
              fallback={
                <div className="loader-container">
                  <span className="loader"></span>
                </div>
              }
            >
              <Summarization />
            </Suspense>
          }
        ></Route>
        <Route
          path="/services/chat-bot"
          element={
            <Suspense
              fallback={
                <div className="loader-container">
                  <span className="loader"></span>
                </div>
              }
            >
              <ChatBot />
            </Suspense>
          }
        ></Route>

        <Route
          path="/profile/:uid"
          element={
            <Suspense
              fallback={
                <div className="loader-container">
                  <span className="loader"></span>
                </div>
              }
            >
              <Profile />
            </Suspense>
          }
        ></Route>

        <Route
          path="/saved-generated/:generatedTextId/:type"
          element={
            <Suspense
              fallback={
                <div className="loader-container">
                  <span className="loader"></span>
                </div>
              }
            >
              <SavedGenerated />
            </Suspense>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
