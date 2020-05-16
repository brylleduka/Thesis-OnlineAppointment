import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { DLabel, DButton, Toasted } from "../../styled/utils";
import { Modal, Form } from "semantic-ui-react";
import Spinner from "../../Spinner";
import toaster from "toasted-notes";

const AccountModal = ({ employeeModal, setEmployeeModal, employee }) => {
  const [isRole, setIsRole] = useState(employee.role);

  const handleRoleChange = (e) => {
    setIsRole(e.target.value);
  };

  const [updateEmployee, { loading }] = useMutation(UPDATE_EMPLOYEE_ROLE, {
    onCompleted(result) {
      setEmployeeModal(false);
      toaster.notify(({ onClose }) => (
        <Toasted success onClick={onClose}>
          Successfully Updated
        </Toasted>
      ));
    },
    variables: {
      userId: employee._id,
      role: isRole,
    },
  });

  const updateEmployeeRole = () => {
    updateEmployee();
  };

  return (
    <Modal
      size="tiny"
      open={employeeModal}
      onClose={() => setEmployeeModal(false)}
    >
      <Modal.Header>Employee Details</Modal.Header>
      <Modal.Content>
        <Form noValidate>
          <Form.Field inline>
            <DLabel style={{ width: "100px" }}>Email</DLabel>
            <select name="role" value={isRole} onChange={handleRoleChange}>
              <option>ADMIN</option>
              <option>RECEPTIONIST</option>
              <option>AESTHETICIAN</option>
            </select>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <DButton type="submit" onClick={updateEmployeeRole}>
          {loading ? <Spinner small inverted /> : "Save Changes"}
        </DButton>
      </Modal.Actions>
    </Modal>
  );
};

const UPDATE_EMPLOYEE_ROLE = gql`
  mutation updateEmployee($employeeId: ID!, $role: String) {
    updateEmployee(_id: $employeeId, role: $role) {
      _id
      role
    }
  }
`;

export default AccountModal;
