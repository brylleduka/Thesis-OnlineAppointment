import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  FETCH_MY_CURRENT_APPOINTMENTS,
  FETCH_HISTORY_APPOINTMENTS,
  FETCH_SINGLE_APPOINTMENT_QUERY,
} from "../../../util/graphql/appointment";
import { Modal, Label, Form, Popup } from "semantic-ui-react";
import { DButton } from "../../styled/utils";
import toaster from "toasted-notes";
import Spinner from "../../Spinner";
import { QuestionMarkCircle } from "@styled-icons/evaicons-solid";
import moment from "moment";

const CancelAppoint = ({
  isCancelOpen,
  setIsCancelOpen,
  appointmentId,
  userName,
  userEmail,
  employeeName,
  serviceName,
  date,
  time,
}) => {
  let diffHours;
  const [isNote, setIsNote] = useState("");
  // QUERY SINGLE APPOINTMENT
  const { data: appointmentInfo } = useQuery(FETCH_SINGLE_APPOINTMENT_QUERY, {
    variables: {
      appointmentId,
    },
  });
  //
  if (appointmentInfo) {
    // verified = appointmentInfo.appointment.status === "VERIFIED";
    // pending = appointmentInfo.appointment.status === "PENDING";
    // // inprogress = appointmentInfo.appointment.status === "INPROGRESS";
    // done = appointmentInfo.appointment.status === "DONE";
    // rescheduled = appointmentInfo.appointment.status === "RESCHEDULED";
    // cancelled = appointmentInfo.appointment.status === "CANCELLED";

    const dateTime = `${appointmentInfo.appointment.date} ${appointmentInfo.appointment.slot_start}`;

    const now = moment(); //todays date
    const end = moment(dateTime); // another date
    const duration = moment.duration(end.diff(now));
    diffHours = duration.asHours();
  }

  const [cancelAppointment, { loading: loadCancellation }] = useMutation(
    CANCEL_APPOINTMENT_MUTATION,
    {
      variables: {
        appointmentId,
        userEmail,
        userName,
        employeeName,
        serviceName,
        date,
        time,
        note: isNote,
      },
      refetchQueries: [
        { query: FETCH_MY_CURRENT_APPOINTMENTS },
        { query: FETCH_HISTORY_APPOINTMENTS },
      ],

      onCompleted() {
        setIsCancelOpen(false);
        toaster.notify("Appointment Cancelled");
      },
      // onError(err) {
      //   setIsCancelOpen(false);
      //   // setErrors(err.graphQLErrors[0].extensions.exception.errors);

      //   toaster.notify(({ onClose }) => (
      //     <Toasted alert onClick={onClose}>
      //       Something went wrong
      //     </Toasted>
      //   ));
      // },
    }
  );

  const handleNote = (e) => {
    setIsNote(e.currentTarget.value);
  };

  const handleConfirm = () => {
    cancelAppointment();
  };

  console.log(userEmail);

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
        <Form>
          <Form.Field>
            <Label>Reason of cancellation</Label>
            <Form.TextArea value={isNote || ""} onChange={handleNote} />
          </Form.Field>
        </Form>

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
        <DButton
          red
          alert
          disabled={diffHours < 12 ? true : false}
          onClick={handleConfirm}
        >
          {loadCancellation ? (
            <Spinner small inverted row content="Loading..." />
          ) : (
            "Confirm"
          )}
        </DButton>
        <Popup
          inverted
          trigger={<QuestionMarkCircle size="28px" color="rgba(0,0,0,0.7)" />}
          mouseEnterDelay={500}
          mouseLeaveDelay={500}
          content="Cancellation and Rescheduling of appointment may place 12 hours before the scheduled appointment day. If you wish to still cancel or reschedule your appointment, you may call us on (+63) 926 652 4505. Thank you!"
        />
      </Modal.Actions>
    </Modal>
  );
};

const CANCEL_APPOINTMENT_MUTATION = gql`
  mutation cancelAppointment(
    $appointmentId: ID!
    $userName: String
    $userEmail: String
    $serviceName: String
    $employeeName: String
    $date: String
    $time: String
    $note: String
  ) {
    cancelAppointment(
      _id: $appointmentId
      userName: $userName
      userEmail: $userEmail
      employeeName: $employeeName
      serviceName: $serviceName
      date: $date
      time: $time
      note: $note
    )
  }
`;

const absoluteCenter = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};

export default CancelAppoint;
