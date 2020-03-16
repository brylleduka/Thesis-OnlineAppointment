import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { FETCH_SINGLE_SERVICE_QUERY } from "../../../util/graphql/service";
import { FETCH_EMPLOYEE_QUERY } from "../../../util/graphql/employee";
import {
  FETCH_MY_APPOINTMENTS,
  FETCH_MY_CURRENT_APPOINTMENTS
} from "../../../util/graphql/appointment";
import { Modal, Form } from "semantic-ui-react";
import {
  DButtonConfirm,
  DButtonCancel,
  DLabel,
  Toasted
} from "../../styled/utils";
import Spinner from "../../Spinner";
import toaster from "toasted-notes";

const Confirmation = ({
  open,
  setOpen,
  serviceValue,
  employeeVal,
  startDate,
  selectedTime
}) => {
  const [errors, setErrors] = useState({});
  const [addInfo, setAddInfo] = useState("");
  const history = useHistory();
  const { data: data_service, loading: loading_service } = useQuery(
    FETCH_SINGLE_SERVICE_QUERY,
    {
      variables: {
        serviceId: serviceValue
      }
    }
  );

  const { data: data_employee, loading: loading_employee } = useQuery(
    FETCH_EMPLOYEE_QUERY,
    {
      variables: {
        employeeId: employeeVal
      }
    }
  );

  const [createAppointment, { loading }] = useMutation(CREATE_NEW_APPOINTMENT, {
    update(cache, result) {
      const data = cache.readQuery({
        query: FETCH_MY_CURRENT_APPOINTMENTS
      });

      const newAppointment = result.data.createAppointment;

      cache.writeQuery({
        query: FETCH_MY_CURRENT_APPOINTMENTS,
        data: {
          myCurrentAppointment: [newAppointment, ...data.myCurrentAppointment]
        }
      });
    },
    onCompleted(data) {
      setOpen(false);
      history.push("/zessence/verifynotice");
      if (data) {
        toaster.notify(
          ({ onClose }) => (
            <Toasted status={"success"}>
              <span className="description">
                Successfully booked an appointment
              </span>
              <span className="close" onClick={onClose}>
                &times;
              </span>
            </Toasted>
          ),
          { position: "bottom-right" }
        );
      }
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);

      if (err.graphQLErrors[0].extensions.exception.errors.expiredLog) {
        toaster.notify(({ onClose }) => (
          <Toasted status={"error"}>
            <span className="description">
              {err.graphQLErrors[0].extensions.exception.errors.expiredLog}
            </span>
            <span className="close" onClick={onClose}>
              &times;
            </span>
          </Toasted>
        ));
      }

      if (err.graphQLErrors[0].extensions.exception.errors.check) {
        toaster.notify(({ onClose }) => (
          <Toasted status={"error"}>
            <span className="description">
              {err.graphQLErrors[0].extensions.exception.errors.check}
            </span>
            <span className="close" onClick={onClose}>
              &times;
            </span>
          </Toasted>
        ));
      }
    },
    variables: {
      serviceId: serviceValue,
      employeeId: employeeVal,
      date: new Date(startDate).toLocaleDateString(),
      start: selectedTime,
      message: addInfo
    }
  });

  const handleMessage = e => {
    setAddInfo(e.target.value);
  };

  const handleCreateAppointment = () => {
    createAppointment();
  };

  return (
    <Modal size="tiny" open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Appointment Confirmation</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field inline>
            <DLabel bgcolor="#2193b0" style={styles.label} rounded m="10px 0">
              Service
            </DLabel>
            {!data_service ? (
              <h6>Loading...</h6>
            ) : (
              <input
                value={data_service.service.name}
                readOnly
                style={{ width: "60%" }}
              />
            )}
          </Form.Field>
          <Form.Field inline>
            <DLabel bgcolor="#2193b0" style={styles.label} rounded m="10px 0">
              Aesthetician
            </DLabel>
            {!data_employee ? (
              <h6>Loading...</h6>
            ) : (
              data_employee.employee && (
                <input
                  value={`${data_employee.employee.title} ${data_employee.employee.firstName} ${data_employee.employee.lastName}`}
                  readOnly
                  style={{ width: "60%" }}
                />
              )
            )}
          </Form.Field>
          <Form.Field inline>
            <DLabel bgcolor="#2193b0" style={styles.label} rounded m="10px 0">
              Date
            </DLabel>
            <input
              value={new Date(startDate).toDateString()}
              readOnly
              style={{ width: "60%" }}
            />
          </Form.Field>
          <Form.Field inline>
            <DLabel bgcolor="#2193b0" style={styles.label} rounded m="10px 0">
              Time
            </DLabel>
            <input value={selectedTime} readOnly style={{ width: "60%" }} />
          </Form.Field>
          <Form.Field inline>
            <DLabel bgcolor="#2193b0" style={styles.label} rounded m="10px 0">
              Duration
            </DLabel>
            {!data_service ? (
              <h6>Loading...</h6>
            ) : (
              <input
                value={data_service.service.duration + " min"}
                readOnly
                style={{ width: "60%" }}
              />
            )}
          </Form.Field>
          <Form.Field inline>
            <DLabel bgcolor="#2193b0" style={styles.label} rounded m="10px 0">
              Additional Info(optional)
            </DLabel>
            <textarea
              name="message"
              value={addInfo}
              onChange={handleMessage}
            ></textarea>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <DButtonConfirm onClick={handleCreateAppointment}>
          {loading ? <Spinner small inverted /> : "Book"}
        </DButtonConfirm>
        <DButtonCancel onClick={() => setOpen(false)}>Cancel</DButtonCancel>
      </Modal.Actions>
    </Modal>
  );
};

const CREATE_NEW_APPOINTMENT = gql`
  mutation createAppointment(
    $serviceId: ID!
    $employeeId: ID!
    $date: String!
    $start: String!
    $message: String
  ) {
    createAppointment(
      appointmentInput: {
        serviceId: $serviceId
        employeeId: $employeeId
        date: $date
        slot_start: $start
        message: $message
      }
    ) {
      _id
      message
      date
      slot_start
      note
      reschedule {
        appointmentId
        new
      }
      user {
        _id
        firstName
        lastName
        contact
        email
      }
      service {
        _id
        name
        price
        duration
        photo
      }
      employee {
        _id
        empId
        firstName
        lastName
      }
    }
  }
`;

const styles = {
  label: {
    color: "#fff",
    width: "30%",
    diplay: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  }
};

export default Confirmation;
