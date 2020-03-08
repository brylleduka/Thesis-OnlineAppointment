import React from "react";
import { DGrid, DCard, Content } from "../../styled/containers";
import UserDetails from "./UserDetails";

const AccountContentTwo = ({ isAccount, userInfo }) => {
  switch (isAccount) {
    case "details":
      return <UserDetails userInfo={userInfo} />;
    case "appointments":
      return (
        <Content width="100%">
          <DGrid gap="15px">
            <DCard dw="100%" flex fcol justifyBetween>
              <h1>Appointments</h1>
              <div>
                <span>{userInfo.lastName}</span>
              </div>
            </DCard>
          </DGrid>
        </Content>
      );
  }
};

export default AccountContentTwo;
