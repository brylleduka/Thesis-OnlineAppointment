import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  FETCH_MY_CURRENT_APPOINTMENTS,
  FETCH_HISTORY_APPOINTMENTS,
} from "../../../util/graphql/appointment";
import { Modal, Form, TextArea, Label } from "semantic-ui-react";
import { DButton, Toasted } from "../../styled/utils";
import toaster from "toasted-notes";
import Spinner from "../../Spinner";

const CancelAppoint = ({ isCancelOpen, setIsCancelOpen, appointmentId }) => {
  const [errors, setErrors] = useState([]);
  const [isNote, setIsNote] = useState("");

  const [cancelAppointment, { loading }] = useMutation(
    CANCEL_APPOINTMENT_MUTATION,
    {
      variables: {
        appointmentId,
        note: isNote.trim() !== "" ? isNote : "",
      },
      refetchQueries: [{ query: FETCH_MY_CURRENT_APPOINTMENTS }],
      onCompleted(data) {
        setIsCancelOpen(false);
        toaster.notify("Appointment Cancelled", { position: "bottom-right" });
      },
      onError(err) {
        setIsCancelOpen(false);
        // setErrors(err.graphQLErrors[0].extensions.exception.errors);

        toaster.notify(({ onClose }) => (
          <Toasted alert onClick={onClose}>
            Something went wrong
          </Toasted>
        ));
      },
    }
  );

  const handleNote = (e) => {
    setIsNote(e.target.value);
  };

  const handleConfirm = () => {
    cancelAppointment();
  };

  console.log(errors);

  return (
    <Modal
      size="small"
      open={isCancelOpen}
      onClose={() => setIsCancelOpen(false)}
      style={absoluteCenter}
      closeOnDimmerClick={false}
    >
      <Modal.Header>Appointment Cancellation</Modal.Header>
      <Modal.Content>
        <h3>Are you sure you want to cancel your appointment?</h3>

        <Label>Reason of cancellation</Label>
        <TextArea value={isNote || ""} onChange={handleNote} />

        <h5>
          Note:{" "}
          <p style={{ fontWeight: 700 }}>
            Often cancellation of appointments may affect future scheduling of
            appointments.
          </p>
        </h5>
      </Modal.Content>
      <Modal.Actions>
        <DButton blue primary onClick={() => setIsCancelOpen(false)}>
          No
        </DButton>
        <DButton red alert onClick={handleConfirm}>
          {loading ? <Spinner small inverted /> : "Yes"}
        </DButton>
      </Modal.Actions>
    </Modal>
  );
};

const CANCEL_APPOINTMENT_MUTATION = gql`
  mutation cancelAppointment($appointmentId: ID!, $note: String) {
    cancelAppointment(_id: $appointmentId, note: $note) {
      _id
      date
      slot_start
      status
      note
      message

      # user {
      #   _id
      #   firstName
      #   lastName
      # }
      # employee {
      #   _id
      #   empId
      #   firstName
      #   lastName
      # }
      # service {
      #   _id
      #   name
      #   duration
      # }
    }
  }
`;

const absoluteCenter = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};

export default CancelAppoint;
