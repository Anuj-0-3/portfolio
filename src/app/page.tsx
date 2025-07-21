import AboutMe from "@/comoponents/AboutMe";
import Contact from "@/comoponents/Contact";
import CtaSection from "@/comoponents/CtaSection";
import Hero from "@/comoponents/Hero";
import Projects from "@/comoponents/Projects";
import TechStack from "@/comoponents/TechStack";


export default function Home() {
  return (
    <div >
       <Hero/>
       <CtaSection/>
       <AboutMe/>
       <TechStack/>
       <Projects/>
       <Contact/>
    </div>
  );
}
