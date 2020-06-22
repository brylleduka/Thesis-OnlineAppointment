import React from "react";
import SignupForm from "../../components/main/authenticate/SignupForm";
import {
  Content,
  DSection,
  Overlay,
  DImage,
  DContainer,
} from "../../components/styled/containers";
import useWindowSize from "../../util/hooks/useWindowSize";
const Signup = () => {
  const { width: wid } = useWindowSize();
  // const { from } = props.location.state || {
  //   from: { pathname: "/account" },
  // };

  // const hist = props.history;

  return (
    <DContainer>
      <DSection width="100%" height="100%" flex center id="reg">
        <DSection
          height="100%"
          flex
          justify="center"
          align="center"
          width="80%"
          mcenter
          className="signin-right"
          minh="80vh"
        >
          <SignupForm />
        </DSection>
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
                <h1>Z Essence Membership</h1>
                <p
                  style={{
                    fontWeight: 500,
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  Is your skin looking tired, dull and dehydrated? Find out how
                  to revive and renew your skin...
                </p>
              </Content>
            </Overlay>
          </DSection>
        )}
      </DSection>
    </DContainer>
  );
};

export default Signup;
