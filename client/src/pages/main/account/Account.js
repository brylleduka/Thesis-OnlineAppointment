import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../../../context/auth";
import { FETCH_USER_ACCOUNT } from "../../../util/graphql/user";
import { useQuery } from "@apollo/react-hooks";
import {
  DSection,
  DGrid,
  DContainer,
  Content,
  Overlay,
} from "../../../components/styled/containers";
import AccountContentOne from "../../../components/main/user/AccountContentOne";
import AccountContentTwo from "../../../components/main/user/AccountContentTwo";
import Spinner from "../../../components/Spinner";
import useScroll from "../../../util/hooks/useScroll";
import MouseScroll from "../../../components/MouseScroll";
import { scrollView } from "../../../util/useScrollDown";

const Account = (props) => {
  const { user } = useContext(AuthContext);
  const userId = props.match.params._id;
  const content = useRef();

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

  const handleDetails = () => {
    setIsAccount("user_details");
    localStorage.setItem("account", "user_details");
  };
  const handleAppointments = () => {
    setIsAccount("user_appointments");
    localStorage.setItem("account", "user_appointments");
  };

  const scrollDown = () => {
    scrollView(content);
  };

  return (
    <DContainer>
      <DSection
        background={
          "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
        height="85vh"
        fixed
        id="account"
      >
        <Content
          flex
          justify="center"
          direct="column"
          align="center"
          width="50%"
          margin="0 auto"
          height="100%"
          style={{ minWidth: "90%", textAlign: "center" }}
          className="dark"
        >
          <h1
            style={{
              fontSize: "38px",
              letterSpacing: "1rem",
              textTransform: "uppercase",
            }}
          >
            {"Account"}
          </h1>

          <MouseScroll onClick={scrollDown} inverted />
        </Content>
        <Overlay bgc />
      </DSection>

      <DSection
        width="90%"
        flex
        align="center"
        justify="center"
        direct="column"
        mcenter
        pad="40px 0"
        height="100%"
        ref={content}
      >
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
