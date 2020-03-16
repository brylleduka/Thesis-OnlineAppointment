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
import { Modal } from "semantic-ui-react";
import { DButton, DLabel, Toasted } from "../../styled/utils";
import { Content, DGrid } from "../../styled/containers";
import Spinner from "../../Spinner";
import toaster from "toasted-notes";
import moment from "moment";
import Skeleton from "react-loading-skeleton";

const ReschedConfirm = ({
  serviceValue,
  employeeVal,
  startDate,
  selectedTime,
  setIsResched,
  appointmentId,
  setOpen,
  isAdmin,
  status
}) => {
  const [errors, setErrors] = useState({});
  const [addInfo, setAddInfo] = useState("");
  const history = useHistory();
  const [isReschedConfirm, setIsReschedConfirm] = useState(false);

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

  const [reschedAppointment, { loading }] = useMutation(RESCHED_APPOINTMENT, {
    update(cache, result) {
      const data = cache.readQuery({
        query: FETCH_MY_APPOINTMENTS
      });

      const reAppointment = result.data.reschedAppointment;

      cache.writeQuery({
        query: FETCH_MY_APPOINTMENTS,
        data: {
          appointments: [reAppointment, ...data.appointments]
        }
      });
    },
    onCompleted(data) {
      setIsReschedConfirm(false);
      setIsResched(false);
      setOpen(false);

      if (data) {
        toaster.notify(
          ({ onClose }) => (
            <Toasted status={"success"}>
              <span className="description">
                Please confirm your appointment booking to complete your
                process. We send a confirmation link in your email. Thank You!
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

    variables: {
      _id: appointmentId,
      serviceId: serviceValue,
      employeeId: employeeVal,
      date: new Date(startDate).toLocaleDateString(),
      start: selectedTime,
      isAdmin,
      status,
      message: ""
    }
  });

  const handleMessage = e => {
    setAddInfo(e.target.value);
  };

  const handleReschedAppointment = () => {
    reschedAppointment();
  };

  return (
    <>
      <DButton
        onClick={() => setIsReschedConfirm(true)}
        disabled={
          employeeVal === "" || serviceValue === "" || selectedTime === ""
            ? true
            : false
        }
      >
        Make an appointment
      </DButton>

      <Modal
        open={isReschedConfirm}
        size="tiny"
        onClose={() => setIsReschedConfirm(false)}
      >
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
              <Skeleton count={5} />
            )
          ) : (
            <Skeleton count={5} />
          )}
        </Modal.Content>
        <Modal.Actions>
          <DButton onClick={handleReschedAppointment}>
            {loading ? <Spinner small inverted /> : "Confirm"}
          </DButton>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const RESCHED_APPOINTMENT = gql`
  mutation reschedAppointment(
    $_id: ID!
    $status: String
    $isAdmin: Boolean
    $serviceId: ID!
    $employeeId: ID!
    $date: String!
    $start: String!
    $message: String
  ) {
    reschedAppointment(
      _id: $_id
      status: $status
      isAdmin: $isAdmin
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

export default ReschedConfirm;
