import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_SINGLE_APPOINTMENT_QUERY } from "../../util/graphql/appointment";
import { useHistory } from "react-router-dom";
import { DSection, Content, DGrid } from "../../components/styled/containers";
import {
  DButton,
  DButtonCancel,
  DButtonConfirm
} from "../../components/styled/utils";
import { Form } from "semantic-ui-react";
import Spinner from "../../components/Spinner";
import moment from "moment";
import Layout from "../../components/admin/layout/Layout";
import AppointmentCancel from "../../components/admin/appointment/AppointmentCancel";
import AppointmentDone from "../../components/admin/appointment/AppointmentDone";

const AppointmentDetails = props => {
  const history = useHistory();
  const appointmentId = props.match.params._id;
  const [myAppoint, setMyAppoint] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDone, setOpenDone] = useState(false);

  const { data, loading: dataLoading } = useQuery(
    FETCH_SINGLE_APPOINTMENT_QUERY,
    {
      variables: {
        appointmentId
      }
    }
  );

  useEffect(() => {
    if (data) {
      setMyAppoint(data.appointment);
    }
  }, [data]);

  return (
    <Layout>
      <DSection
        margin="5vh auto 0 auto"
        flex
        justify="center"
        align="center"
        direct="column"
        width="100%"
        height="100vh"
      >
        <h2 style={{ color: "#111" }}>
          {data && (
            <span style={{ color: "#2980B9", fontWeight: 700 }}>
              {`${data.appointment.user.firstName} ${data.appointment.user.lastName}'s`}
            </span>
          )}{" "}
          Appointment Details
        </h2>

        {!data ? (
          <Spinner />
        ) : (
          <DGrid rowCustom="1fr 100px" style={{ width: "70%" }}>
            <Content
              bgcolor="rgba(223, 230, 233,0.8)"
              width="100%"
              height="100%"
              margn="0 auto"
              pad="1.5rem 2em"
              flex
              jusitfy="center"
              align="center"
              direct="column"
              rounded
            >
              <Form style={{ width: "90%" }}>
                <Form.Field style={styles.field}>
                  <label style={styles.label}>Appointment Id</label>
                  <input
                    value={data.appointment._id}
                    readOnly
                    style={styles.input}
                  />
                </Form.Field>
                <Form.Field style={styles.field}>
                  <label style={styles.label}>Service</label>
                  <input
                    value={data.appointment.service.name}
                    readOnly
                    style={styles.input}
                  />
                </Form.Field>
                <Form.Field style={styles.field}>
                  <label style={styles.label}>Aesthetician</label>
                  <input
                    value={`${data.appointment.employee.title}. ${data.appointment.employee.firstName} ${data.appointment.employee.lastName}`}
                    readOnly
                    style={styles.input}
                  />
                </Form.Field>
                <Form.Field style={styles.field}>
                  <label style={styles.label}>Date of Appointment</label>
                  <input
                    value={moment(parseInt(data.appointment.date)).format("LL")}
                    readOnly
                    style={styles.input}
                  />
                </Form.Field>
                <Form.Field style={styles.field}>
                  <label style={styles.label}>Time of Appointment</label>
                  <input
                    value={data.appointment.slot_start}
                    readOnly
                    style={styles.input}
                  />
                </Form.Field>
                <Form.Field style={styles.field}>
                  <label style={styles.label}>Duration</label>
                  <input
                    value={`${data.appointment.service.duration} min`}
                    readOnly
                    style={styles.input}
                  />
                </Form.Field>
                <Form.Field style={styles.field}>
                  <label style={styles.label}>Status</label>
                  <input
                    value={data.appointment.status}
                    readOnly
                    style={
                      data.appointment.status === "PENDING"
                        ? {
                            width: "60%",
                            fontSize: 14,
                            fontWeight: 700,
                            color: "gold"
                          }
                        : data.appointment.status === "CANCELLED"
                        ? {
                            width: "60%",
                            fontSize: 14,
                            fontWeight: 700,
                            color: "firebrick"
                          }
                        : data.appointment.status === "VERIFIED"
                        ? {
                            width: "60%",
                            fontSize: 14,
                            fontWeight: 700,
                            color: "green"
                          }
                        : {
                            width: "60%",
                            fontSize: 14,
                            fontWeight: 700,
                            color: "blue"
                          }
                    }
                  />
                </Form.Field>
              </Form>
            </Content>
            <Content width="100%" flex align="center" justify="space-between">
              <DButton onClick={() => history.goBack()}>Back</DButton>

              {data.appointment.status === "CANCELLED" ||
              data.appointment.status === "DONE" ? (
                ""
              ) : (
                <>
                  <DButtonConfirm onClick={() => setOpenDone(true)}>
                    Done
                  </DButtonConfirm>
                  <DButton>Reschedule</DButton>
                  <DButtonCancel onClick={() => setOpen(true)}>
                    Cancel
                  </DButtonCancel>
                </>
              )}
            </Content>
          </DGrid>
        )}
        <AppointmentCancel
          open={open}
          setOpen={setOpen}
          appointmentId={appointmentId}
        />
        <AppointmentDone
          openDone={openDone}
          setOpenDone={setOpenDone}
          appointmentId={appointmentId}
        />
      </DSection>
    </Layout>
  );
};

const styles = {
  field: {
    width: "100%",
    display: "flex",
    jusitfyContent: "space-between",
    alignItems: "center"
  },
  label: {
    width: "40%"
  },
  input: {
    width: "60%"
  }
};

export default AppointmentDetails;
