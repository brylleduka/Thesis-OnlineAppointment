import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_SINGLE_APPOINTMENT_QUERY } from "../../../util/graphql/appointment";
import { useHistory } from "react-router-dom";
import {
  DSection,
  Content,
  DGrid,
} from "../../../components/styled/containers";
import { DButton } from "../../../components/styled/utils";
import { Form, Popup, Icon } from "semantic-ui-react";
import Spinner from "../../../components/Spinner";
import moment from "moment";

const AppointmentDetails = (props) => {
  const history = useHistory();
  const appointmentId = props.match.params._id;
  const [myAppoint, setMyAppoint] = useState({});

  const { data, loading: dataLoading } = useQuery(
    FETCH_SINGLE_APPOINTMENT_QUERY,
    {
      variables: {
        appointmentId,
      },
    }
  );

  useEffect(() => {
    if (data) {
      setMyAppoint(data.appointment);
    }
  }, [data]);

  //Date Difference

  let schedDate;
  let addDate;

  if (data) {
    schedDate = moment(parseInt(data.appointment.date)).format("M/D/YYYY");
    addDate = moment().add(12, "h").format("M/D/YYYY");
  }

  const diffDate = schedDate <= addDate;

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

      {dataLoading ? (
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
                <input value={myAppoint._id} readOnly style={styles.input} />
              </Form.Field>
              <Form.Field style={styles.field}>
                <label style={styles.label}>Service</label>
                <input
                  value={myAppoint.service.name}
                  readOnly
                  style={styles.input}
                />
              </Form.Field>
              <Form.Field style={styles.field}>
                <label style={styles.label}>Aesthetician</label>
                <input
                  value={`${myAppoint.employee.title}. ${myAppoint.employee.firstName} ${myAppoint.employee.lastName}`}
                  readOnly
                  style={styles.input}
                />
              </Form.Field>
              <Form.Field style={styles.field}>
                <label style={styles.label}>Date of Appointment</label>
                <input
                  value={moment(parseInt(myAppoint.date)).format("LL")}
                  readOnly
                  style={styles.input}
                />
              </Form.Field>
              <Form.Field style={styles.field}>
                <label style={styles.label}>Time of Appointment</label>
                <input
                  value={myAppoint.slot_start}
                  readOnly
                  style={styles.input}
                />
              </Form.Field>
              <Form.Field style={styles.field}>
                <label style={styles.label}>Duration</label>
                <input
                  value={`${myAppoint.service.duration} min`}
                  readOnly
                  style={styles.input}
                />
              </Form.Field>
              <Form.Field style={styles.field}>
                <label style={styles.label}>Status</label>
                <input
                  value={myAppoint.status}
                  readOnly
                  style={
                    myAppoint.status === "PENDING"
                      ? {
                          width: "60%",
                          fontSize: 14,
                          fontWeight: 700,
                          color: "gold",
                        }
                      : myAppoint.status === "CANCELLED"
                      ? {
                          width: "60%",
                          fontSize: 14,
                          fontWeight: 700,
                          color: "firebrick",
                        }
                      : myAppoint.status === "VERIFIED"
                      ? {
                          width: "60%",
                          fontSize: 14,
                          fontWeight: 700,
                          color: "green",
                        }
                      : {
                          width: "60%",
                          fontSize: 14,
                          fontWeight: 700,
                          color: "blue",
                        }
                  }
                />
              </Form.Field>
            </Form>
          </Content>
          <Content width="100%" flex align="center" justify="space-between">
            <DButton onClick={() => history.goBack()}>Back</DButton>

            {myAppoint.status === "CANCELLED" || myAppoint.status === "DONE" ? (
              ""
            ) : (
              <>
                <DButton>Reschedule</DButton>
                <Content flex align="center" justify="center">
                  <DButton alert disabled>
                    Cancel
                  </DButton>
                  {diffDate && (
                    <Popup
                      trigger={<Icon circular name="question" size="small" />}
                      content="Cancellation of appointment 12 hours before the scheduled appointment day. If you wish to still cancel your appointment, you may call us on (+63) 926 652 4505. Thank you!"
                      inverted
                    />
                  )}
                </Content>
              </>
            )}
          </Content>
        </DGrid>
      )}
    </DSection>
  );
};

const styles = {
  field: {
    width: "100%",
    display: "flex",
    jusitfyContent: "space-between",
    alignItems: "center",
  },
  label: {
    width: "40%",
  },
  input: {
    width: "60%",
  },
};

export default AppointmentDetails;
