import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { DButton } from "../../styled/utils";
import { Content, DCard } from "../../styled/containers";
import { LeftArrowAlt } from "@styled-icons/boxicons-solid";
import toaster from "toasted-notes";

const ResendVerify = ({ email }) => {
  const history = useHistory();

  const [resendEmailVerification] = useMutation(RESEND_VERIFICATION, {
    variables: {
      email,
    },
    onCompleted() {
      toaster.notify(
        "We send you again a email verification. Kindly check you email then verify you email. Thank you!",
        {
          duration: 4500,
        }
      );

      setTimeout(() => {
        history.push("/");
      }, 5000);
    },
  });

  const handleBack = () => {
    history.go(0);
  };
  return (
    <DCard
      mcenter
      dw="80%"
      dh="auto"
      p="30px"
      rad="0 0 10px 10px"
      bordtop={"6px solid"}
      bordcolor={({ theme }) => theme.red}
    >
      <p style={{ fontSize: "14px", fontWeight: 700 }}>
        We sent you a verification email. Please verify your email to continue.
      </p>
      <p style={{ fontSize: "14px", fontWeight: 700 }}>
        If you do not recieved an email. Click resend.
      </p>
      <Content
        flex
        justify="space-between"
        align="center"
        width="100%"
        height="50px"
      >
        <DButton flex onClick={handleBack}>
          <LeftArrowAlt size="22px" />
        </DButton>
        <DButton bgprimary onClick={() => resendEmailVerification()}>
          Resend
        </DButton>
      </Content>
    </DCard>
  );
};

const RESEND_VERIFICATION = gql`
  mutation resendVerifyEmail($email: String) {
    resendVerifyEmail(email: $email)
  }
`;

export default ResendVerify;
