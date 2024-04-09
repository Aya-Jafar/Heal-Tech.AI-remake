import * as React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { stagger, fadeIn, slideAnimation } from "../../utils/animation";

export default function AboutUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.02,
  });

  return (
    <motion.div className="about-us" id="about" ref={ref}>
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"} // Animate when in view
        variants={stagger}
        className="about-us-container"
      >
        <motion.h1 variants={stagger}>About Us</motion.h1>
        <motion.p variants={fadeIn}>
          We're a group of bioinformatician who're interested in makeing AI
          based health care applications. We build Machine learning models
          that's specific for medical tasks to enhance the performance of
          medical field in Iraq
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
