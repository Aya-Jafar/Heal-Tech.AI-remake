import * as React from "react";
import Cover from "../components/Cover";
import AboutUs from "../components/AboutUs";
import { ServicesWrapper } from "../components/ServicesWrapper";
import Contact from "../components/Contact";
import { Footer } from "../components/Footer";

interface HomeProps {}

export default function Home(props: HomeProps) {
  return (
    <div>
      <Cover />
      <AboutUs />
      {/* TODO: add problem statement section */}
      <ServicesWrapper />
      <Contact />
      <Footer />
    </div>
  );
}
