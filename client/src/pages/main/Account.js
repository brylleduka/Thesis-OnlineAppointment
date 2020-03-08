import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { FETCH_USER_ACCOUNT } from "../../util/graphql/user";
import { useQuery } from "@apollo/react-hooks";
import {
  DSection,
  DGrid,
  DContainer,
  Content
} from "../../components/styled/containers";
import AccountContentOne from "../../components/main/user/AccountContentOne";
import AccountContentTwo from "../../components/main/user/AccountContentTwo";
import Skeleton from "react-loading-skeleton";

const Account = props => {
  const { user } = useContext(AuthContext);
  const userId = props.match.params._id;

  const stored = localStorage.getItem("account");
  const [isAccount, setIsAccount] = useState(
    stored === "details"
      ? "details"
      : stored === "appointments"
      ? "appointments"
      : "details"
  );

  const { data: userInfo, loading: userLoading } = useQuery(
    FETCH_USER_ACCOUNT,
    {
      variables: {
        userId
      }
    }
  );

  const handleDetails = () => {
    setIsAccount("details");
    localStorage.setItem("account", "details");
  };
  const handleAppointments = () => {
    setIsAccount("appointments");
    localStorage.setItem("account", "appointments");
  };

  return (
    <DContainer>
      <DSection width="80%" mcenter height="100vh">
        <h1>Account</h1>
        {!userInfo ? (
          <DSection width="80%" mcenter height="100vh">
            <Content flex justify="space-around" width="100%" height="100%">
              <Skeleton circle height="150px" width="150px" />
              <div style={{ width: "70%", margin: "0 auto" }}>
                <Skeleton width="100%" height="100px" />
                <br />
                <Skeleton width="100%" height="50px" />
                <Skeleton width="100%" height="50px" />
                <Skeleton width="100%" height="50px" />
              </div>
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
