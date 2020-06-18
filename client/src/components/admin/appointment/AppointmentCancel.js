import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_APPOINTMENTS_QUERY } from "../../../util/graphql/appointment";
import { Modal } from "semantic-ui-react";
import { DButton, Toasted } from "../../styled/utils";
import toaster from "toasted-notes";
import Spinner from "../../Spinner";

const AppointmentCancel = ({ openCancel, setOpenCancel, appointmentId }) => {
  const [errors, setErrors] = useState([]);
  const [cancelAppointment, { loading }] = useMutation(
    CANCEL_APPOINTMENT_MUTATION,
    {
      variables: {
        appointmentId,
      },
      refetchQueries: [{ query: FETCH_APPOINTMENTS_QUERY }],
      onCompleted(data) {
        setOpenCancel(false);
        toaster.notify("Appointment Cancelled", { position: "bottom-right" });
      },
      onError(err) {
        setOpenCancel(false);
      },
    }
  );

  const handleConfirm = () => {
    cancelAppointment();
  };

  return (
    <Modal basic size="small" open={openCancel}>
      <Modal.Header>Appointment Cancellation</Modal.Header>
      <Modal.Content>
        <h2>Are you sure you want to cancel the appointment?</h2>
      </Modal.Content>
      <Modal.Actions>
        <DButton confirm onClick={() => setOpenCancel(false)}>
          No
        </DButton>
        <DButton alert onClick={handleConfirm}>
          {loading ? <Spinner small inverted content="Loading..." /> : "Yes"}
        </DButton>
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
