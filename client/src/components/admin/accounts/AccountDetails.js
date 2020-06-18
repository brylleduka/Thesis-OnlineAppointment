import React, { useState } from "react";
import { DGrid, Content, DCard } from "../../styled/containers";
import { DLabel } from "../../styled/utils";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import AccountModal from "./AccountModal";
import PersonalModal from "./PersonalModal";
import SecurityModal from "./SecurityModal";
import PersonalCard from "./PersonalCard";
import EmployeeCard from "./EmployeeCard";
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
      <DGrid gap="15px" med7="1fr" med10="1fr">
        <PersonalCard employee={employee} />
        <EmployeeCard employee={employee} />
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
                  <strong>
                    {employee.password.replace(/./g, "*").substr(0, 30)}
                  </strong>
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
