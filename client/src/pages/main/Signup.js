import React from "react";
import SignupForm from "../../components/main/authenticate/SignupForm";
import {
  DGrid,
  Content,
  DSection,
  Overlay,
  DContainer,
} from "../../components/styled/containers";

const Signup = (props) => {
  const { from } = props.location.state || {
    from: { pathname: "/" },
  };

  const hist = props.history;

  return (
    <DContainer>
      <DGrid two className="signup-custom">
        <DSection
          height="100%"
          flex
          justify="center"
          align="center"
          width="100%"
        >
          <SignupForm from={from} hist={hist} />
        </DSection>
        <DSection
          height="100%"
          flex
          justify="center"
          align="center"
          width="100%"
          margin="0"
          background={
            "https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }
        >
          <Content width="90%" className="dark" style={{ zIndex: 2 }}>
            <h2>Sign Up</h2>
            <p>
              Is your skin looking tired, dull and dehydrated? Find out how to
              revive and renew your skin...
            </p>
          </Content>
          <Overlay />
        </DSection>
      </DGrid>
    </DContainer>
  );
};

export default Signup;
