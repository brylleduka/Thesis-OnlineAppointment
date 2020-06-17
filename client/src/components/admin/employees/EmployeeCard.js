import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_EMPLOYEE_QUERY } from "../../../util/graphql/employee";
import { AuthContext } from "../../../context/auth";
import { DCard, Content } from "../../styled/containers";
import { DLabel, IconWrap, DSelect, DButton } from "../../styled/utils";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import { Cancel } from "@styled-icons/material/Cancel";
import Spinner from "../../Spinner";
import toaster from "toasted-notes";
import Toasted from "../../Toasted";
import useWindowSize from "../../../util/hooks/useWindowSize";

const EmployeeCard = ({ employee }) => {
  const { width: wid } = useWindowSize();
  const { employeeAuth } = useContext(AuthContext);

  const [isEditEmpAcct, setIsEditEmpAcct] = useState(false);

  const [empAcctValue, setEmpAcctValue] = useState({
    role: employee.role,
    level: employee.level,
  });

  const [updateEmpAcct, { loading: loadEmpAcct }] = useMutation(
    UPDATE_EMPLOYEE_ACCT,
    {
      variables: {
        employeeId: employee._id,
        role: empAcctValue.role,
        level: parseInt(empAcctValue.level),
      },
      refetchQueries: [
        {
          query: FETCH_EMPLOYEE_QUERY,
          variables: { employeeId: employee._id },
        },
      ],
      onError(err) {
        if (err.graphQLErrors[0].extensions.exception.errors.notauth) {
          toaster.notify(({ onClose }) => (
            <Toasted alert onClick={onClose}>
              {err.graphQLErrors[0].extensions.exception.errors.notauth}
            </Toasted>
          ));
        }
      },
      onCompleted() {
        setIsEditEmpAcct(false);
        toaster.notify(({ onClose }) => (
          <Toasted success onClick={onClose}>
            Info Updated
          </Toasted>
        ));
      },
    }
  );

  const handleEmpAcctValue = (e) => {
    setEmpAcctValue({ ...empAcctValue, [e.target.name]: e.target.value });
  };

  const handleEditEmplAcct = () => {
    setIsEditEmpAcct(!isEditEmpAcct);
  };

  const handleUpdateEmplAcct = () => {
    updateEmpAcct();
  };

  return (
    <DCard dw="100%" dh="100%" flex fcol justifyBetween overf>
      <Content
        flex
        width="100%"
        height="auto"
        justify="space-between"
        align="center"
      >
        <DLabel size={wid < 768 ? "18px !important" : "22px"} weight={700}>
          Employee Details
        </DLabel>
        {(employeeAuth.role === "ADMIN" || employeeAuth.level > 2) && (
          <>
            <IconWrap
              invisible={isEditEmpAcct ? true : null}
              bgcolor={({ theme }) => theme.green}
              medium
              title={"Update Info"}
              topright
              circle
              shadow
              pad="3px"
              color="light"
            >
              <Edit onClick={handleEditEmplAcct} />
            </IconWrap>
            <IconWrap
              invisible={!isEditEmpAcct ? true : null}
              medium
              title={"Cancel Update"}
              topright
              circle
              shadow
              color="red"
            >
              <Cancel onClick={handleEditEmplAcct} />
            </IconWrap>
          </>
        )}
      </Content>

      <Content
        width="80%"
        height="100%"
        margin="0 auto"
        flex
        justify="flex-start"
        align="center"
        direct="column"
      >
        <Content
          height="auto"
          width="100%"
          flex
          justify="flex-start"
          align="center"
        >
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
            height="auto"
            width="100%"
            flex
            justify="flex-start"
            align="center"
            pad="5px 10px"
          >
            {/* {isEditEmpAcct &&
            (employeeAuth.role === "ADMIN" || employeeAuth.level >= 3) ? (
              <DInput
                fluid
                name="empId"
                value={empAcctValue.empId}
                onChange={handleEmpAcctValue}
              />
            ) : (
              <DLabel flex justifyEnd alignCenter weight={500} size="16px">
                {employee.empId}
              </DLabel>
            )} */}

            <DLabel flex justifyEnd alignCenter weight={500} size="16px">
              {employee.empId}
            </DLabel>
          </Content>
        </Content>
        <Content
          height="auto"
          width="100%"
          flex
          justify="flex-start"
          align="center"
        >
          <DLabel
            flex
            justifyEnd
            alignCenter
            weight={700}
            w={"40%"}
            size="14px"
          >
            Title:
          </DLabel>
          <Content
            height="auto"
            width="100%"
            flex
            justify="flex-start"
            align="center"
            pad="5px 10px"
          >
            {isEditEmpAcct &&
            (employeeAuth.role === "ADMIN" || employeeAuth.level > 2) ? (
              <DSelect
                name="role"
                value={empAcctValue.role}
                onChange={handleEmpAcctValue}
              >
                <option>AESTHETICIAN</option>
                <option>RECEPTIONIST</option>
              </DSelect>
            ) : (
              <DLabel flex justifyEnd alignCenter weight={700} size="16px">
                {employee.role}
              </DLabel>
            )}
          </Content>
        </Content>

        <Content
          height="auto"
          width="100%"
          flex
          justify="flex-start"
          align="center"
        >
          <DLabel
            flex
            justifyEnd
            alignCenter
            weight={700}
            w={"40%"}
            size="14px"
          >
            Level:
          </DLabel>
          <Content
            height="auto"
            width="100%"
            flex
            justify="flex-start"
            align="center"
            pad="5px 10px"
          >
            {isEditEmpAcct &&
            (employeeAuth.role === "ADMIN" || employeeAuth.level > 2) ? (
              <DSelect
                name="level"
                value={empAcctValue.level}
                onChange={handleEmpAcctValue}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </DSelect>
            ) : (
              <DLabel flex justifyEnd alignCenter weight={700} size="16px">
                {employee.level}
              </DLabel>
            )}
          </Content>
        </Content>
      </Content>
      {isEditEmpAcct && (
        <Content flex width="100%" justify="flex-end" align="center">
          <DButton confirm onClick={handleUpdateEmplAcct}>
            {loadEmpAcct ? (
              <Spinner inverted row small content="Loading..." />
            ) : (
              "Update"
            )}
          </DButton>
        </Content>
      )}
    </DCard>
  );
};

export const UPDATE_EMPLOYEE_ACCT = gql`
  mutation updateAccountEmployee($employeeId: ID!, $role: String, $level: Int) {
    updateAccountEmployee(_id: $employeeId, emprole: $role, emplevel: $level) {
      _id
      empId
      role
      level
    }
  }
`;

export default EmployeeCard;
