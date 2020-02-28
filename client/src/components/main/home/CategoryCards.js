import React from "react";
import { Link } from "react-router-dom";
import { DGrid } from "../../styled/containers";

const CategoryCards = ({ cards }) => {
  return (
    <>
      <h1>Our Services</h1>
      <DGrid four margin="0 0 40px 0" gap="20px" circle>
        <div className="card-content">
          <img src={cards} alt="card 1" />
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
          <img
            src="https://images.pexels.com/photos/413885/pexels-photo-413885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="card 1"
          />
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
          <img src={cards} alt="card 1" />
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
          <img src={cards} alt="card 1" />
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
    </>
  );
};

export default CategoryCards;
