import React from "react";
import { Link } from "react-router-dom";
import { DGrid, DSection } from "../../styled/containers";

const CategoryCards = ({ cards, setRef }) => {
  return (
    <DSection width="90%" height="100%" margin="24px auto" ref={setRef}>
      <h1>What We Offer</h1>
      <DGrid four margin="0 0 40px 0" gap="20px">
        <div className="card-content">
          <div className="card-details">
            <img
              src="/images/category/face.png"
              width="64px"
              height="64px"
              alt="category"
            />
            <h3>Skin Care</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              eaque ducimus cumque aliquid dolore! Perspiciatis?
            </p>
            <Link to="/">Learn More</Link>
          </div>
        </div>
        <div className="card-content">
          <div className="card-details">
            <img
              src="/images/category/foot.png"
              width="64px"
              height="64px"
              alt="category"
            />
            <h3>Healt Spa</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              eaque ducimus cumque aliquid dolore! Perspiciatis?
            </p>
            <Link to="/">Learn More</Link>
          </div>
        </div>
        <div className="card-content">
          <div className="card-details">
            <img
              src="/images/category/foot.png"
              width="64px"
              height="64px"
              alt="category"
            />
            <h3>Healt Spa</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              eaque ducimus cumque aliquid dolore! Perspiciatis?
            </p>
            <Link to="/">Learn More</Link>
          </div>
        </div>
        <div className="card-content">
          <div className="card-details">
            <img
              src="/images/category/wax.png"
              width="64px"
              height="64px"
              alt="category"
            />
            <h3>Waxing</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              eaque ducimus cumque aliquid dolore! Perspiciatis?
            </p>
            <Link to="/">Learn More</Link>
          </div>
        </div>
      </DGrid>
    </DSection>
  );
};

export default CategoryCards;
