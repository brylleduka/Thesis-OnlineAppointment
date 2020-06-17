import React from "react";
import { Link, useHistory } from "react-router-dom";
import { DSection, Content } from "../../components/styled/containers";
import { DButton } from "../../components/styled/utils";

const VerifyNotice = () => {
  const history = useHistory();
  history.go(1);
  return (
    <DSection
      height="100vh"
      margin="15vh 0 0 0"
      background={
        "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      }
      flex
      justify="center"
      align="center"
    >
      <Content
        width="80%"
        flex
        justify="center"
        align="center"
        direct="column"
        bgcolor="rgba(223, 230, 233,0.5)"
        height="80%"
        pad="20px"
        rounded
      >
        <h1>You are one step a way to complete your appointment</h1>
        <h4>
          To complete your process, we send you an email with verification link
        </h4>
        <Content
          width="80%"
          flex
          justify="space-around"
          align="center"
          margin="0 auto"
        >
          <DButton as={Link} to="/">
            Explore
          </DButton>
        </Content>
      </Content>
    </DSection>
  );
};

export default VerifyNotice;
