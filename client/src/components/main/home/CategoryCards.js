import React from "react";
import { Link } from "react-router-dom";
import { DGrid, DImage, DSection } from "../../styled/containers";

const CategoryCards = ({ cards, setRef }) => {
  return (
    <DSection width="90%" height="100%" margin="24px auto" ref={setRef}>
      <h1>Our Services</h1>
      <DGrid four margin="0 0 40px 0" gap="20px">
        <div className="card-content">
          <div className="card-details">
            <img
              src="http://localhost:3000/images/category/makeup.png"
              width="64px"
              height="64px"
            />
            <h3>Facial Treatment</h3>
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
              src="http://localhost:3000/images/category/face.png"
              width="64px"
              height="64px"
            />
            <h3>Diamond Peeling</h3>
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
              src="http://localhost:3000/images/category/foot.png"
              width="64px"
              height="64px"
            />
            <h3>Body Treatment</h3>
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
              src="http://localhost:3000/images/category/wax.png"
              width="64px"
              height="64px"
            />
            <h3>Permanent Makeup</h3>
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
