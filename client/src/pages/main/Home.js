import React from "react";
import { Link } from "react-router-dom";

import Showcase from "../../components/main/home/Showcase";
import CategoryCards from "../../components/main/home/CategoryCards";
import Team from "../../components/main/home/Team";
import Section2 from "../../components/main/home/Section2";
import Section3 from "../../components/main/home/Section3";

import { DContainer } from "../../components/styled/containers";

const Home = () => {
  const card1 = "/images/card1.jpg";
  return (
    <DContainer>
      {/* SHOWCASE */}

      <Showcase />
      {/* Home Cards 1 */}
      <CategoryCards cards={card1} />

      {/* SECTION 2 */}
      <Section2 />

      {/* Home Cards 2 */}
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
