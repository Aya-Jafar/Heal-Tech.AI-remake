import * as React from "react";
import { Header } from "../components/Header";
import Cover from "../components/Cover";

interface HomeProps {}

export default function Home(props: HomeProps) {
  return (
    <div>
      <Header />
      <Cover />
    </div>
  );
}
