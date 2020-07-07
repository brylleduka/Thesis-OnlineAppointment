import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_EMPLOYEE_QUERY } from "../../../util/graphql/employee";
import { FETCH_SINGLE_SERVICE_QUERY } from "../../../util/graphql/service";
import { FETCH_CHECKED_APPOINTMENTS } from "../../../util/graphql/appointment";
import { FETCH_WALKIN_CHECKED_APPOINTMENTS } from "../../../util/graphql/walkinappointment";
import DatePicker from "react-datepicker";
import { Content, DGrid } from "../../styled/containers";
import { DLabel } from "../../styled/utils";
import Spinner from "../../Spinner";
import DRadio from "../../DRadio";
import moment from "moment";
import timeLineLabels from "../../../util/hooks/timeLineLabels";

const AppointDate = ({
  setStartDate,
  setSelectedTime,
  startDate,
  employeeVal,
  serviceValue,
  calendarSize,
  categoryValue,
}) => {
  let days = [];
  let times = [];
  let appointmentTimes = [];
  const [isEmp, setIsEmp] = useState({});
  const [isServ, setIsServ] = useState({});
  const [isCheckAppointments, setIsCheckAppointments] = useState([]);
  const [isCheckWalkAppointments, setIsCheckWalkAppointments] = useState([]);

  const handleTimeChanged = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDateChanged = (date) => {
    setStartDate(date);
  };

  const { data: data_employee, loading: loading_employee } = useQuery(
    FETCH_EMPLOYEE_QUERY,
    {
      variables: {
        employeeId: employeeVal,
      },
    }
  );

  // useEffect(() => {
  //   if (data_employee) {
  //     setIsEmp(data_employee);
  //   }
  // }, [data_employee]);

  const { data: data_service, loading: loading_service } = useQuery(
    FETCH_SINGLE_SERVICE_QUERY,
    {
      variables: {
        serviceId: serviceValue,
      },
    }
  );

  // useEffect(() => {
  //   if (data_service) {
  //     setIsServ(data_service);
  //   }
  // }, [data_service]);

  const { data: data_appointments, loading: loading_appointments } = useQuery(
    FETCH_CHECKED_APPOINTMENTS,
    {
      variables: {
        employeeId: employeeVal,
        date: moment(startDate).format("L"),
      },
    }
  );

  const { data: walkAppointData, loading: loadWalkAppointData } = useQuery(
    FETCH_WALKIN_CHECKED_APPOINTMENTS,
    {
      variables: {
        employeeId: employeeVal,
        date: moment(startDate).format("L"),
      },
    }
  );

  //   Component update
  useEffect(() => {
    if (data_employee) {
      setIsEmp(data_employee);
    }
    if (data_service) {
      setIsServ(data_service);
    }
    if (data_appointments) {
      setIsCheckAppointments(data_appointments.checkedAppointments);
    }

    if (walkAppointData) {
      setIsCheckWalkAppointments(walkAppointData.checkedWalkinAppointments);
    }
  }, [data_employee, data_service, data_appointments, walkAppointData]);

  if (isEmp && isServ && isCheckAppointments && isCheckWalkAppointments) {
    const workStart = isEmp.employee && isEmp.employee.schedule.workStart;
    const workLength = isEmp.employee && isEmp.employee.schedule.workLength;
    const breakStart = isEmp.employee && isEmp.employee.schedule.breakStart;
    const breakLength = isEmp.employee && isEmp.employee.schedule.breakLength;

    isEmp.employee && isEmp.employee.schedule.day.map((d) => days.push(d));

    // data_appointments.checkedAppointments.map((occcupied) =>
    //   appointmentTimes.push(occcupied.slot_start)
    // );

    isCheckAppointments.map((occupied) =>
      appointmentTimes.push(occupied.slot_start)
    );

    isCheckWalkAppointments.map((walkoccupied) =>
      appointmentTimes.push(walkoccupied.slot_start)
    );

    const startTime = moment(workStart, "h:m a").format("HH:mm");

    const breakStime = moment(breakStart, "h:m a").format("HH:mm");

    const intervalTime = isServ.service && isServ.service.duration;

    const workingTime = timeLineLabels(
      startTime,
      workLength,
      intervalTime,
      breakLength
    );
    const breakTime = timeLineLabels(breakStime, breakLength, 30);

    let initialTime = workingTime.filter((item) => {
      return !breakTime.includes(item);
    });

    let finalTime = initialTime.filter((oras) => {
      return !appointmentTimes.includes(oras);
    });
    finalTime.map((ft) => times.push(ft));
  }

  console.log(new Date(startDate).toLocaleDateString());

  return (
    <DGrid two gap="10px">
      <Content height="100%" width="100%" flex justify="center" align="center">
        <DatePicker
          selected={startDate}
          minDate={new Date().setDate(new Date().getDate() + 1)}
          onChange={handleDateChanged}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          calendarClassName={calendarSize}
          inline
        />
      </Content>

      {isEmp &&
      data_service &&
      (loading_employee ||
        loading_appointments ||
        loadWalkAppointData ||
        loading_service) ? (
        <Content
          flex
          justify="center"
          align="center"
          width="100%"
          height="100%"
        >
          <Spinner content="Fetching available time slot..." medium />
        </Content>
      ) : (
        <Content
          flex
          width="100%"
          height="100%"
          justify="space-around"
          align="center"
          direct="column"
        >
          <DLabel size="16px" color="bluer" weight={700} rounded>
            Time Slot
          </DLabel>
          <Content
            width="100%"
            height="100%"
            maxh={"300px"}
            flex
            align="flex-start"
            justify="flex-start"
            flow="column wrap"
            hoverflow
          >
            {times.map((time) => (
              <Content width="auto" height="30px" margin={"5px"} key={time}>
                <div className="pretty p-default p-curve">
                  <input
                    type="radio"
                    name="time"
                    value={time}
                    onChange={handleTimeChanged}
                  />
                  <div className="state p-info-o">
                    <label style={styles.label}>{time}</label>
                  </div>
                </div>
              </Content>
            ))}
          </Content>
        </Content>
      )}
    </DGrid>
  );
};

const styles = {
  label: {
    fontWeight: 700,
  },
};

export default AppointDate;
