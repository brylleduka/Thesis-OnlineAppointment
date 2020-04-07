import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_TESTIMONIALS } from "../../../util/graphql/testimonial";
import { DSection, Content, DGrid } from "../../styled/containers";
import Slider from "react-slick";
import { DTestimonialCard } from "../../styled/card";
import { Rating } from "semantic-ui-react";
import Review from "./Review";
import Skeleton from "react-loading-skeleton";

const TestimonialCard = ({ content }) => {
  const [isTestimonials, setIsTestimonials] = useState([]);

  const { data: dataTestimonials, loading: loadTestimonials } = useQuery(
    FETCH_TESTIMONIALS
  );

  useEffect(() => {
    if (dataTestimonials) {
      setIsTestimonials(dataTestimonials.testimonials);
    }
  }, [dataTestimonials]);

  return (
    <DSection height="100%" width="100%" mcenter ref={content}>
      <Review />
      <Content width="80%" height="100%" margin="0 auto" pad="50px 0">
        {loadTestimonials ? (
          <DGrid three gap="20px">
            <Skeleton width={"100%"} height={"350px"} />
            <Skeleton width={"100%"} height={"350px"} />
            <Skeleton width={"100%"} height={"350px"} />
          </DGrid>
        ) : (
          <Slider {...settings}>
            {isTestimonials &&
              isTestimonials.map((testimonial) => (
                <DTestimonialCard key={testimonial._id}>
                  <figure className="testimonial">
                    <div className="profile">
                      <img
                        src={
                          testimonial.user && testimonial.user.photo !== null
                            ? `/images/users/${testimonial.user.photo}`
                            : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample3.jpg"
                        }
                        alt="profile-sample3"
                      />
                    </div>
                    <figcaption>
                      <h4>
                        {testimonial.user &&
                          testimonial.user.firstName +
                            " " +
                            testimonial.user.lastName}
                      </h4>
                      <Rating
                        rating={testimonial.rating}
                        maxRating={5}
                        icon="star"
                        disabled
                      />
                      <blockquote>
                        <span
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            fontSize: "9px",
                            color: "#ccc",
                          }}
                        >
                          2/23/2020
                        </span>
                        {testimonial.message}
                      </blockquote>
                    </figcaption>
                  </figure>
                </DTestimonialCard>
              ))}
          </Slider>
        )}
      </Content>
    </DSection>
  );
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  rows: 2,
  slidesPerRow: 3,
};

export default TestimonialCard;
