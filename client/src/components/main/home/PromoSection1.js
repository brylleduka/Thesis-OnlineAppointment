import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_THE_SHOWCASE } from "../../../util/graphql/cms";
import { Link } from "react-router-dom";
import { DSection, Content } from "../../styled/containers";

const PromoSection1 = () => {
  const [isShowcase, setIsShowcase] = useState([]);
  const { data: dataShowcase, loading: loadShowcase } = useQuery(
    FETCH_THE_SHOWCASE,
    {
      variables: {
        sectionName: "SHOWCASE",
      },
    }
  );

  useEffect(() => {
    if (dataShowcase) {
      setIsShowcase(dataShowcase.showcaseCMS.content);
    }
  }, [dataShowcase]);

  return (
    <DSection
      background={isShowcase[0] !== undefined && isShowcase[0].bgImgURL}
      pad="100px 0 0 30px"
      className="dark"
    >
      <Content>
        <h2>The Concept of Beauty</h2>
        <p style={{ fontWeight: 500 }}>Love your Skin. Feel Fabulous.</p>
        <Link to="/appointment" className="btn btn-blue">
          Book Now!
        </Link>
      </Content>
    </DSection>
  );
};

export default PromoSection1;
