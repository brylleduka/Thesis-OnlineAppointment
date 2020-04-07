import React from "react";
import { DSection, Content, Overlay } from "../../styled/containers";
import Slider from "react-slick";
import { DTestimonialCard } from "../../styled/card";
import FancyText from "../../FancyText";

const TestimonialSection = () => {
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
      justify="center"
      align="center"
    >
      <Content width="80%" height="auto" margin="auto" pad="50px 0">
        <Slider {...settings}>
          <DTestimonialCard basic inverted>
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
          <DTestimonialCard basic inverted>
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
          <DTestimonialCard basic inverted>
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
          <DTestimonialCard basic inverted>
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
          <DTestimonialCard basic inverted>
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
          <DTestimonialCard basic inverted>
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
          <DTestimonialCard basic inverted>
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
      <Overlay
        bg={"rgba(0,0,0,0.5)"}
        className="dark"
        flex
        justify="center"
        pad="20px"
      >
        <FancyText size="28px" alt>
          What Our Client Say
        </FancyText>
      </Overlay>
    </DSection>
  );
};

export default TestimonialSection;
