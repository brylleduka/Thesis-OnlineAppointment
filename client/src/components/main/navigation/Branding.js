import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_BRAND_ACTIVE } from "../../../util/graphql/brand";

const Branding = () => {
  const [isBranding, setIsBranding] = useState({});
  const { data: dataBrandActive, loading: loadBrandActive } = useQuery(
    FETCH_BRAND_ACTIVE
  );

  useEffect(() => {
    if (dataBrandActive) setIsBranding(dataBrandActive.brandActive);
  }, [dataBrandActive]);

  return (
    <div className="brand-container">
      <img
        src={
          "https://zessencefacial.s3-ap-southeast-1.amazonaws.com/global/logo.png"
        }
        alt={"Z Essence"}
        className="brand"
      />
    </div>
  );
};

export default Branding;
