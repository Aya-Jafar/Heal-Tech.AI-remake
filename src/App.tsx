import React, { FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import Loader from "./components/common/Loader";

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
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        ></Route>
        <Route
          path="/services/auto-completion"
          element={
            <Suspense fallback={<Loader />}>
              <AutoCompletion />
            </Suspense>
          }
        ></Route>
        <Route
          path="/services/summarization"
          element={
            <Suspense fallback={<Loader />}>
              <Summarization />
            </Suspense>
          }
        ></Route>
        <Route
          path="/services/chat-bot"
          element={
            <Suspense fallback={<Loader />}>
              <ChatBot />
            </Suspense>
          }
        ></Route>

        <Route
          path="/profile/:uid"
          element={
            <Suspense fallback={<Loader />}>
              <Profile />
            </Suspense>
          }
        ></Route>

        <Route
          path="/saved-generated/:generatedTextId/:type"
          element={
            <Suspense fallback={<Loader />}>
              <SavedGenerated />
            </Suspense>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
