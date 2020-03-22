import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Showcase from "../../components/main/home/Showcase";
import CategoryCards from "../../components/main/home/CategoryCards";
import Team from "../../components/main/home/Team";
import Section2 from "../../components/main/home/Section2";
import Section3 from "../../components/main/home/Section3";
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

      <Section2 nextSection={nextSection} />

      <CategoryCards cards={card1} />

      <Team cards={card1} />
      {/* Carbon */}
      <Section3 />
      <section className="follow">
        <p>Follow Z Essence</p>
        <Link to="/">
          <h4>Facebook</h4>
        </Link>
        <Link to="/">
          <h4>Twitter</h4>
        </Link>
        <Link to="/">
          <h4>LinkedIn</h4>
        </Link>
      </section>
    </DContainer>
  );
};

export default Home;
