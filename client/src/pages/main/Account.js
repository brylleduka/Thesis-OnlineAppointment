import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { FETCH_USER_ACCOUNT } from "../../util/graphql/user";
import { useQuery } from "@apollo/react-hooks";
import {
  DSection,
  DGrid,
  DContainer,
  Content,
} from "../../components/styled/containers";
import AccountContentOne from "../../components/main/user/AccountContentOne";
import AccountContentTwo from "../../components/main/user/AccountContentTwo";
import Spinner from "../../components/Spinner";

const Account = (props) => {
  const { user } = useContext(AuthContext);
  const userId = props.match.params._id;

  const stored = localStorage.getItem("account");
  const [isAccount, setIsAccount] = useState(
    stored === "user_appointments"
      ? "user_appointments"
      : stored === "user_details"
      ? "user_details"
      : "user_appointments"
  );

  const { data: userInfo, loading: userLoading } = useQuery(
    FETCH_USER_ACCOUNT,
    {
      variables: {
        userId,
      },
    }
  );

  if (user) {
    console.log("success");
  }

  const handleDetails = () => {
    setIsAccount("user_details");
    localStorage.setItem("account", "user_details");
  };
  const handleAppointments = () => {
    setIsAccount("user_appointments");
    localStorage.setItem("account", "user_appointments");
  };

  return (
    <DContainer>
      <DSection
        width="90%"
        flex
        align="center"
        justify="center"
        direct="column"
        mcenter
        pad="40px 0"
        height="100%"
      >
        <h2>My Account</h2>
        {!userInfo ? (
          <DSection width="90%" mcenter height="100vh">
            <Content flex justify="center" width="100%" height="100%">
              <Spinner content="We're fetching your data..." />
            </Content>
          </DSection>
        ) : (
          <DGrid custom="300px 1fr" gap="10px">
            <AccountContentOne
              handleAppointments={handleAppointments}
              handleDetails={handleDetails}
              userInfo={userInfo.user}
            />
            <AccountContentTwo isAccount={isAccount} userInfo={userInfo.user} />
          </DGrid>
        )}
      </DSection>
    </DContainer>
  );
};

export default Account;
