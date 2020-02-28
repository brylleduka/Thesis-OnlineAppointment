import React from "react";
import { DSkeleton } from "./styled/skeleton";

const Skeleton = ({ width }) => {
  return (
    <DSkeleton wid={width}>
      <div className="page-content">
        <div className="placeholder-content">
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
          <div className="placeholder-content_item"></div>
        </div>
      </div>
    </DSkeleton>
  );
};

export default Skeleton;
