import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_SINGLE_SERVICE_QUERY } from "../../../../util/graphql/service";
import { FETCH_EMPLOYEE_QUERY } from "../../../../util/graphql/employee";
import { DGrid, Content, DSection } from "../../../styled/containers";
import { DLabel } from "../../../styled/utils";
import { Service } from "@styled-icons/remix-fill/Service";
import { Bookmark } from "@styled-icons/boxicons-solid/Bookmark";
import { Clock } from "@styled-icons/fa-solid/Clock";
import { UserMd } from "@styled-icons/fa-solid/UserMd";
import { CalendarExclamation } from "@styled-icons/boxicons-solid/CalendarExclamation";
import { CalendarEvent } from "@styled-icons/boxicons-solid/CalendarEvent";
import { Timelapse } from "@styled-icons/material/Timelapse";
import moment from "moment";
import useWindowSize from "../../../../util/hooks/useWindowSize";

const WalkinAppointmentConfirm = ({
  clientValues,
  categoryValue,
  serviceValue,
  employeeVal,
  startDate,
  selectedTime,
}) => {
  const { width: wid } = useWindowSize();
  const [isServiceInfo, setIsServiceInfo] = useState({});
  const [isEmployeeInfo, setIsEmployeeInfo] = useState({});

  const { data: serviceData, loading: loadServiceData } = useQuery(
    FETCH_SINGLE_SERVICE_QUERY,
    {
      variables: {
        serviceId: serviceValue,
      },
    }
  );

  const { data: employeeData, loading: loadEmployeeData } = useQuery(
    FETCH_EMPLOYEE_QUERY,
    {
      variables: {
        employeeId: employeeVal,
      },
    }
  );

  useEffect(() => {
    if (serviceData) {
      setIsServiceInfo(serviceData.service);
    }

    if (employeeData) {
      setIsEmployeeInfo(employeeData.employee);
    }
  }, [serviceData, employeeData]);

  return (
    <DGrid custom={wid <= 768 ? "1fr" : "1fr 1fr"} gap="10px">
      {/* CLIENT'S INFO */}
      <DSection
        flex
        justify="space-around"
        align="center"
        mcenter
        width="100%"
        height="100%"
        direct="column"
      >
        <DLabel size="24px" tt={"uppercase"}>
          Client's Details
        </DLabel>
        <Content
          width="100%"
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
            w={"100%"}
            size="12px"
            tt={"uppercase"}
          >
            First Name:
          </DLabel>
          <Content
            width="90%"
            flex
            justify="flex-start"
            align="center"
            pad="3px 14px"
            margin="0 auto"
          >
            <DLabel
              flex
              justifyEnd
              alignCenter
              weight={700}
              w={"100%"}
              size="14px"
            >
              {clientValues.firstName}
            </DLabel>
          </Content>
        </Content>

        <Content
          width="100%"
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
            w={"100%"}
            size="12px"
            tt={"uppercase"}
          >
            Last Name
          </DLabel>
          <Content
            width="90%"
            flex
            justify="flex-start"
            align="center"
            pad="3px 14px"
            margin="0 auto"
          >
            <DLabel
              flex
              justifyEnd
              alignCenter
              weight={700}
              w={"100%"}
              size="14px"
            >
              {clientValues.lastName}
            </DLabel>
          </Content>
        </Content>

        <Content
          width="100%"
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
            w={"100%"}
            size="12px"
            tt={"uppercase"}
          >
            Email:
          </DLabel>
          <Content
            width="90%"
            flex
            justify="flex-start"
            align="center"
            pad="3px 14px"
            margin="0 auto"
          >
            <DLabel
              flex
              justifyEnd
              alignCenter
              weight={700}
              w={"100%"}
              size="14px"
            >
              {clientValues.email}
            </DLabel>
          </Content>
        </Content>

        <Content
          width="100%"
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
            w={"100%"}
            size="12px"
            tt={"uppercase"}
          >
            Contact:
          </DLabel>
          <Content
            width="90%"
            flex
            justify="flex-start"
            align="center"
            pad="3px 14px"
            margin="0 auto"
          >
            <DLabel
              flex
              justifyEnd
              alignCenter
              weight={700}
              w={"100%"}
              size="14px"
            >
              {clientValues.contact}
            </DLabel>
          </Content>
        </Content>

        <Content
          width="100%"
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
            w={"100%"}
            size="12px"
            tt={"uppercase"}
          >
            Address:
          </DLabel>
          <Content
            width="90%"
            flex
            justify="flex-start"
            align="center"
            pad="3px 14px"
            margin="0 auto"
          >
            <DLabel
              flex
              justifyEnd
              alignCenter
              weight={700}
              w={"100%"}
              size="14px"
            >
              {clientValues.address}
            </DLabel>
          </Content>
        </Content>
      </DSection>
      {/* APPOINTMENT DETAILS */}
      <DSection
        flex
        justify="space-around"
        align="center"
        mcenter
        width="100%"
        height="100%"
        direct="column"
      >
        <DLabel size="24px" tt={"uppercase"}>
          Appointment's Details
        </DLabel>
        <Content
          width="100%"
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
            w={"100%"}
            size="12px"
            tt={"uppercase"}
          >
            Service:
          </DLabel>
          <Content
            width="90%"
            flex
            justify="flex-start"
            align="center"
            pad="3px 14px"
            margin="0 auto"
          >
            <DLabel
              flex
              justifyEnd
              alignCenter
              weight={700}
              w={"100%"}
              size="14px"
            >
              {isServiceInfo.name}
            </DLabel>
          </Content>
        </Content>

        <Content
          width="100%"
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
            w={"100%"}
            size="12px"
            tt={"uppercase"}
          >
            Service Duration
          </DLabel>
          <Content
            width="90%"
            flex
            justify="flex-start"
            align="center"
            pad="3px 14px"
            margin="0 auto"
          >
            <DLabel
              flex
              justifyEnd
              alignCenter
              weight={700}
              w={"100%"}
              size="14px"
            >
              {isServiceInfo.duration} min
            </DLabel>
          </Content>
        </Content>

        <Content
          width="100%"
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
            w={"100%"}
            size="12px"
            tt={"uppercase"}
          >
            Aesthetician:
          </DLabel>
          <Content
            width="90%"
            flex
            justify="flex-start"
            align="center"
            pad="3px 14px"
            margin="0 auto"
          >
            <DLabel
              flex
              justifyEnd
              alignCenter
              weight={700}
              w={"100%"}
              size="14px"
            >
              {isEmployeeInfo.title} {isEmployeeInfo.firstName}{" "}
              {isEmployeeInfo.lastName}
            </DLabel>
          </Content>
        </Content>

        <Content
          width="100%"
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
            w={"100%"}
            size="12px"
            tt={"uppercase"}
          >
            Date:
          </DLabel>
          <Content
            width="90%"
            flex
            justify="flex-start"
            align="center"
            pad="3px 14px"
            margin="0 auto"
          >
            <DLabel
              flex
              justifyEnd
              alignCenter
              weight={700}
              w={"100%"}
              size="14px"
            >
              {moment(startDate).format("LL")}
            </DLabel>
          </Content>
        </Content>

        <Content
          width="100%"
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
            w={"100%"}
            size="12px"
            tt={"uppercase"}
          >
            Time:
          </DLabel>
          <Content
            width="90%"
            flex
            justify="flex-start"
            align="center"
            pad="3px 14px"
            margin="0 auto"
          >
            <DLabel
              flex
              justifyEnd
              alignCenter
              weight={700}
              w={"100%"}
              size="14px"
            >
              {selectedTime}
            </DLabel>
          </Content>
        </Content>
      </DSection>
    </DGrid>
  );
};

export default WalkinAppointmentConfirm;
