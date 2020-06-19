import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_VIEWS } from "../../../util/graphql/testimonial";
import { DSection, Content, Overlay } from "../../styled/containers";
import Slider from "react-slick";
import { DTestimonialCard } from "../../styled/card";
import { Rating } from "semantic-ui-react";
import FancyText from "../../FancyText";
import Spinner from "../../Spinner";
import useWindowSize from "../../../util/hooks/useWindowSize";

const TestimonialSection = () => {
  const { width: wid } = useWindowSize();
  const [reviews, setReviews] = useState([]);

  const { data: dataReviews, loading: loadReviews } = useQuery(FETCH_VIEWS, {
    variables: {
      limit: 0,
    },
  });

  useEffect(() => {
    if (dataReviews) {
      setReviews(dataReviews.testimonialsView);
    }
  }, [dataReviews]);

  return (
    <DSection
      height="100vh"
      width="100%"
      mcenter
      background={
        "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      }
      fixed
      flex
      align="center"
    >
      {loadReviews ? (
        <Spinner inverted medium />
      ) : (
        <Content width="80%" height="auto" margin="auto" pad="50px 0">
          <Slider {...settings}>
            {reviews &&
              reviews.map((rev) => (
                <DTestimonialCard basic inverted key={rev._id}>
                  <figure className="testimonial">
                    <div className="profile">
                      <img
                        src={
                          rev.user.imageURL
                            ? rev.user.imageURL
                            : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample3.jpg"
                        }
                        alt="profile-sample3"
                      />
                    </div>

                    <figcaption>
                      <h4>
                        {rev.user.firstName} {rev.user.lastName}{" "}
                      </h4>
                      <Rating
                        rating={rev.rating}
                        maxRating={5}
                        icon="star"
                        disabled
                      />
                      <blockquote>{rev.message}</blockquote>
                    </figcaption>
                  </figure>
                </DTestimonialCard>
              ))}
          </Slider>
        </Content>
      )}

      <Overlay
        bg={"rgba(0,0,0,0.5)"}
        className="dark"
        flex
        justify="flex-start"
        align="flex-start"
        pad="20px"
        width="100%"
        height="100%"
      >
        <div style={{ position: "absolute", top: "20px", left: 0, right: 0 }}>
          <FancyText size={wid <= 768 ? "22px" : "28px"} alt>
            What Our Client Say
          </FancyText>
        </div>
      </Overlay>
    </DSection>
  );
};

const settings = {
  dots: true,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default TestimonialSection;
