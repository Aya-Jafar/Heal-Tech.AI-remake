import * as React from "react";
import ServiceItem from "./ServiceItem";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { stagger, fadeIn, slideAnimation } from "../utils/animation";

export function ServicesWrapper() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.02,
  });

  return (
    <motion.div
      className="services"
      id="services"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
    >
      <center>
        <motion.h1 style={{ fontSize: "40px" }}>Our Services</motion.h1>
      </center>
      <motion.div className="services-wrapper" variants={fadeIn}>
        <ServiceItem
          title="Medical Auto Completion"
          description="Saves time by quickly providing accurate medical text predictions"
          path="/services/auto-completion"
          color="#0024AB"
        />
        <ServiceItem
          title="Text summarization"
          description="Quickly extracts key information from lengthy texts.make faster decisions, and spend less time sifting through data"
          path="/services/summarization"
          color="#0546C6"
        />
        <ServiceItem
          title="Medical Chat bot"
          description="Instantly accessible and knowledgeable, it provides real-time assistance, answers queries, and elevates your communication experience"
          path="/services/chat-bot"
          color="#0283CB"
        />
      </motion.div>
    </motion.div>
  );
}
