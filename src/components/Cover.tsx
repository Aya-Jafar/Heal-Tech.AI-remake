import * as React from "react";
import pic from "../images/heal-tech.AI-cover.png";
import { handleMouseMove, handleMouseLeave } from "../utils/animation";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import { fadeIn, slideAnimation } from "../utils/animation";

export default function Cover() {
  return (
    <motion.div
      className="home-cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        variants={fadeIn}
        {...slideAnimation("left")}
        className="cover-text"
      >
        <h1>Empowering Healthcare with Precision.</h1>
        <p>
          Elevate Your Practice with Seamless Auto-Completion, Dynamic
          Summarization, and Expert Chatbot Assistance Where Precision Meets
          Efficiency in Doctor AI Services
        </p>
        <ScrollLink to="services" spy={true} smooth={true} duration={500}>
          <button id="explore-btn">Start Exploring</button>
        </ScrollLink>
      </motion.div>
      <motion.div
        variants={fadeIn}
        {...slideAnimation("right")}
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
      </motion.div>
    </motion.div>
  );
}
