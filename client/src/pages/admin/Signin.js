import React from "react";
import {
  DGrid,
  DSection,
  Content,
  Overlay
} from "../../components/styled/containers";
import SigninForm from "../../components/admin/authentications/SigninForm";

const Signin = () => {
  return (
    <DGrid two>
      <DSection
        height="100vh"
        background={
          "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
      >
        <Overlay>
          <Content
            className="dark"
            flex
            justify="center"
            align="center"
            height="100%"
            width="100%"
          >
            <h1
              style={{
                fontFamily: "Playfair Display",
                fontSize: "48px",
                letterSpacing: "20px",
                textAlign: "center"
              }}
            >
              Z ESSENCE FACIAL & SPA
            </h1>
          </Content>
        </Overlay>
      </DSection>
      <DSection height="100vh">
        <SigninForm />
      </DSection>
    </DGrid>
  );
};

export default Signin;
