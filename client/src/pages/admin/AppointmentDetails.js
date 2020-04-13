import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_SINGLE_APPOINTMENT_QUERY } from "../../util/graphql/appointment";
import { useHistory, Link } from "react-router-dom";
import {
  DSection,
  Content,
  DGrid,
  DCard,
} from "../../components/styled/containers";
import { DButton, DLink, DLabel } from "../../components/styled/utils";
import { Breadcrumb, Icon } from "semantic-ui-react";
import { Service } from "@styled-icons/remix-fill/Service";
import { Bookmark } from "@styled-icons/boxicons-solid/Bookmark";
import { Clock } from "@styled-icons/fa-solid/Clock";
import { UserMd } from "@styled-icons/fa-solid/UserMd";
import { CalendarExclamation } from "@styled-icons/boxicons-solid/CalendarExclamation";
import { CalendarEvent } from "@styled-icons/boxicons-solid/CalendarEvent";
import { Timelapse } from "@styled-icons/material/Timelapse";
import Spinner from "../../components/Spinner";
import moment from "moment";
import Layout from "../../components/admin/layout/Layout";
import AppointmentCancel from "../../components/admin/appointment/AppointmentCancel";
import AppointmentDone from "../../components/admin/appointment/AppointmentDone";
import ReschedModal from "../../components/main/appointment/ReschedModal";

const AppointmentDetails = (props) => {
  const history = useHistory();
  const appointmentId = props.match.params._id;
  const [myAppoint, setMyAppoint] = useState({});
  const [open, setOpen] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [openDone, setOpenDone] = useState(false);

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

  console.log(myAppoint.service);

  return (
    <Layout>
      <DSection
        margin="5vh auto 0 auto"
        flex
        justify="center"
        align="center"
        direct="column"
        width="80%"
        height="100%"
        mcenter
      >
        {dataLoading ? (
          <Spinner content="Please wait while we fetch our data..." />
        ) : (
          <>
            <Content
              width="100%"
              margin="24px 0"
              flex
              justify="space-between"
              align="center"
            >
              <Breadcrumb size={"large"}>
                <Breadcrumb.Section as={Link} to="/zeadmin/appointments">
                  <h3>Appointments</h3>
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section>
                  {myAppoint.user && (
                    <strong>
                      <DLink
                        borderb="true"
                        size="16px"
                        color="#232323"
                        to={`/zeadmin/userInfo/${myAppoint.user._id}`}
                      >
                        {myAppoint.user.firstName} {myAppoint.user.lastName}
                      </DLink>
                      's appointment
                    </strong>
                  )}
                </Breadcrumb.Section>
              </Breadcrumb>
            </Content>

            <DGrid
              custom={
                myAppoint.status === "VERIFIED" ||
                myAppoint.status === "PENDING"
                  ? "3fr 200px"
                  : "1fr"
              }
              gap="5px"
            >
              <DCard
                dw={
                  myAppoint.status === "VERIFIED" ||
                  myAppoint.status === "PENDING"
                    ? "100%"
                    : "80%"
                }
                dh="100%"
                mcenter
                flex
                fcol
                justifyBetween
              >
                <DGrid gap="5px">
                  <Content
                    width="90%"
                    flex
                    justify="flex-start"
                    bordered
                    bordbtm
                    margin="0 auto"
                  >
                    <DLabel
                      flex
                      justifyEnd
                      alignCenter
                      weight={700}
                      w={"50%"}
                      size="14px"
                      tt={"uppercase"}
                    >
                      <Bookmark size="14px" style={{ margin: "0 2px" }} />
                      Appointment ID:
                    </DLabel>
                    <Content
                      width="90%"
                      flex
                      justify="flex-start"
                      align="center"
                      pad="3px 15px"
                      margin="0 auto"
                    >
                      <DLabel
                        flex
                        justifyEnd
                        alignCenter
                        weight={700}
                        w={"50%"}
                        size="15px"
                      >
                        {myAppoint._id}
                      </DLabel>
                    </Content>
                  </Content>

                  <Content
                    width="90%"
                    flex
                    justify="flex-start"
                    bordered
                    bordbtm
                    margin="0 auto"
                  >
                    <DLabel
                      flex
                      justifyEnd
                      alignCenter
                      weight={700}
                      w={"50%"}
                      size="14px"
                      tt={"uppercase"}
                    >
                      <CalendarEvent size="14px" style={{ margin: "0 2px" }} />{" "}
                      Date:
                    </DLabel>
                    <Content
                      width="90%"
                      flex
                      justify="flex-start"
                      align="center"
                      pad="3px 15px"
                      margin="0 auto"
                    >
                      <DLabel
                        flex
                        justifyEnd
                        alignCenter
                        weight={700}
                        w={"50%"}
                        size="15px"
                      >
                        {moment(parseInt(myAppoint.date)).format("LL")}
                      </DLabel>
                    </Content>
                  </Content>
                  <Content
                    width="90%"
                    flex
                    justify="flex-start"
                    bordered
                    bordbtm
                    margin="0 auto"
                  >
                    <DLabel
                      flex
                      justifyEnd
                      alignCenter
                      weight={700}
                      w={"50%"}
                      size="14px"
                      tt={"uppercase"}
                    >
                      <Clock size="14px" style={{ margin: "0 2px" }} /> Time:
                    </DLabel>
                    <Content
                      width="90%"
                      flex
                      justify="flex-start"
                      align="center"
                      pad="3px 15px"
                      margin="0 auto"
                    >
                      <DLabel
                        flex
                        justifyEnd
                        alignCenter
                        weight={700}
                        w={"50%"}
                        size="15px"
                      >
                        {myAppoint.slot_start}
                      </DLabel>
                    </Content>
                  </Content>
                  <Content
                    width="90%"
                    flex
                    justify="flex-start"
                    bordered
                    bordbtm
                    margin="0 auto"
                  >
                    <DLabel
                      flex
                      justifyEnd
                      alignCenter
                      weight={700}
                      w={"50%"}
                      size="14px"
                      tt={"uppercase"}
                    >
                      <UserMd size="14px" style={{ margin: "0 2px" }} />{" "}
                      Aesthetician:
                    </DLabel>
                    <Content
                      width="90%"
                      flex
                      justify="flex-start"
                      align="center"
                      pad="3px 15px"
                      margin="0 auto"
                    >
                      <DLabel
                        flex
                        justifyEnd
                        alignCenter
                        weight={700}
                        w={"50%"}
                        size="15px"
                      >
                        {myAppoint.employee &&
                          `${myAppoint.employee.title}. ${myAppoint.employee.firstName} ${myAppoint.employee.lastName}`}
                      </DLabel>
                    </Content>
                  </Content>
                  <Content
                    width="90%"
                    flex
                    justify="flex-start"
                    bordered
                    bordbtm
                    margin="0 auto"
                  >
                    <DLabel
                      flex
                      justifyEnd
                      alignCenter
                      weight={700}
                      w={"50%"}
                      size="14px"
                      tt={"uppercase"}
                    >
                      <Service size="14px" style={{ margin: "0 2px" }} />{" "}
                      Service:
                    </DLabel>
                    <Content
                      width="90%"
                      flex
                      justify="flex-start"
                      align="center"
                      pad="3px 15px"
                      margin="0 auto"
                    >
                      <DLabel
                        flex
                        justifyEnd
                        alignCenter
                        weight={700}
                        w={"50%"}
                        size="15px"
                      >
                        {myAppoint.service && myAppoint.service.name}
                      </DLabel>
                    </Content>
                  </Content>
                  <Content
                    width="90%"
                    flex
                    justify="flex-start"
                    bordered
                    bordbtm
                    margin="0 auto"
                  >
                    <DLabel
                      flex
                      justifyEnd
                      alignCenter
                      weight={700}
                      w={"50%"}
                      size="14px"
                      tt={"uppercase"}
                    >
                      <Timelapse size="14px" style={{ margin: "0 2px" }} />{" "}
                      Service Duration:
                    </DLabel>
                    <Content
                      width="90%"
                      flex
                      justify="flex-start"
                      align="center"
                      pad="3px 15px"
                      margin="0 auto"
                    >
                      <DLabel
                        flex
                        justifyEnd
                        alignCenter
                        weight={700}
                        w={"50%"}
                        size="15px"
                      >
                        {myAppoint.service && myAppoint.service.duration} mins
                      </DLabel>
                    </Content>
                  </Content>
                  <Content
                    width="90%"
                    flex
                    justify="flex-start"
                    margin="0 auto"
                  >
                    <DLabel
                      flex
                      justifyEnd
                      alignCenter
                      weight={700}
                      w={"50%"}
                      size="14px"
                      tt={"uppercase"}
                    >
                      <CalendarExclamation
                        size="14px"
                        style={{ margin: "0 2px" }}
                      />
                      Status:
                    </DLabel>
                    <Content
                      width="90%"
                      flex
                      justify="flex-start"
                      align="center"
                      pad="3px 15px"
                      margin="0 auto"
                    >
                      <DLabel
                        flex
                        justifyEnd
                        alignCenter
                        weight={700}
                        w={"50%"}
                        size="15px"
                        color={
                          myAppoint.status === "VERIFIED"
                            ? "#8DC26F"
                            : myAppoint.status === "DONE"
                            ? "#56ab2f"
                            : myAppoint.status === "CANCELLED"
                            ? "#b92b27"
                            : myAppoint.status === "RESCHEDULED"
                            ? "#6dd5ed"
                            : "#2193b0"
                        }
                      >
                        {myAppoint.status}
                      </DLabel>
                    </Content>
                  </Content>
                </DGrid>
              </DCard>
              {(myAppoint.status === "PENDING" ||
                myAppoint.status === "VERIFIED") && (
                <Content
                  width="90%"
                  height="100%"
                  flex
                  justify="flex-start"
                  align="center"
                  direct="column"
                  margin="0 auto"
                >
                  <DButton confirm fluid onClick={() => setOpenDone(true)}>
                    <Icon name="calendar check" /> Confirm
                  </DButton>
                  <DButton fluid>
                    <Icon name="calendar alternate" /> Rebook
                  </DButton>
                  <DButton alert fluid onClick={() => setOpenCancel(true)}>
                    <Icon name="delete calendar" /> Cancel
                  </DButton>
                </Content>
              )}
            </DGrid>
          </>
        )}

        {/* {!data ? (
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
                            color: "gold",
                          }
                        : data.appointment.status === "CANCELLED"
                        ? {
                            width: "60%",
                            fontSize: 14,
                            fontWeight: 700,
                            color: "firebrick",
                          }
                        : data.appointment.status === "VERIFIED"
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

              {data.appointment.status === "CANCELLED" ||
              data.appointment.status === "DONE" ||
              data.appointment.status === "RESCHEDULED" ? (
                ""
              ) : (
                <>
                  <DButton confirm onClick={() => setOpenDone(true)}>
                    Done
                  </DButton>
                  <ReschedModal
                    isAdmin={true}
                    status={"VERIFIED"}
                    setOpen={setOpen}
                    appointmentId={appointmentId}
                  />
                  <DButton alert onClick={() => setOpenCancel(true)}>
                    Cancel
                  </DButton>
                </>
              )}
            </Content>
          </DGrid>
        )} */}
        <AppointmentCancel
          openCancel={openCancel}
          setOpenCancel={setOpenCancel}
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
