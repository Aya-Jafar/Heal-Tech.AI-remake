import * as React from "react";
import { Link } from "react-router-dom";
import { linkStyle } from "../utils/dynamicStyles";

interface ServiceItemProps {
  color: string;
  title: string;
  description: string;
  path: string;
}

export default function ServiceItem(props: ServiceItemProps) {
  return (
    <div className="service-item" style={{ backgroundColor: props.color }}>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <Link to={props.path} style={{ ...linkStyle, marginTop: "auto" }}>
        <button className="try-btn" style={{ backgroundColor: props.color }}>
          <h3>Try Now</h3>
        </button>
      </Link>
    </div>
  );
}
