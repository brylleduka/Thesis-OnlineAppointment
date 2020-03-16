import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { DLabel, DButton, Toasted } from "../../styled/utils";
import { Modal, Form } from "semantic-ui-react";
import Spinner from "../../Spinner";
import toaster from "toasted-notes";

const EmailModal = ({ emailOpen, setEmailOpen, userInfo }) => {
  const [isEmail, setIsEmail] = useState(userInfo.email);

  const handleEmailChange = e => {
    setIsEmail(e.target.value);
  };

  const [updateUser, { loading }] = useMutation(UPDATE_USER_EMAIL, {
    onCompleted(result) {
      setEmailOpen(false);
      toaster.notify(({ onClose }) => (
        <Toasted status={"success"}>
          <span className="description">Updated Successfully</span>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </Toasted>
      ));
    },
    variables: {
      userId: userInfo._id,
      email: isEmail
    }
  });

  const updateUserEmail = () => {
    updateUser();
  };

  return (
    <Modal size="tiny" open={emailOpen} onClose={() => setEmailOpen(false)}>
      <Modal.Header>Email Address</Modal.Header>
      <Modal.Content>
        <Form noValidate>
          <Form.Field inline>
            <DLabel style={{ width: "100px" }}>Email</DLabel>
            <input name="email" value={isEmail} onChange={handleEmailChange} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <DButton type="submit" onClick={updateUserEmail}>
          {loading ? <Spinner small inverted /> : "Save Changes"}
        </DButton>
      </Modal.Actions>
    </Modal>
  );
};

const UPDATE_USER_EMAIL = gql`
  mutation updateUser($userId: ID!, $email: String) {
    updateUser(_id: $userId, email: $email) {
      _id
      email
    }
  }
`;

export default EmailModal;
