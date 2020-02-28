import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_MY_APPOINTMENTS } from "../../../util/graphql/appointment";
import { Modal } from "semantic-ui-react";
import { DButtonConfirm, DButtonCancel, Toasted } from "../../styled/utils";
import toaster from "toasted-notes";
import Spinner from "../../Spinner";

const AppointmentCancel = ({ open, setOpen, appointmentId }) => {
  const [errors, setErrors] = useState([]);
  const [cancelAppointment, { loading }] = useMutation(
    CANCEL_APPOINTMENT_MUTATION,
    {
      variables: {
        appointmentId
      },
      refetchQueries: [{ query: FETCH_MY_APPOINTMENTS }],
      onCompleted(data) {
        setOpen(false);
        toaster.notify("Appointment Cancelled", { position: "bottom-right" });
      },
      onError(err) {
        setOpen(false);
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
        if (
          err.graphQLErrors[0].extensions.exception.errors.invalidCancellation
        ) {
          toaster.notify(({ onClose }) => (
            <Toasted status={"error"}>
              <span className="description">
                {
                  err.graphQLErrors[0].extensions.exception.errors
                    .invalidCancellation
                }
              </span>
              <span className="close" onClick={onClose}>
                &times;
              </span>
            </Toasted>
          ));
        }
      }
    }
  );

  const handleConfirm = () => {
    cancelAppointment();
  };

  return (
    <Modal basic size="small" open={open}>
      <Modal.Header>Appointment Cancellation</Modal.Header>
      <Modal.Content>
        <h2>Are you sure you want to cancel your appointment?</h2>
        <p>Cancellation may result your appointment process in the future</p>
        <h1>{appointmentId}</h1>
      </Modal.Content>
      <Modal.Actions>
        <DButtonConfirm basic onClick={() => setOpen(false)}>
          No
        </DButtonConfirm>
        <DButtonCancel basic onClick={handleConfirm}>
          {loading ? <Spinner small inverted /> : "Yes"}
        </DButtonCancel>
      </Modal.Actions>
    </Modal>
  );
};

const CANCEL_APPOINTMENT_MUTATION = gql`
  mutation cancelAppointment($appointmentId: ID!) {
    cancelAppointment(_id: $appointmentId) {
      _id
      date
      slot_start
      status
      user {
        _id
        firstName
        lastName
      }
      employee {
        _id
        empId
        firstName
        lastName
      }
      service {
        _id
        name
        duration
      }
    }
  }
`;

export default AppointmentCancel;
