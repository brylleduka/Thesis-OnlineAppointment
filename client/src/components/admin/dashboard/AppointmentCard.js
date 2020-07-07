import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  FETCH_APPOINTMENT_STATUS,
  FETCH_APPOINTMENTS_QUERY,
} from "../../../util/graphql/appointment";
import { FETCH_WALKIN_APPOINTMENTS } from "../../../util/graphql/walkinappointment";
import { DGrid, DCard, Content } from "../../styled/containers";
import { DLabel } from "../../styled/utils";
import Spinner from "../../Spinner";

const AppointmentCard = ({ history }) => {
  const [isDone, setIsDone] = useState([]);
  const [isCancelled, setIsCancelled] = useState([]);
  const [isAppointments, setIsAppointments] = useState([]);
  const [isWalkAppointments, setIsWalkAppointments] = useState([]);

  const { data: dataIsAppointments, loading: loadingIsAppointments } = useQuery(
    FETCH_APPOINTMENTS_QUERY
  );

  const {
    data: dataIsWalkAppointments
  } = useQuery(FETCH_WALKIN_APPOINTMENTS);

  const { data: dataIsDone, loading: loadingIsDone } = useQuery(
    FETCH_APPOINTMENT_STATUS,
    {
      variables: {
        status: "DONE",
      },
    }
  );

  const { data: dataIsCancelled, loading: loadingIsCancelled } = useQuery(
    FETCH_APPOINTMENT_STATUS,
    {
      variables: {
        status: "CANCELLED",
      },
    }
  );

  useEffect(() => {
    if (dataIsAppointments) {
      setIsAppointments(dataIsAppointments.appointments);
    }

    if (dataIsWalkAppointments) {
      setIsWalkAppointments(dataIsWalkAppointments.walkinAppointments);
    }

    if (dataIsDone) {
      setIsDone(dataIsDone.appointmentsByStatus);
    }
    if (dataIsCancelled) {
      setIsCancelled(dataIsCancelled.appointmentsByStatus);
    }
  }, [dataIsAppointments, dataIsWalkAppointments, dataIsDone, dataIsCancelled]);

  const totalAppointments = isAppointments.length + isWalkAppointments.length;

  return (
    <DCard
      dh="200px"
      dw="300px"
      onClick={() => history.push("/zeadmin/appointments")}
      pointer
      rad="0 0 10px 10px"
      bordtop={"6px solid"}
      bordcolor={({ theme }) => theme.bluer}
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
              <h1>{totalAppointments}</h1>
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
