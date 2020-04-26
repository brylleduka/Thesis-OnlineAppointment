import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  FETCH_APPOINTMENT_STATUS,
  FETCH_APPOINTMENTS_QUERY,
} from "../../../util/graphql/appointment";
import { DGrid, DCard, Content } from "../../styled/containers";
import { DLabel } from "../../styled/utils";
import Spinner from "../../Spinner";

const AppointmentCard = ({ history }) => {
  const [isDone, setIsDone] = useState([]);
  const [isCancelled, setIsCancelled] = useState([]);
  const [isAppointments, setIsAppointments] = useState([]);

  const { data: dataIsAppointments, loading: loadingIsAppointments } = useQuery(
    FETCH_APPOINTMENTS_QUERY
  );
  useEffect(() => {
    if (dataIsAppointments) {
      setIsAppointments(dataIsAppointments.appointments);
    }
  }, [dataIsAppointments]);

  console.log(isAppointments);

  const { data: dataIsDone, loading: loadingIsDone } = useQuery(
    FETCH_APPOINTMENT_STATUS,
    {
      variables: {
        status: "DONE",
      },
    }
  );
  useEffect(() => {
    if (dataIsDone) {
      setIsDone(dataIsDone.appointmentsByStatus);
    }
  }, [dataIsDone]);

  const { data: dataIsCancelled, loading: loadingIsCancelled } = useQuery(
    FETCH_APPOINTMENT_STATUS,
    {
      variables: {
        status: "CANCELLED",
      },
    }
  );
  useEffect(() => {
    if (dataIsCancelled) {
      setIsCancelled(dataIsCancelled.appointmentsByStatus);
    }
  }, [dataIsCancelled]);

  return (
    <DCard
      dh="200px"
      dw="300px"
      onClick={() => history.push("/zeadmin/appointments")}
      pointer
    >
      <Content
        width="100%"
        height="100%"
        flex
        justify="space-between"
        align="center"
        direct="column"
        margin="0 auto"
      >
        <Content
          width="90%"
          flex
          justify="space-between"
          align="center"
          direct="column"
          margin="0 auto"
        >
          <DLabel
            flex
            justifyCenter
            alignCenter
            weight={500}
            w={"100%"}
            size="18px"
            bgcolor="#eee"
            rounded
          >
            Appointments
          </DLabel>
          <Content width="100%" flex justify="center" align="center">
            {loadingIsAppointments ? (
              <Spinner small />
            ) : (
              isAppointments && <h1>{isAppointments.length}</h1>
            )}
          </Content>
        </Content>
        <Content width="100%">
          <DGrid>
            <Content width="100%" flex justify="space-between" margin="0 auto">
              <DLabel
                flex
                justifyCenter
                alignCenter
                weight={500}
                w={"100%"}
                color="green"
                size="12px"
                rounded
              >
                Successful:
              </DLabel>
              <Content width="100%" flex justify="center" align="center">
                {loadingIsDone ? (
                  <Spinner small />
                ) : (
                  isDone && <h4>{isDone.length}</h4>
                )}
              </Content>
            </Content>
            <Content width="100%" flex justify="space-between" margin="0 auto">
              <DLabel
                flex
                justifyCenter
                alignCenter
                weight={500}
                w={"100%"}
                color="red"
                size="12px"
                rounded
              >
                Cancelled:
              </DLabel>
              <Content width="100%" flex justify="center" align="center">
                {loadingIsCancelled ? (
                  <Spinner small />
                ) : (
                  isCancelled && <h4>{isCancelled.length}</h4>
                )}
              </Content>
            </Content>
          </DGrid>
        </Content>
      </Content>
    </DCard>
  );
};

export default AppointmentCard;
