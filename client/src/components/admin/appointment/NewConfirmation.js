import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { FETCH_SINGLE_SERVICE_QUERY } from "../../../util/graphql/service";
import { FETCH_EMPLOYEE_QUERY } from "../../../util/graphql/employee";
import { FETCH_MY_APPOINTMENTS } from "../../../util/graphql/appointment";
import { Modal, Form } from "semantic-ui-react";
import { DGrid, Content } from "../../styled/containers";
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
  selectedTime,
  values
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

  const [createGuestAppointment, { loading }] = useMutation(
    CREATE_GUEST_APPOINTMENT,
    {
      update(cache, result) {
        const data = cache.readQuery({
          query: FETCH_MY_APPOINTMENTS
        });

        const newAppointment = result.data.createAppointment;

        cache.writeQuery({
          query: FETCH_MY_APPOINTMENTS,
          data: { myAppointments: [newAppointment, ...data.myAppointments] }
        });
      },
      onCompleted(data) {
        setOpen(false);
        history.push("/zeadmin/appointments");
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
        message: addInfo,
        ...values
      }
    }
  );

  const handleMessage = e => {
    setAddInfo(e.target.value);
  };

  const handleCreateAppointment = () => {
    createGuestAppointment();
  };

  return (
    <Modal size="large" open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Appointment Confirmation</Modal.Header>
      <Modal.Content>
        <Form>
          <DGrid two gap="48px">
            <Content width="100%">
              <Form.Field>
                <DLabel
                  bgcolor="#2193b0"
                  style={styles.label}
                  rounded
                  m="10px 0"
                >
                  FirstName
                </DLabel>

                <input name="firstName" value={values.firstName} readOnly />
              </Form.Field>
              <Form.Field>
                <DLabel
                  bgcolor="#2193b0"
                  style={styles.label}
                  rounded
                  m="10px 0"
                >
                  LastName
                </DLabel>

                <input value={values.lastName} readOnly />
              </Form.Field>
              <Form.Field>
                <DLabel
                  bgcolor="#2193b0"
                  style={styles.label}
                  rounded
                  m="10px 0"
                >
                  Contact
                </DLabel>
                <input value={values.contact} readOnly />
              </Form.Field>
              <Form.Field>
                <DLabel
                  bgcolor="#2193b0"
                  style={styles.label}
                  rounded
                  m="10px 0"
                >
                  Email
                </DLabel>
                <input value={values.email} readOnly />
              </Form.Field>
            </Content>
            <Content width="100%">
              <Form.Field>
                <DLabel
                  bgcolor="#2193b0"
                  style={styles.label}
                  rounded
                  m="10px 0"
                >
                  Service
                </DLabel>
                {!data_service ? (
                  <h6>Loading...</h6>
                ) : (
                  <input value={data_service.service.name} readOnly />
                )}
              </Form.Field>
              <Form.Field>
                <DLabel
                  bgcolor="#2193b0"
                  style={styles.label}
                  rounded
                  m="10px 0"
                >
                  Aesthetician
                </DLabel>
                {!data_employee ? (
                  <h6>Loading...</h6>
                ) : (
                  data_employee.employee && (
                    <input
                      value={`${data_employee.employee.title} ${data_employee.employee.firstName} ${data_employee.employee.lastName}`}
                      readOnly
                    />
                  )
                )}
              </Form.Field>
              <Form.Field>
                <DLabel
                  bgcolor="#2193b0"
                  style={styles.label}
                  rounded
                  m="10px 0"
                >
                  Date
                </DLabel>
                <input value={new Date(startDate).toDateString()} readOnly />
              </Form.Field>
              <Form.Field>
                <DLabel
                  bgcolor="#2193b0"
                  style={styles.label}
                  rounded
                  m="10px 0"
                >
                  Time
                </DLabel>
                <input value={selectedTime} readOnly />
              </Form.Field>
              <Form.Field>
                <DLabel
                  bgcolor="#2193b0"
                  style={styles.label}
                  rounded
                  m="10px 0"
                >
                  Duration
                </DLabel>
                {!data_service ? (
                  <h6>Loading...</h6>
                ) : (
                  <input
                    value={data_service.service.duration + " min"}
                    readOnly
                  />
                )}
              </Form.Field>
              <Form.Field>
                <DLabel
                  bgcolor="#2193b0"
                  style={styles.label}
                  rounded
                  m="10px 0"
                >
                  Additional Info(optional)
                </DLabel>
                <textarea
                  name="message"
                  value={addInfo}
                  onChange={handleMessage}
                ></textarea>
              </Form.Field>
            </Content>
          </DGrid>
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

const CREATE_GUEST_APPOINTMENT = gql`
  mutation createGuestAppointment(
    $firstName: String!
    $lastName: String!
    $contact: String
    $email: String!
    $serviceId: ID!
    $employeeId: ID!
    $date: String!
    $start: String!
    $message: String
  ) {
    createGuestAppointment(
      firstName: $firstName
      lastName: $lastName
      email: $email
      contact: $contact
      appointmentInput: {
        serviceId: $serviceId
        employeeId: $employeeId
        date: $date
        slot_start: $start
        message: $message
      }
    ) {
      _id
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
