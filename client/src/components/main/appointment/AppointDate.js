import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_EMPLOYEE_QUERY } from "../../../util/graphql/employee";
import { FETCH_SINGLE_SERVICE_QUERY } from "../../../util/graphql/service";
import { FETCH_CHECKED_APPOINTMENTS } from "../../../util/graphql/appointment";
import DatePicker from "react-datepicker";
import { Content, DGrid } from "../../styled/containers";
import Spinner from "../../Spinner";
import moment from "moment";

const timelineLabels = (desiredStartTime, timeLength, interval) => {
  const periodsInADay = moment.duration(timeLength, "MINUTES").as("MINUTES");

  let timeSlot = [];

  const startTimeMoment = moment(desiredStartTime, "hh:mm A");
  for (let i = 0; i <= periodsInADay; i += interval) {
    startTimeMoment.add(i === 0 ? 0 : interval, "MINUTES");
    timeSlot.push(startTimeMoment.format("hh:mm A"));
  }
  return timeSlot;
};

const AppointDate = ({
  setStartDate,
  setSelectedTime,
  startDate,
  employeeVal,
  serviceValue,
}) => {
  let days = [];
  let times = [];
  let appointmentTimes = [];
  const [isEmp, setIsEmp] = useState({});
  const [isServ, setIsServ] = useState({});

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

  useEffect(() => {
    if (data_employee) {
      setIsEmp(data_employee);
    }
  }, [data_employee]);

  const { data: data_service, loading: loading_service } = useQuery(
    FETCH_SINGLE_SERVICE_QUERY,
    {
      variables: {
        serviceId: serviceValue,
      },
    }
  );

  useEffect(() => {
    if (data_service) {
      setIsServ(data_service);
    }
  }, [data_service]);

  const { data: data_appointments, loading: loading_appointments } = useQuery(
    FETCH_CHECKED_APPOINTMENTS,
    {
      variables: {
        employeeId: employeeVal,
        date: new Date(startDate).toLocaleDateString(),
      },
    }
  );

  if (isEmp && isServ && data_appointments) {
    const workStart = isEmp.employee && isEmp.employee.schedule.workStart;
    const breakStart = isEmp.employee && isEmp.employee.schedule.breakStart;

    isEmp.employee && isEmp.employee.schedule.day.map((d) => days.push(d));
    data_appointments.checkedAppointments.map((occcupied) =>
      appointmentTimes.push(occcupied.slot_start)
    );

    const startTime = moment(workStart, "h:m a").format("HH:mm");

    const breakStime = moment(breakStart, "h:m a").format("HH:mm");

    const intervalTime = isServ.service.duration;

    const workingTime = timelineLabels(startTime, 9 * 60, intervalTime);
    const breakTime = timelineLabels(breakStime, 1 * 60, 60);

    let initialTime = workingTime.filter((item) => {
      return !breakTime.includes(item);
    });

    let finalTime = initialTime.filter((oras) => {
      return !appointmentTimes.includes(oras);
    });
    finalTime.map((ft) => times.push(ft));
  }

  return (
    <DGrid two gap="10px">
      <Content height="100%" width="100%" flex justify="center" align="center">
        <DatePicker
          selected={startDate}
          minDate={new Date().setDate(new Date().getDate() + 1)}
          onChange={handleDateChanged}
          inline
        />
      </Content>
      <Content
        width="100%"
        margin="0 auto"
        height="100%"
        flex
        justify="center"
        align="center"
        flow="row wrap"
        pad="10px"
      >
        {isEmp && data_service ? (
          loading_employee || loading_appointments || loading_service ? (
            <Spinner content="Loading..." medium />
          ) : (
            times.map((time) => (
              <div className="pretty p-default p-curve" key={time}>
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
            ))
          )
        ) : (
          "Select Available Time"
        )}
      </Content>
    </DGrid>
  );
};

const styles = {
  label: {
    fontWeight: 700,
  },
};

export default AppointDate;
