import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_SINGLE_APPOINTMENT_QUERY } from "../../../util/graphql/appointment";
import { Content, DGrid } from "../../styled/containers";
import { DLabel } from "../../styled/utils";
import Accordion from "../../Accordion";
import moment from "moment";

const ReschedInfo = ({ appointResched }) => {
  const reschedId = appointResched.reschedule.appointmentId;

  const { data: reschedData, loading: reschedLoading } = useQuery(
    FETCH_SINGLE_APPOINTMENT_QUERY,
    {
      variables: {
        appointmentId: reschedId
      }
    }
  );

  return (
    <>
      {reschedData &&
        (reschedLoading ? (
          <h5>Loading...</h5>
        ) : (
          <Accordion
            title={"Rescheduled Appointment"}
            fs="14px"
            bg="#eee"
            color="#232323"
            hoverColorText="#fff"
            rounded
          >
            <DGrid>
              <Content
                width="90%"
                bgcolor="#f2f2f2"
                flex
                justify="space-between"
                margin="0 auto"
              >
                <DLabel
                  flex
                  justifyCenter
                  alignCenter
                  weight={500}
                  w={"40%"}
                  size="12px"
                  bgcolor="#eee"
                  rounded
                >
                  Service:
                </DLabel>
                <Content
                  width="50%"
                  flex
                  justify="flex-start"
                  align="center"
                  pad="10px 15px"
                >
                  <h6>{reschedData.appointment.service.name}</h6>
                </Content>
              </Content>
              <Content
                width="90%"
                bgcolor="#f2f2f2"
                flex
                justify="space-between"
                margin="0 auto"
              >
                <DLabel
                  flex
                  justifyCenter
                  alignCenter
                  weight={500}
                  w={"40%"}
                  size="12px"
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
                  <h6>
                    {reschedData.appointment.employee.title}{" "}
                    {reschedData.appointment.employee.firstName}{" "}
                    {reschedData.appointment.employee.lastName}
                  </h6>
                </Content>
              </Content>
              <Content
                width="90%"
                bgcolor="#f2f2f2"
                flex
                justify="space-between"
                margin="0 auto"
              >
                <DLabel
                  flex
                  justifyCenter
                  alignCenter
                  weight={500}
                  w={"40%"}
                  size="12px"
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
                  <h6>
                    {moment(parseInt(reschedData.appointment.date)).format(
                      "LL"
                    )}
                  </h6>
                </Content>
              </Content>
              <Content
                width="90%"
                bgcolor="#f2f2f2"
                flex
                justify="space-between"
                margin="0 auto"
              >
                <DLabel
                  flex
                  justifyCenter
                  alignCenter
                  weight={500}
                  w={"40%"}
                  size="12px"
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
                  <h6>{reschedData.appointment.slot_start}</h6>
                </Content>
              </Content>
              <Content
                width="90%"
                bgcolor="#f2f2f2"
                flex
                justify="space-between"
                margin="0 auto"
              >
                <DLabel
                  flex
                  justifyCenter
                  alignCenter
                  weight={500}
                  w={"40%"}
                  size="12px"
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
                  <h6>{reschedData.appointment.status}</h6>
                </Content>
              </Content>
            </DGrid>
          </Accordion>
        ))}
    </>
  );
};

export default ReschedInfo;
