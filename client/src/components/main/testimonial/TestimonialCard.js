import React, { useState } from "react";
import { DSection, Content, Overlay } from "../../styled/containers";
import Slider from "react-slick";
import { DTestimonialCard } from "../../styled/card";
import { Rating } from "semantic-ui-react";

const TestimonialCard = ({ content }) => {
  const [rate, setIsRate] = useState(1);
  const settings = {
    dots: true,

    infinite: true,
    speed: 500,
    rows: 2,
    slidesPerRow: 3,
    arrows: false,
  };

  const handleRate = (e, { rating }) => {
    setIsRate(rating);
  };

  return (
    <DSection height="100%" width="100%" mcenter ref={content}>
      {/* <Rating rating={rate} maxRating={5} onRate={handleRate} icon="star" /> */}
      <Content width="80%" height="100%" margin="0 auto" pad="50px 0">
        <Slider {...settings}>
          <DTestimonialCard>
            <figure className="testimonial">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample3.jpg"
                alt="profile-sample3"
                className="profile"
              />
              <figcaption>
                <h4>Eleanor Crisp</h4>
                <h5>UX Design</h5>
                <blockquote>
                  Dad buried in landslide! Jubilant throngs fill streets!
                  Stunned father inconsolable - demands recount!
                </blockquote>
              </figcaption>
            </figure>
          </DTestimonialCard>
          <DTestimonialCard>
            <figure className="testimonial">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample5.jpg"
                alt="profile-sample5"
                className="profile"
              />
              <figcaption>
                <h4>Gordon Norman</h4>
                <Rating rating={4} maxRating={5} icon="star" disabled />
                <blockquote>
                  Wormwood : Calvin, how about you? Calvin : Hard to say ma'am.
                  I think my cerebellum has just fused.{" "}
                </blockquote>
              </figcaption>
            </figure>
          </DTestimonialCard>
          <DTestimonialCard>
            <figure className="testimonial">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample6.jpg"
                alt="profile-sample6"
                className="profile"
              />
              <figcaption>
                <h4>Sue Shei</h4>
                <h5>Public Relations</h5>
                <blockquote>
                  The strength to change what I can, the inability to accept
                  what I can't and the incapacity to tell the difference.
                </blockquote>
              </figcaption>
            </figure>
          </DTestimonialCard>
          <DTestimonialCard>
            <figure className="testimonial">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample3.jpg"
                alt="profile-sample3"
                className="profile"
              />
              <figcaption>
                <h4>Eleanor Crisp</h4>
                <h5>UX Design</h5>
                <blockquote>
                  Dad buried in landslide! Jubilant throngs fill streets!
                  Stunned father inconsolable - demands recount!
                </blockquote>
              </figcaption>
            </figure>
          </DTestimonialCard>
          <DTestimonialCard>
            <figure className="testimonial">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample5.jpg"
                alt="profile-sample5"
                className="profile"
              />
              <figcaption>
                <h4>Gordon Norman</h4>
                <h5>Accountant</h5>
                <blockquote>
                  Wormwood : Calvin, how about you? Calvin : Hard to say ma'am.
                  I think my cerebellum has just fused.{" "}
                </blockquote>
              </figcaption>
            </figure>
          </DTestimonialCard>
          <DTestimonialCard>
            <figure className="testimonial">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample6.jpg"
                alt="profile-sample6"
                className="profile"
              />
              <figcaption>
                <h4>Sue Shei</h4>
                <h5>Public Relations</h5>
                <blockquote>
                  The strength to change what I can, the inability to accept
                  what I can't and the incapacity to tell the difference.
                </blockquote>
              </figcaption>
            </figure>
          </DTestimonialCard>
          <DTestimonialCard>
            <figure className="testimonial">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample3.jpg"
                alt="profile-sample3"
                className="profile"
              />
              <figcaption>
                <h4>Eleanor Crisp</h4>
                <h5>UX Design</h5>
                <blockquote>
                  Dad buried in landslide! Jubilant throngs fill streets!
                  Stunned father inconsolable - demands recount!
                </blockquote>
              </figcaption>
            </figure>
          </DTestimonialCard>
        </Slider>
      </Content>
    </DSection>
  );
};

export default TestimonialCard;
