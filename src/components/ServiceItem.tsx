import * as React from "react";
import { Link } from "react-router-dom";
import { linkStyle } from "../utils/dynamicStyles";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/animation";
import { ServiceItemProps } from "../schema";

export default function ServiceItem(props: ServiceItemProps) {
  return (
    <motion.div
      className="service-item"
      style={{ backgroundColor: props.color }}
    >
      <motion.h1 variants={fadeIn}>{props.title}</motion.h1>
      <motion.p variants={fadeIn}>{props.description}</motion.p>
      <Link to={props.path} style={{ ...linkStyle, marginTop: "auto" }}>
        <motion.button
          className="try-btn"
          style={{ backgroundColor: props.color }}
          variants={fadeIn}
        >
          <h3>Try Now</h3>
        </motion.button>
      </Link>
    </motion.div>
  );
}
