import * as React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { stagger, fadeIn, slideAnimation } from "../utils/animation";

export default function ProblemStatement() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.02,
  });

  return (
    <motion.div
      className="problems"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"} // Animate when in view
      variants={stagger}
    >
      <center>
        <motion.h1 variants={fadeIn}>Problems Doctor face</motion.h1>
      </center>
      <motion.div className="grid" variants={fadeIn}>
        <motion.div className="problem">
          <p>Long time reading patient records and data</p>
        </motion.div>
        <motion.div className="problem">
          <p>
            Finding it difficult to enter data, especially for those who do not
            like computers
          </p>
        </motion.div>
        <motion.div className="problem">
          <p>There is no source to quickly verify questionable information</p>
        </motion.div>
        <motion.div className="problem">
          <p>CRUDS operations are inaccurate</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
