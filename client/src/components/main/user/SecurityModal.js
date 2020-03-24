import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Modal, Form } from "semantic-ui-react";
import { DLabel, DButton, Toasted } from "../../styled/utils";
import Spinner from "../../Spinner";
import toaster from "toasted-notes";

const SecurityModal = ({ securityOpen, setSecurityOpen, userInfo }) => {
  const [errors, setErrors] = useState({});
  const [isPwds, setIsPwds] = useState({
    newPassword: "",
    oldPassword: ""
  });

  const handlePwdChange = e => {
    setIsPwds({ ...isPwds, [e.target.name]: e.target.value });
  };

  const [updateUser, { loading }] = useMutation(UPDATE_USER_PWD, {
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    onCompleted(result) {
      setSecurityOpen(false);
      toaster.notify(({ onClose }) => (
        <Toasted status={"success"}>
          <span className="description">Password updated</span>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </Toasted>
      ));
    },
    variables: {
      userId: userInfo._id,
      ...isPwds
    }
  });

  function updateUserPassword() {
    updateUser();
  }

  console.log(errors);

  return (
    <Modal
      size="small"
      open={securityOpen}
      onClose={() => setSecurityOpen(false)}
    >
      <Modal.Header>Password Change</Modal.Header>
      <Modal.Content>
        <Form noValidate>
          <Form.Field inline>
            <DLabel style={{ width: "100px" }}>New Password</DLabel>
            <input
              name="newPassword"
              type="password"
              value={isPwds.newPassword}
              onChange={handlePwdChange}
            />
          </Form.Field>
          <Form.Field inline>
            <DLabel style={{ width: "100px" }}>Old Password</DLabel>
            <input
              name="oldPassword"
              type="password"
              value={isPwds.oldPassword}
              onChange={handlePwdChange}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <DButton type="submit" onClick={updateUserPassword}>
          {loading ? <Spinner small inverted /> : "Save Changes"}
        </DButton>
      </Modal.Actions>
    </Modal>
  );
};

const UPDATE_USER_PWD = gql`
  mutation updateUser(
    $userId: ID!
    $newPassword: String
    $oldPassword: String
  ) {
    updateUser(
      _id: $userId
      password: $newPassword
      oldpassword: $oldPassword
    ) {
      _id
    }
  }
`;

export default SecurityModal;
