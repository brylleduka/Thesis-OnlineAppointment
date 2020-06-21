import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { FETCH_SINGLE_SERVICE_QUERY } from "../../../util/graphql/service";
import { FETCH_EMPLOYEE_QUERY } from "../../../util/graphql/employee";
import { FETCH_MY_CURRENT_APPOINTMENTS } from "../../../util/graphql/appointment";
import { Modal, Form } from "semantic-ui-react";
import { DButton, DLabel } from "../../styled/utils";
import Spinner from "../../Spinner";
import Toasted from "../../Toasted";
import toaster from "toasted-notes";
import moment from "moment";

const Confirmation = ({
  open,
  setOpen,
  serviceValue,
  employeeVal,
  startDate,
  selectedTime,
  categoryValue,
}) => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [addInfo, setAddInfo] = useState("");
  const [service, setService] = useState({});

  const { data: data_service, loading: loading_service } = useQuery(
    FETCH_SINGLE_SERVICE_QUERY,
    {
      variables: {
        serviceId: serviceValue,
      },
    }
  );

  useEffect(() => {
    if (data_service) {
      setService(data_service.service);
    }
  }, [data_service]);

  const { data: data_employee, loading: loading_employee } = useQuery(
    FETCH_EMPLOYEE_QUERY,
    {
      variables: {
        employeeId: employeeVal,
      },
    }
  );

  const [createAppointment, { loading }] = useMutation(CREATE_NEW_APPOINTMENT, {
    update(cache, result) {
      const data = cache.readQuery({
        query: FETCH_MY_CURRENT_APPOINTMENTS,
      });

      const newAppointment = result.data.createAppointment;

      cache.writeQuery({
        query: FETCH_MY_CURRENT_APPOINTMENTS,
        data: {
          myCurrentAppointment: [newAppointment, ...data.myCurrentAppointment],
        },
      });
    },
    onCompleted(data) {
      setOpen(false);
      history.push("/verifynotice");
      if (data) {
        toaster.notify(
          ({ onClose }) => (
            <Toasted success onClick={onClose}>
              Successfully booked an appointment
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
          <Toasted alert onClick={onClose}>
            {err.graphQLErrors[0].extensions.exception.errors.expiredLog}
          </Toasted>
        ));
      }

      if (err.graphQLErrors[0].extensions.exception.errors.check) {
        toaster.notify(({ onClose }) => (
          <Toasted alert onClick={onClose}>
            {err.graphQLErrors[0].extensions.exception.errors.check}
          </Toasted>
        ));
      }
    },
    variables: {
      serviceId: serviceValue !== null ? serviceValue : null,
      employeeId: employeeVal !== null ? employeeVal : null,
      date: new Date(startDate).toLocaleDateString(),
      start: selectedTime,
      message: addInfo,
    },
  });

  const handleMessage = (e) => {
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
            {loading_service ? (
              <h6>Loading...</h6>
            ) : (
              <input value={service.name} readOnly style={{ width: "60%" }} />
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
          {/* <Form.Field inline>
            <DLabel bgcolor="#2193b0" style={styles.label} rounded m="10px 0">
              Additional Info(optional)
            </DLabel>
            <textarea
              name="message"
              value={addInfo}
              onChange={handleMessage}
            ></textarea>
          </Form.Field> */}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <DButton confirm onClick={handleCreateAppointment}>
          {loading ? (
            <Spinner small inverted row content="Booking..." />
          ) : (
            "Book"
          )}
        </DButton>
        <DButton alert onClick={() => setOpen(false)}>
          Cancel
        </DButton>
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
    textAlign: "center",
  },
};

export default Confirmation;
