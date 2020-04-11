import React, { useState } from "react";
import { DGrid, Content, DCard } from "../../styled/containers";
import { DLabel } from "../../styled/utils";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import AccountModal from "./AccountModal";
import PersonalModal from "./PersonalModal";
import SecurityModal from "./SecurityModal";
import moment from "moment";

const AccountDetails = ({ employee, fetchEmployee }) => {
  const [personalModal, setPersonalModal] = useState(false);
  const [employeeModal, setEmployeeModal] = useState(false);
  const [securityModal, setSecurityModal] = useState(false);

  const handlePersonal = () => {
    setPersonalModal(true);
  };
  const handleEmployee = () => {
    setEmployeeModal(true);
  };
  const handleSecurity = () => {
    setSecurityModal(true);
  };

  return (
    <Content width="100%">
      <DGrid gap="15px">
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
                  {employee.title} {employee.firstName} {employee.lastName}
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
                  {moment(parseInt(employee.dateOfBirth)).format("LL")}
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
                  {employee.contact}
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
                  {employee.email}
                </Content>
              </Content>
            </DGrid>
          </Content>
        </DCard>
        <DCard dw="100%" dh="100%" flex fcol justifyBetween>
          <Content flex width="100%" justify="space-between" aling="center">
            <h3>Employee Details</h3>
            <div className="content-edit">
              {/* <Edit size="22px" /> */}
              {/* <span>Edit</span> */}
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
                  Employee ID:
                </DLabel>
                <Content
                  width="100%"
                  flex
                  justify="flex-start"
                  align="center"
                  pad="10px 15px"
                >
                  {employee.empId}
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
                  Role:
                </DLabel>
                <Content
                  width="100%"
                  flex
                  justify="flex-start"
                  align="center"
                  pad="10px 15px"
                >
                  {employee.role}
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
        employee={employee}
        personalOpen={personalModal}
        setPersonalOpen={setPersonalModal}
        fetchEmployee={fetchEmployee}
      />
      <AccountModal
        employee={employee}
        employeeModal={employeeModal}
        setEmployeeModal={setEmployeeModal}
        fetchEmployee={fetchEmployee}
      />
      <SecurityModal
        employee={employee}
        securityOpen={securityModal}
        setSecurityOpen={setSecurityModal}
        fetchEmployee={fetchEmployee}
      />
    </Content>
  );
};

export default AccountDetails;
