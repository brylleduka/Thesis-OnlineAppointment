import React from "react";
import SigninForm from "../../components/main/authenticate/SigninForm";
import {
  Content,
  DSection,
  DContainer,
  Overlay,
  DImage,
} from "../../components/styled/containers";
import useWindowSize from "../../util/hooks/useWindowSize";

const Signin = (props) => {
  const { width: wid } = useWindowSize();
  const { from } = props.location.state || {
    from: { pathname: "/" },
  };

  const hist = props.history;

  return (
    <DContainer>
      <DSection width="100%" height="100%" flex center>
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
          <SigninForm from={from} hist={hist} />
        </DSection>
      </DSection>
    </DContainer>
  );
};

export default Signin;
