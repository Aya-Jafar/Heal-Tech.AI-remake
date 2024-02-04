import * as React from "react";
import Cover from "../components/Cover";
import AboutUs from "../components/AboutUs";
import { ServicesWrapper } from "../components/ServicesWrapper";
import Contact from "../components/Contact";
import { Footer } from "../components/Footer";
import ProblemStatement from "../components/ProblemStatement";



export default function Home() {
  return (
    <div>
      <Cover />
      <AboutUs />
      <ProblemStatement />
      <ServicesWrapper />
      <Contact />
      <Footer />
    </div>
  );
}
