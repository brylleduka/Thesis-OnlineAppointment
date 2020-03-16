import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_SINGLE_APPOINTMENT_QUERY } from "../../../util/graphql/appointment";
import { Modal, Popup, Icon } from "semantic-ui-react";
import { Content, DGrid } from "../../styled/containers";
import { DLabel, DButton } from "../../styled/utils";
import Accordion from "../../Accordion";
import moment from "moment";
import ReschedInfo from "./ReschedInfo";
import CancelAppoint from "./CancelAppoint";
import ReschedModal from "../appointment/ReschedModal";

import Skeleton from "react-loading-skeleton";

const CurrentAppointModal = ({ appointId, open, setOpen }) => {
  let verified;
  let pending;
  let done;
  let rescheduled;
  let cancelled;
  let appointedDate;
  let addDate;
  let diffDate;

  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const { data: appointmentInfo, loading: appointmentLoading } = useQuery(
    FETCH_SINGLE_APPOINTMENT_QUERY,
    {
      variables: {
        appointmentId: appointId
      }
    }
  );

  if (appointmentInfo) {
    verified = appointmentInfo.appointment.status === "VERIFIED";
    pending = appointmentInfo.appointment.status === "PENDING";
    done = appointmentInfo.appointment.status === "DONE";
    rescheduled = appointmentInfo.appointment.status === "RESCHEDULED";
    cancelled = appointmentInfo.appointment.status === "CANCELLED";

    appointedDate = new Date(parseInt(appointmentInfo.appointment.date));
    addDate = moment()
      .add(1, "d")
      .format("M/D/YYYY");
    diffDate = appointedDate <= new Date(addDate);
  }

  return (
    <>
      <Modal
        size="tiny"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        closeIcon
      >
        <Modal.Header>Appointment Details</Modal.Header>
        {appointmentInfo ? (
          appointmentLoading ? (
            <Modal.Content>
              <Skeleton />
              <Skeleton count={5} />
            </Modal.Content>
          ) : (
            <>
              <Modal.Content scrolling>
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
                        <h5>{appointmentInfo.appointment.service.name}</h5>
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
                          {appointmentInfo.appointment.employee.title}{" "}
                          {appointmentInfo.appointment.employee.firstName}{" "}
                          {appointmentInfo.appointment.employee.lastName}
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
                        <h5>
                          {moment(
                            parseInt(appointmentInfo.appointment.date)
                          ).format("LL")}
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
                        Time:
                      </DLabel>
                      <Content
                        width="50%"
                        flex
                        justify="flex-start"
                        align="center"
                        pad="10px 15px"
                      >
                        <h5>{appointmentInfo.appointment.slot_start}</h5>
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
                        <h5>
                          {appointmentInfo.appointment.service.duration} min
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
                        Status:
                      </DLabel>
                      <Content
                        width="50%"
                        flex
                        justify="flex-start"
                        align="center"
                        pad="10px 15px"
                      >
                        <h5
                          style={
                            ({
                              width: "60%",
                              fontSize: "12px",
                              fontWeight: 700
                            },
                            verified
                              ? { color: "#0f9b0f" }
                              : pending
                              ? { color: "#fffc00" }
                              : done
                              ? { color: "#2980B9" }
                              : cancelled
                              ? { color: "#f12711" }
                              : rescheduled
                              ? { color: "#6dd5ed" }
                              : "#2193b0")
                          }
                        >
                          {appointmentInfo.appointment.status}
                        </h5>
                      </Content>
                    </Content>
                    <Content
                      width="100%"
                      margin="10px 0"
                      flex
                      justify="center"
                      align="center"
                    >
                      <Accordion
                        title={"Message"}
                        fs="14px"
                        bg="#eee"
                        color="#232323"
                        hoverColorText="#fff"
                        rounded
                      >
                        <p>{appointmentInfo.appointment.message}</p>
                      </Accordion>
                    </Content>
                    <Content
                      width="100%"
                      margin="10px 0"
                      flex
                      justify="center"
                      align="center"
                    >
                      {appointmentInfo.appointment.reschedule.appointmentId ? (
                        <ReschedInfo
                          appointResched={appointmentInfo.appointment}
                        />
                      ) : (
                        ""
                      )}
                    </Content>
                  </DGrid>
                </Content>
              </Modal.Content>
              <Modal.Actions>
                {appointmentInfo.appointment.status === "PENDING" ||
                appointmentInfo.appointment.status === "VERIFIED" ? (
                  <>
                    {appointmentInfo.appointment.reschedule.new !== true && (
                      <ReschedModal
                        status={"PENDING"}
                        isAdmin={false}
                        setOpen={setOpen}
                        appointmentId={appointmentInfo.appointment._id}
                      />
                    )}

                    <DButton
                      alert
                      onClick={() => setIsCancelOpen(true)}
                      disabled={diffDate ? true : false}
                    >
                      Cancel
                    </DButton>
                    <Popup
                      trigger={
                        <Icon
                          circular
                          name="question"
                          size="small"
                          color="blue"
                        />
                      }
                      mouseEnterDelay={500}
                      mouseLeaveDelay={500}
                      content="Cancellation of appointment may place under 12 hours before the scheduled appointment day. If you wish to still cancel your appointment, you may call us on (+63) 926 652 4505. Thank you!"
                    />
                  </>
                ) : (
                  ""
                )}

                <CancelAppoint
                  setIsCancelOpen={setIsCancelOpen}
                  isCancelOpen={isCancelOpen}
                  appointmentId={appointmentInfo.appointment._id}
                />
              </Modal.Actions>
            </>
          )
        ) : (
          <Modal.Content>
            <Skeleton count={5} />
          </Modal.Content>
        )}
      </Modal>
    </>
  );
};

export default CurrentAppointModal;