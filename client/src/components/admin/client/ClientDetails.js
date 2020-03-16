import React, { useState } from "react";
import { Content, DGrid, DCard } from "../../styled/containers";
import { DLabel } from "../../styled/utils";
import { Edit } from "@styled-icons/boxicons-regular/Edit";

const ClientDetails = ({ userInfo }) => {
  return (
    <Content width="100%">
      <DGrid gap="15px">
        <DCard dw="100%" dh="100%" flex fcol justifyBetween>
          <Content flex width="100%" justify="space-between" aling="center">
            <h3>Personal Details</h3>
          </Content>

          <Content width="80%" height="100%" margin="0 auto">
            <DGrid>
              <Content width="100%" flex justify="center">
                <DLabel
                  flex
                  justifyEnd
                  alignCenter
                  weight={700}
                  w={"40%"}
                  size="14px"
                >
                  Name:
                </DLabel>
                <Content
                  width="100%"
                  flex
                  justify="flex-start"
                  align="center"
                  pad="10px 15px"
                >
                  {userInfo.firstName} {userInfo.lastName}
                </Content>
              </Content>
              <Content width="100%" flex justify="center">
                <DLabel
                  flex
                  justifyEnd
                  alignCenter
                  weight={700}
                  w={"40%"}
                  size="14px"
                >
                  Date of Birth:
                </DLabel>
                <Content
                  width="100%"
                  flex
                  justify="flex-start"
                  align="center"
                  pad="10px 15px"
                >
                  {new Date(
                    parseInt(userInfo.dateOfBirth)
                  ).toLocaleDateString()}
                </Content>
              </Content>
              <Content width="100%" flex justify="center">
                <DLabel
                  flex
                  justifyEnd
                  alignCenter
                  weight={700}
                  w={"40%"}
                  size="14px"
                >
                  Contact:
                </DLabel>
                <Content
                  width="100%"
                  flex
                  justify="flex-start"
                  align="center"
                  pad="10px 15px"
                >
                  {userInfo.contact}
                </Content>
              </Content>
              <Content width="100%" flex justify="center">
                <DLabel
                  flex
                  justifyEnd
                  alignCenter
                  weight={700}
                  w={"40%"}
                  size="14px"
                >
                  Email:
                </DLabel>
                <Content
                  width="100%"
                  flex
                  justify="flex-start"
                  align="center"
                  pad="10px 15px"
                >
                  {userInfo.email}
                </Content>
              </Content>
            </DGrid>
          </Content>
        </DCard>
      </DGrid>
    </Content>
  );
};

export default ClientDetails;
