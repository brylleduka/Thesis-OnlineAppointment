import React from "react";
import SigninForm from "../../components/main/authenticate/SigninForm";
import {
  DGrid,
  Content,
  DSection,
  DContainer
} from "../../components/styled/containers";

const Signin = props => {
  const { from } = props.location.state || {
    from: { pathname: "/zessence/appointment" }
  };

  const hist = props.history;

  return (
    <DContainer>
      <DGrid two className="signin-custom">
        <DSection
          height="100vh"
          flex
          justify="center"
          align="center"
          width="100%"
          margin="0"
          background={
            "https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }
          className="signin-left"
        >
          <Content width="90%">
            <h2>Sign In</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
              magnam in veniam cupiditate voluptatem, aspernatur quod nesciunt
              est, iure iusto ea voluptatum illo quaerat voluptas exercitationem
              repudiandae tempore alias ratione.
            </p>
          </Content>
        </DSection>
        <DSection
          height="100vh"
          flex
          justify="center"
          align="center"
          width="100%"
          className="signin-right"
        >
          <SigninForm from={from} hist={hist} />
        </DSection>
      </DGrid>
    </DContainer>
  );
};

export default Signin;
