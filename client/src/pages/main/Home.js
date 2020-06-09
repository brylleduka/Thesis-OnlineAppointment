import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Showcase from "../../components/main/home/Showcase";
import CategorySection from "../../components/main/home/CategorySection";
import TeamSection from "../../components/main/home/TeamSection";
import AboutSection from "../../components/main/home/AboutSection";
import PromoSection1 from "../../components/main/home/PromoSection1";
import ContactMap from "../../components/main/home/ContactMap";
import TestimonialSection from "../../components/main/home/TestimonialSection";
import { DContainer } from "../../components/styled/containers";
import ScrollButton from "../../components/main/utils/ScrollButton";
import useScroll from "../../util/hooks/useScroll";

const Home = () => {
  const nextSection = useRef();
  const card1 = "/images/card1.jpg";
  const scrolling = useScroll(300);

  return (
    <DContainer>
      {scrolling && <ScrollButton />}
      <Showcase nextSection={nextSection} />

      <AboutSection nextSection={nextSection} />

      <CategorySection cards={card1} />
      <PromoSection1 />
      <TeamSection cards={card1} />
      <TestimonialSection />
      <ContactMap />
    </DContainer>
  );
};

export default Home;
