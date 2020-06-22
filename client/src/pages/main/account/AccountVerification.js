import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import jwtDecode from "jwt-decode";
import { DSection, Content } from "../../../components/styled/containers";
import { DButton } from "../../../components/styled/utils";
import useWindowSize from "../../../util/hooks/useWindowSize";

const AccountVerification = (props) => {
  const { width: wid } = useWindowSize();
  const emailToken = props.match.params.emailToken;
  const history = useHistory();
  history.go(1);

  const decodedToken = jwtDecode(emailToken);

  const { _id } = decodedToken;

  const [accountVerification] = useMutation(VERRIFIED_ACCOUNT, {
    variables: {
      userId: _id,
    },
  });

  useEffect(() => {
    accountVerification();
  }, []);

  //   window.onload = () => {
  //     accountVerification();
  //   };

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
        <h1>Your account has been verified</h1>
        <h4>You can now make an appointment. Thank you!</h4>
        <Content
          width="80%"
          flex
          justify="space-around"
          align="center"
          margin="0 auto"
          direction={wid < 768 ? "column" : "row"}
        >
          <DButton
            as={Link}
            to="/#home"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            Explore
          </DButton>
          <DButton
            as={Link}
            to={"/login/#sign"}
            style={{ textDecoration: "none", color: "#fff" }}
          >
            Sign In
          </DButton>
        </Content>
      </Content>
    </DSection>
  );
};

const VERRIFIED_ACCOUNT = gql`
  mutation accountVerification($userId: ID!) {
    accountVerification(_id: $userId)
  }
`;

export default AccountVerification;
