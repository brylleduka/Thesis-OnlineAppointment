import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { FETCH_SINGLE_SERVICE_QUERY } from "../../../util/graphql/service";
import { FETCH_EMPLOYEE_QUERY } from "../../../util/graphql/employee";
import { FETCH_CURRENT_APPOINTMENTS } from "../../../util/graphql/appointment";
import { Modal } from "semantic-ui-react";
import { DButton, DLabel, Toasted } from "../../styled/utils";
import { Content, DGrid } from "../../styled/containers";
import Spinner from "../../Spinner";
import toaster from "toasted-notes";
import moment from "moment";


const NewConfirm = ({
  serviceValue,
  employeeVal,
  startDate,
  selectedTime,
  setOpen,
  clientId,
}) => {
  const [errors, setErrors] = useState({});
  const [newConfirm, setNewConfirm] = useState(false);

  const { data: data_service, loading: loading_service } = useQuery(
    FETCH_SINGLE_SERVICE_QUERY,
    {
      variables: {
        serviceId: serviceValue,
      },
    }
  );

  const { data: data_employee, loading: loading_employee } = useQuery(
    FETCH_EMPLOYEE_QUERY,
    {
      variables: {
        employeeId: employeeVal,
      },
    }
  );

  const [createUserExistAppointment, { loading }] = useMutation(
    NEW_APPOINTMENT,
    {
      update(cache, result) {
        const data = cache.readQuery({
          query: FETCH_CURRENT_APPOINTMENTS,
        });

        const newAppointment = result.data.createUserExistAppointment;

        cache.writeQuery({
          query: FETCH_CURRENT_APPOINTMENTS,
          data: {
            currentAppointments: [newAppointment, ...data.currentAppointments],
          },
        });
      },
      onCompleted(data) {
        setNewConfirm(false);
        setOpen(false);

        if (data) {
          toaster.notify(
            ({ onClose }) => (
              <Toasted status={"success"}>
                <span className="description">Success!</span>
                <span className="close" onClick={onClose}>
                  &times;
                </span>
              </Toasted>
            ),
            { position: "bottom-right" }
          );
        }
      },

      variables: {
        clientId,
        serviceId: serviceValue,
        employeeId: employeeVal,
        date: new Date(startDate).toLocaleDateString(),
        start: selectedTime,
        message: "",
      },
    }
  );

  const handleNewAppointment = () => {
    createUserExistAppointment();
  };

  return (
    <>
      <DButton
        confirm
        onClick={() => setNewConfirm(true)}
        disabled={
          serviceValue === "" || employeeVal === "" || selectedTime === ""
            ? true
            : false
        }
      >
        Confirm
      </DButton>
      <Modal open={newConfirm} size="tiny" onClose={() => setNewConfirm(false)}>
        <Modal.Header>Review Appointment Details</Modal.Header>
        <Modal.Content>
          {data_service && data_employee ? (
            !loading_employee && !loading_service ? (
              <Content width="80%" height="100%" margin="0 auto">
                <DGrid>
                  <Content
                    width="100%"
                    flex
                    justify="space-between"
                    align="center"
                  >
                    <DLabel
                      flex
                      justifyCenter
                      alignCenter
                      weight={700}
                      w={"40%"}
                      size="16px"
                      bgcolor="#eee"
                      rounded
                    >
                      <span>Service:</span>
                    </DLabel>
                    <Content
                      width="50%"
                      flex
                      justify="flex-start"
                      align="center"
                      pad="10px 15px"
                    >
                      <h5>{data_service.service.name}</h5>
                    </Content>
                  </Content>
                  <Content width="100%" flex justify="space-between">
                    <DLabel
                      flex
                      justifyCenter
                      alignCenter
                      weight={700}
                      w={"40%"}
                      size="16px"
                      bgcolor="#eee"
                      rounded
                    >
                      Aesthetician:
                    </DLabel>
                    <Content
                      width="50%"
                      flex
                      justify="flex-start"
                      align="center"
                      pad="10px 15px"
                    >
                      <h5>
                        {data_employee.employee.title}{" "}
                        {data_employee.employee.firstName}{" "}
                        {data_employee.employee.lastName}
                      </h5>
                    </Content>
                  </Content>
                  <Content width="100%" flex justify="space-between">
                    <DLabel
                      flex
                      justifyCenter
                      alignCenter
                      weight={700}
                      w={"40%"}
                      size="16px"
                      bgcolor="#eee"
                      rounded
                    >
                      Date:
                    </DLabel>
                    <Content
                      width="50%"
                      flex
                      justify="flex-start"
                      align="center"
                      pad="10px 15px"
                    >
                      <h5>{moment(startDate).format("LL")}</h5>
                    </Content>
                  </Content>
                  <Content width="100%" flex justify="space-between">
                    <DLabel
                      flex
                      justifyCenter
                      alignCenter
                      weight={700}
                      w={"40%"}
                      size="16px"
                      bgcolor="#eee"
                      rounded
                    >
                      Time:
                    </DLabel>
                    <Content
                      width="50%"
                      flex
                      justify="flex-start"
                      align="center"
                      pad="10px 15px"
                    >
                      <h5>{selectedTime}</h5>
                    </Content>
                  </Content>
                  <Content width="100%" flex justify="space-between">
                    <DLabel
                      flex
                      justifyCenter
                      alignCenter
                      weight={700}
                      w={"40%"}
                      size="16px"
                      bgcolor="#eee"
                      rounded
                    >
                      Duration:
                    </DLabel>
                    <Content
                      width="50%"
                      flex
                      justify="flex-start"
                      align="center"
                      pad="10px 15px"
                    >
                      <h5>{data_service.service.duration} min</h5>
                    </Content>
                  </Content>
                </DGrid>
              </Content>
            ) : (
              <Spinner medium content="Please wait while we fetch your data" />
            )
          ) : (
            <Spinner medium content="Please wait while we fetch your data" />
          )}
        </Modal.Content>
        <Modal.Actions>
          <DButton onClick={handleNewAppointment}>
            {loading ? (
              <Spinner small row inverted content="Booking..." />
            ) : (
              "Make Appointment"
            )}
          </DButton>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const NEW_APPOINTMENT = gql`
  mutation createUserExistAppointment(
    $clientId: ID!
    $serviceId: ID!
    $employeeId: ID!
    $date: String!
    $start: String!
    $message: String
  ) {
    createUserExistAppointment(
      userId: $clientId
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
      }
      employee {
        _id
        title
        firstName
        lastName
        role
      }
      service {
        _id
        name
        price
        duration
      }
      slot_start
      date
      status
      message
      note
      reschedule {
        appointmentId
        new
      }
    }
  }
`;

export default NewConfirm;
