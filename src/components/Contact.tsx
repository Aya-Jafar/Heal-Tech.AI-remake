import * as React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { stagger, fadeIn, slideAnimation } from "../utils/animation";

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.02,
  });

  return (
    <motion.div className="about-us" id="contact" ref={ref}>
      <motion.div
        className="about-us-container"
        initial="hidden"
        animate={inView ? "visible" : "hidden"} // Animate when in view
        variants={stagger}
      >
        <center>
          <motion.h1 variants={fadeIn}>Feel free to contact our team</motion.h1>
          <form action="https://formspree.io/f/xrgwewpq" method="post">
            <motion.div className="form-group" variants={fadeIn}>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                required
              />
            </motion.div>
            <motion.div className="form-group" variants={fadeIn}>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
            </motion.div>
            <motion.div className="form-group" variants={fadeIn}>
              <textarea
                id="message"
                name="message"
                rows={5}
                cols={50}
                placeholder="Message..."
                required
              ></textarea>
            </motion.div>

            <motion.div className="send" variants={fadeIn}>
              <input
                type="submit"
                value="Send"
                className="btn"
                id="explore-btn"
              />
            </motion.div>
          </form>
        </center>
      </motion.div>
    </motion.div>
  );
}
