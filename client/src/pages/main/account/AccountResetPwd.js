import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import jwtDecode from "jwt-decode";
import { Form, Label, Input } from "semantic-ui-react";
import {
  DSection,
  Content,
  DCard,
} from "../../../components/styled/containers";
import { DButton } from "../../../components/styled/utils";
import useWindowSize from "../../../util/hooks/useWindowSize";
import Spinner from "../../../components/Spinner";

const AccountResetPwd = (props) => {
  const { width: wid } = useWindowSize();
  const emailToken = props.match.params.emailToken;
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [passwordValues, setPasswordValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const history = useHistory();
  history.go(1);

  const decodedToken = jwtDecode(emailToken);

  const { _id } = decodedToken;

  const [resetPassword, { loading: loadResetPassword }] = useMutation(
    RESET_PASSWORD,
    {
      variables: {
        userId: _id,
        ...passwordValues,
      },
      onCompleted() {
        setIsNewPassword(true);
        setPasswordValues({ password: "", confirmPassword: "" });
      },
    }
  );

  const handlePasswordChanged = (event) => {
    setPasswordValues({
      ...passwordValues,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <DSection width="100%" height="100vh" flex justify="center" align="center">
      <DCard
        dh="300px"
        dw={wid < 800 ? "90%" : "400px"}
        mcenter
        pointer
        rad="0 0 10px 10px"
        bordtop={"6px solid"}
        bordcolor={({ theme }) => theme.bluer}
        flex
        justifyCenter
        alignCenter
        fcol
      >
        {isNewPassword ? (
          <>
            <h3>New password has been set!</h3>
            <Content
              width="90%"
              margin="0 auto"
              flex
              justify="space-around"
              align="center"
              direct="column"
            >
              <DButton
                as={Link}
                to="/login/#sign"
                fluid
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Sign in
              </DButton>
            </Content>
          </>
        ) : (
          <>
            <h3>Enter your new password</h3>
            <Form
              noValidate
              onSubmit={() => resetPassword()}
              style={{ width: "90%" }}
            >
              <Form.Field>
                <label>New Password</label>
                <Input
                  type="password"
                  name="password"
                  value={passwordValues.password}
                  onChange={handlePasswordChanged}
                />
              </Form.Field>
              <Form.Field>
                <label>Confirm New Password</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={passwordValues.confirmPassword}
                  onChange={handlePasswordChanged}
                />
              </Form.Field>
              <DButton type="submit" fluid>
                {loadResetPassword ? (
                  <Spinner inverted row small content="Loading..." />
                ) : (
                  "Confirm"
                )}
              </DButton>
            </Form>
          </>
        )}
      </DCard>
    </DSection>
  );
};

const RESET_PASSWORD = gql`
  mutation resetPassword(
    $userId: ID
    $password: String
    $confirmPassword: String
  ) {
    resetPassword(
      _id: $userId
      password: $password
      confirmPassword: $confirmPassword
    )
  }
`;

export default AccountResetPwd;
