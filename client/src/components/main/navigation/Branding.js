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
          isBranding ? `/images/brands/${isBranding.image}` : "/images/logo.png"
        }
        alt={isBranding ? `/images/brands/${isBranding.image}` : "Z Essence"}
        className="brand"
      />
    </div>
  );
};

export default Branding;
