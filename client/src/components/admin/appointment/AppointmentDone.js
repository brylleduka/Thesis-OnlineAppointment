import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_APPOINTMENTS_QUERY } from "../../../util/graphql/appointment";
import { Modal } from "semantic-ui-react";
import { DButtonConfirm, DButtonCancel, Toasted } from "../../styled/utils";
import toaster from "toasted-notes";
import Spinner from "../../Spinner";

const AppointmentDone = ({ openDone, setOpenDone, appointmentId }) => {
  const [errors, setErrors] = useState([]);
  const [doneAppointment, { loading }] = useMutation(
    DONE_APPOINTMENT_MUTATION,
    {
      variables: {
        appointmentId
      },
      refetchQueries: [{ query: FETCH_APPOINTMENTS_QUERY }],
      onCompleted(data) {
        setOpenDone(false);
        toaster.notify("Appointment Done", { position: "bottom-right" });
      },
      onError(err) {
        setOpenDone(false);
      }
    }
  );

  const handleConfirm = () => {
    doneAppointment();
  };

  return (
    <Modal basic size="small" open={openDone}>
      <Modal.Header>Appointment</Modal.Header>
      <Modal.Content>
        <h2>Appointment already done?</h2>
      </Modal.Content>
      <Modal.Actions>
        <DButtonCancel basic onClick={() => setOpenDone(false)}>
          Close
        </DButtonCancel>
        <DButtonConfirm basic onClick={handleConfirm}>
          {loading ? <Spinner small inverted /> : "Yes"}
        </DButtonConfirm>
      </Modal.Actions>
    </Modal>
  );
};

const DONE_APPOINTMENT_MUTATION = gql`
  mutation doneAppointment($appointmentId: ID!) {
    doneAppointment(_id: $appointmentId) {
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

export default AppointmentDone;
