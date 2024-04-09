import Cover from "../components/home/Cover";
import AboutUs from "../components/home/AboutUs";
import { ServicesWrapper } from "../components/home/services/ServicesWrapper";
import Contact from "../components/home/Contact";
import { Footer } from "../components/home/Footer";
import ProblemStatement from "../components/home/ProblemStatement";

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
