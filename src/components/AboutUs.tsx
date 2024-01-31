import * as React from "react";

interface AboutUsProps {}

export default function AboutUs(props: AboutUsProps) {
  return (
    <div className="about-us" id="about">
      <div className="about-us-container">
        <h1>About Us</h1>
        <p>
          We're a group of bioinformatician who're interested in makeing AI
          based health care applications. We build Machine learning models
          that's specific for medical tasks to enhance the performance of
          medical field in Iraq
        </p>
      </div>
    </div>
  );
}
