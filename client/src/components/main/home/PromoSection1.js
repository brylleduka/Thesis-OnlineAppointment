import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_PROMOTIONS } from "../../../util/graphql/promotion";
import Slider from "react-slick";
import { Overlay, DSection, DImage, Content } from "../../styled/containers";

const PromoSection1 = () => {
  const [promos, setPromos] = useState([]);

  const { data: dataPromos, loading: loadPromos } = useQuery(FETCH_PROMOTIONS);

  useEffect(() => {
    if (dataPromos) {
      setPromos(dataPromos.promotions);
    }
  }, [dataPromos]);

  return (
    <DSection width="100%" height="100%" mcenter>
      {loadPromos ? (
        <Content
          width="100%"
          height="60vh"
          flex
          justify="center"
          align="center"
        >
          <Slider content="Fetching" />
        </Content>
      ) : (
        <Slider {...settings}>
          {promos.map((promotion) => (
            <div key={promotion._id}>
              <DSection
                background={
                  promotion.imageURL
                    ? promotion.imageURL
                    : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                }
                pad="80px 0 0 30px"
                height="60vh"
                className="dark"
              >
                <Content>
                  <h2>{promotion.title}</h2>
                  <h2>{promotion.subtitle}</h2>
                  <p style={{ fontWeight: 500 }}>{promotion.description}</p>
                </Content>
                <Overlay bgl />
              </DSection>
            </div>
          ))}
        </Slider>
      )}
    </DSection>
  );
};

const settings = {
  dots: true,
  infinite: true,
  fade: true,
  speed: 500,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default PromoSection1;
