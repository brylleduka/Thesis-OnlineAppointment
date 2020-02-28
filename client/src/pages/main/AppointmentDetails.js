import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_SINGLE_APPOINTMENT_QUERY } from "../../util/graphql";
import { Link, useHistory } from "react-router-dom";
import { DSection, Content, DGrid } from "../../components/styled/containers";
import { DButton, DButtonCancel } from "../../components/styled/utils";
import { Form } from "semantic-ui-react";
import Spinner from "../../components/Spinner";
import moment from "moment";
import AppointmentCancel from "../../components/main/user/AppointmentCancel";

const AppointmentDetails = props => {
  const history = useHistory();
  const appointmentId = props.match.params._id;
  const [myAppoint, setMyAppoint] = useState([]);
  const [open, setOpen] = useState(false);

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
    <DSection
      margin="15vh auto 0 auto"
      flex
      justify="center"
      align="center"
      direct="column"
      width="80%"
      height="100vh"
      background={
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      }
    >
      <h2 style={{ color: "#fff" }}>My Appointment Details</h2>

      {!data ? (
        <Spinner inverted />
      ) : (
        <DGrid rowCustom="1fr 100px">
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
          >
            <Form>
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
    </DSection>
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
