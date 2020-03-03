import React from "react";
import { Link } from "react-router-dom";
import { DGrid, DImage, DSection } from "../../styled/containers";

const CategoryCards = ({ cards, setRef }) => {
  return (
    <DSection width="90%" height="100%" mcenter ref={setRef}>
      <h1>Our Services</h1>
      <DGrid four margin="0 0 40px 0" gap="20px" circle>
        <div className="card-content">
          <DImage circle height="300px" m="3% 0">
            <img
              src="https://images.pexels.com/photos/413885/pexels-photo-413885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="card 1"
            />
          </DImage>
          <div className="card-details">
            <h3>Facial Treatment</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              eaque ducimus cumque aliquid dolore! Perspiciatis?
            </p>
            <Link to="/">Learn More</Link>
          </div>
        </div>
        <div className="card-content">
          <DImage circle height="300px" m="0 0 2% 0">
            <img
              src="https://images.pexels.com/photos/413885/pexels-photo-413885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="card 1"
            />
          </DImage>

          <div className="card-details">
            <h3>Diamond Peeling</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              eaque ducimus cumque aliquid dolore! Perspiciatis?
            </p>
            <Link to="/">Learn More</Link>
          </div>
        </div>
        <div className="card-content">
          <DImage circle height="300px" m="3% 0">
            <img
              src="https://images.pexels.com/photos/413885/pexels-photo-413885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="card 1"
            />
          </DImage>
          <div className="card-details">
            <h3>Body Treatment</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              eaque ducimus cumque aliquid dolore! Perspiciatis?
            </p>
            <Link to="/">Learn More</Link>
          </div>
        </div>
        <div className="card-content">
          <DImage circle height="300px" m="3% 0">
            <img
              src="https://images.pexels.com/photos/413885/pexels-photo-413885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="card 1"
            />
          </DImage>
          <div className="card-details">
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
