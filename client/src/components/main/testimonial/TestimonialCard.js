import React from "react";
import { DSection, Content } from "../../styled/containers";
import Slider from "react-slick";
import "./testimonial.css";

const TestimonialCard = ({ content }) => {
  const settings = {
    dots: true,

    infinite: true,
    speed: 500,
    rows: 2,
    slidesPerRow: 3,
    arrows: false
  };
  return (
    <DSection height="100%" width="90%" mcenter ref={content}>
      <Content width="100%" height="100%" pad="50px 0">
        <Slider {...settings}>
          <div className="testimonial-container">
            <figure className="testimonial">
              {/* <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample3.jpg"
                alt="profile-sample3"
                className="profile"
              /> */}
              <figcaption>
                <h4>Eleanor Crisp</h4>
                <h5>UX Design</h5>
                <blockquote>
                  Dad buried in landslide! Jubilant throngs fill streets!
                  Stunned father inconsolable - demands recount!
                </blockquote>
              </figcaption>
            </figure>
          </div>
          <div className="testimonial-container">
            <figure className="testimonial">
              {/* <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample5.jpg"
                alt="profile-sample5"
                className="profile"
              /> */}
              <figcaption>
                <h4>Gordon Norman</h4>
                <h5>Accountant</h5>
                <blockquote>
                  Wormwood : Calvin, how about you? Calvin : Hard to say ma'am.
                  I think my cerebellum has just fused.{" "}
                </blockquote>
              </figcaption>
            </figure>
          </div>
          <div className="testimonial-container">
            <figure className="testimonial">
              {/* <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample6.jpg"
                alt="profile-sample6"
                className="profile"
              /> */}
              <figcaption>
                <h4>Sue Shei</h4>
                <h5>Public Relations</h5>
                <blockquote>
                  The strength to change what I can, the inability to accept
                  what I can't and the incapacity to tell the difference.
                </blockquote>
              </figcaption>
            </figure>
          </div>
          <div className="testimonial-container">
            <figure className="testimonial">
              {/* <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample3.jpg"
                alt="profile-sample3"
                className="profile"
              /> */}
              <figcaption>
                <h4>Eleanor Crisp</h4>
                <h5>UX Design</h5>
                <blockquote>
                  Dad buried in landslide! Jubilant throngs fill streets!
                  Stunned father inconsolable - demands recount!
                </blockquote>
              </figcaption>
            </figure>
          </div>
          <div className="testimonial-container">
            <figure className="testimonial">
              {/* <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample5.jpg"
                alt="profile-sample5"
                className="profile"
              /> */}
              <figcaption>
                <h4>Gordon Norman</h4>
                <h5>Accountant</h5>
                <blockquote>
                  Wormwood : Calvin, how about you? Calvin : Hard to say ma'am.
                  I think my cerebellum has just fused.{" "}
                </blockquote>
              </figcaption>
            </figure>
          </div>
          <div className="testimonial-container">
            <figure className="testimonial">
              {/* <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample6.jpg"
                alt="profile-sample6"
                className="profile"
              /> */}
              <figcaption>
                <h4>Sue Shei</h4>
                <h5>Public Relations</h5>
                <blockquote>
                  The strength to change what I can, the inability to accept
                  what I can't and the incapacity to tell the difference.
                </blockquote>
              </figcaption>
            </figure>
          </div>
          <div className="testimonial-container">
            <figure className="testimonial">
              {/* <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample3.jpg"
                alt="profile-sample3"
                className="profile"
              /> */}
              <figcaption>
                <h4>Eleanor Crisp</h4>
                <h5>UX Design</h5>
                <blockquote>
                  Dad buried in landslide! Jubilant throngs fill streets!
                  Stunned father inconsolable - demands recount!
                </blockquote>
              </figcaption>
            </figure>
          </div>
          <div className="testimonial-container">
            <figure className="testimonial">
              {/* <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample5.jpg"
                alt="profile-sample5"
                className="profile"
              /> */}
              <figcaption>
                <h4>Gordon Norman</h4>
                <h5>Accountant</h5>
                <blockquote>
                  Wormwood : Calvin, how about you? Calvin : Hard to say ma'am.
                  I think my cerebellum has just fused.{" "}
                </blockquote>
              </figcaption>
            </figure>
          </div>
          <div className="testimonial-container">
            <figure className="testimonial">
              {/* <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample6.jpg"
                alt="profile-sample6"
                className="profile"
              /> */}
              <figcaption>
                <h4>Sue Shei</h4>
                <h5>Public Relations</h5>
                <blockquote>
                  The strength to change what I can, the inability to accept
                  what I can't and the incapacity to tell the difference.
                </blockquote>
              </figcaption>
            </figure>
          </div>
          <div className="testimonial-container">
            <figure className="testimonial">
              {/* <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample3.jpg"
                alt="profile-sample3"
                className="profile"
              /> */}
              <figcaption>
                <h4>Eleanor Crisp</h4>
                <h5>UX Design</h5>
                <blockquote>
                  Dad buried in landslide! Jubilant throngs fill streets!
                  Stunned father inconsolable - demands recount!
                </blockquote>
              </figcaption>
            </figure>
          </div>
          <div className="testimonial-container">
            <figure className="testimonial">
              {/* <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample5.jpg"
                alt="profile-sample5"
                className="profile"
              /> */}
              <figcaption>
                <h4>Gordon Norman</h4>
                <h5>Accountant</h5>
                <blockquote>
                  Wormwood : Calvin, how about you? Calvin : Hard to say ma'am.
                  I think my cerebellum has just fused.{" "}
                </blockquote>
              </figcaption>
            </figure>
          </div>
          <div className="testimonial-container">
            <figure className="testimonial">
              {/* <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample6.jpg"
                alt="profile-sample6"
                className="profile"
              /> */}
              <figcaption>
                <h4>Sue Shei</h4>
                <h5>Public Relations</h5>
                <blockquote>
                  The strength to change what I can, the inability to accept
                  what I can't and the incapacity to tell the difference.
                </blockquote>
              </figcaption>
            </figure>
          </div>
        </Slider>
      </Content>
    </DSection>
  );
};

export default TestimonialCard;
