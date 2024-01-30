import * as React from "react";
import Header from "../components/Header";
import Cover from "../components/Cover";
import AboutUs from "../components/AboutUs";

interface HomeProps {}

export default function Home(props: HomeProps) {
  return (
    <div>
      <Header />
      <Cover />
      <AboutUs />
      
    </div>
  );
}
