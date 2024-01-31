import * as React from "react";
import ServiceItem from "./ServiceItem";

interface ServicesWrapperProps {}

export function ServicesWrapper(props: ServicesWrapperProps) {
  return (
    <div className="services">
      <center>
        <h1 style={{fontSize:"40px"}}>Our Services</h1>
      </center>
      <div className="services-wrapper">
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
      </div>
    </div>
  );
}
