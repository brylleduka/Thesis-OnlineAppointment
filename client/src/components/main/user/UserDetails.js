import React, { useState } from "react";
import { Content, DGrid, DCard } from "../../styled/containers";
import { DLabel } from "../../styled/utils";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import PersonalModal from "./PersonalModal";
import EmailModal from "./EmailModal";
import SecurityModal from "./SecurityModal";

const UserDetails = ({ userInfo }) => {
  const [personalModal, setPersonalModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [securityModal, setSecurityModal] = useState(false);

  const handlePersonal = () => {
    setPersonalModal(true);
  };
  const handleEmail = () => {
    setEmailModal(true);
  };
  const handleSecurity = () => {
    setSecurityModal(true);
  };

  return (
    <Content width="100%">
      <DGrid gap="15px" med10={"1fr"} med7={"1fr"}>
        <DCard dw="100%" dh="100%" flex fcol justifyBetween>
          <Content flex width="100%" justify="space-between" aling="center">
            <h3>Personal Details</h3>
            <div className="content-edit" onClick={handlePersonal}>
              <Edit size="22px" />
              <span>Edit</span>
            </div>
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
            </DGrid>
          </Content>
        </DCard>
        <DCard dw="100%" dh="100%" flex fcol justifyBetween>
          <Content flex width="100%" justify="space-between" aling="center">
            <h3>Email Address</h3>
            <div className="content-edit" onClick={handleEmail}>
              <Edit size="22px" />
              <span>Edit</span>
            </div>
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
        <DCard dw="100%" dh="100%" flex fcol justifyBetween>
          <Content flex width="100%" justify="space-between" aling="center">
            <h3>Security</h3>
            <div className="content-edit" onClick={handleSecurity}>
              <Edit size="22px" />
              <span>Edit</span>
            </div>
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
                  Password:
                </DLabel>
                <Content
                  width="100%"
                  flex
                  justify="flex-start"
                  align="center"
                  pad="10px 15px"
                >
                  <strong>**********</strong>
                </Content>
              </Content>
            </DGrid>
          </Content>
        </DCard>
      </DGrid>
      <PersonalModal
        userInfo={userInfo}
        personalOpen={personalModal}
        setPersonalOpen={setPersonalModal}
      />
      <EmailModal
        userInfo={userInfo}
        emailOpen={emailModal}
        setEmailOpen={setEmailModal}
      />
      <SecurityModal
        userInfo={userInfo}
        securityOpen={securityModal}
        setSecurityOpen={setSecurityModal}
      />
    </Content>
  );
};

export default UserDetails;
