import React from "react";
import { GalleryCard } from "./styled/card";
import { Link } from "react-router-dom";

const GalleryThumb = (props) => {
  return (
    <GalleryCard {...props}>
      <div className="thumb">
        <div className="thumb-shadow"></div>
        <div className="thumb-shadow"></div>
        <div className="thumb-shadow"></div>
        <div className="thumb-image"></div>
      </div>
      <div className="title">
        <span>{props.title}</span>
      </div>
      <div className="explore">
        <span>{props.subtitle}</span>
      </div>
      <button className="btn btn-blue">View More</button>
      <Link to={props.link} />
    </GalleryCard>
  );
};

export default GalleryThumb;
