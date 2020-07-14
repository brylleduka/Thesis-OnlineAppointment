import React, { useRef } from "react";
import SigninContent from "../../components/main/authenticate/SigninContent";
import {
  Content,
  DSection,
  DContainer,
  Overlay,
  DImage,
} from "../../components/styled/containers";
import useWindowSize from "../../util/hooks/useWindowSize";
import MouseScroll from "../../components/MouseScroll";
import { scrollView } from "../../util/useScrollDown";

const Signin = (props) => {
  const { width: wid } = useWindowSize();
  const content = useRef();

  const scrollDown = () => {
    scrollView(content);
  };
  return (
    <DContainer>
      <DSection
        background={
          "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
        height="85vh"
        fixed
        id="log"
      >
        <Content
          flex
          justify="center"
          direct="column"
          align="center"
          width="50%"
          margin="0 auto"
          height="100%"
          style={{ minWidth: "90%", textAlign: "center" }}
          className="dark"
        >
          <h1
            style={{
              fontSize: "28px",
              letterSpacing: "1rem",
              textTransform: "uppercase",
              width: "70%",
              margin: "0 auto",
            }}
          >
            {"A beautiful day begins with a beautiful mindset."}
          </h1>

          <MouseScroll onClick={scrollDown} inverted />
        </Content>
        <Overlay bgc />
      </DSection>
      <DSection width="100%" height="100%" flex center id="sign" ref={content}>
        {wid > 768 && (
          <DSection
            height="100%"
            flex
            justify="center"
            align="center"
            width="60%"
            margin="0"
            minh="80vh"
            minw="auto"
            maxw="100%"
            style={{ overFlow: "hidden" }}
          >
            <DImage height="100vh" width="100%">
              <img
                src={
                  "https://zessencefacial.s3-ap-southeast-1.amazonaws.com/global/jasmin_model.jpg"
                }
                alt="Avatar"
              />
            </DImage>
            <Overlay bgc>
              <Content
                flex
                justify="center"
                align="center"
                width="80%"
                height="100%"
                margin="0 auto"
                direct="column"
                className="dark"
              >
                <h1>Sign in your account</h1>
                <p
                  style={{
                    fontWeight: 500,
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  A beautiful day begins with a beautiful mindset.
                </p>
              </Content>
            </Overlay>
          </DSection>
        )}

        <DSection
          height="100%"
          flex
          justify="center"
          align="center"
          width="80%"
          mcenter
          minh="80vh"
        >
          <SigninContent />
        </DSection>
      </DSection>
    </DContainer>
  );
};

export default Signin;
