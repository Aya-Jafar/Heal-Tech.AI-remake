import * as React from "react";
import pic from "../images/heal-tech.AI-cover.png";
import { handleMouseMove, handleMouseLeave } from "../animation";

interface ICoverProps {}

export default function Cover(props: ICoverProps) {
  return (
    <div className="home-cover">
      <div className="cover-text">
        <h1>Empowering Healthcare with Precision.</h1>
        <p>
          Elevate Your Practice with Seamless Auto-Completion, Dynamic
          Summarization, and Expert Chatbot Assistance Where Precision Meets
          Efficiency in Doctor AI Services
        </p>
        <button id="explore-btn">Start Exploring</button>
      </div>
      <div
        className="cover-pic"
        id="cover"
        onMouseMove={(e) => {
          handleMouseMove(e, "cover");
        }}
        onMouseLeave={(e) => {
          handleMouseLeave(e, "cover");
        }}
      >
        <img src={pic} alt="" />
      </div>
    </div>
  );
}
