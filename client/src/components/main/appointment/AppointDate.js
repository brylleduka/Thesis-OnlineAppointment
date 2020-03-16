import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_EMPLOYEE_QUERY } from "../../../util/graphql/employee";
import { FETCH_SINGLE_SERVICE_QUERY } from "../../../util/graphql/service";
import { FETCH_CHECKED_APPOINTMENTS } from "../../../util/graphql/appointment";
import DatePicker from "react-datepicker";
import { Content, DGrid } from "../../styled/containers";
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
  serviceValue
}) => {
  let days = [];
  let times = [];
  let appointmentTimes = [];

  const handleTimeChanged = event => {
    setSelectedTime(event.target.value);
  };

  const handleDateChanged = date => {
    setStartDate(date);
  };

  const { data: data_employee, loading: loading_employee } = useQuery(
    FETCH_EMPLOYEE_QUERY,
    {
      variables: {
        employeeId: employeeVal
      }
    }
  );

  const { data: data_service, loading: loading_service } = useQuery(
    FETCH_SINGLE_SERVICE_QUERY,
    {
      variables: {
        serviceId: serviceValue
      }
    }
  );

  const { data: data_appointments, loading: loading_appointments } = useQuery(
    FETCH_CHECKED_APPOINTMENTS,
    {
      variables: {
        employeeId: employeeVal,
        date: new Date(startDate).toLocaleDateString()
      }
    }
  );

  if (data_employee && data_service && data_appointments) {
    const workStart = data_employee.employee.schedule.workStart;
    const breakStart = data_employee.employee.schedule.breakStart;
    data_employee.employee.schedule.day.map(d => days.push(d));
    data_appointments.checkedAppointments.map(occcupied =>
      appointmentTimes.push(occcupied.slot_start)
    );

    const startTime = moment(workStart, "h:m a").format("HH:mm");

    const breakStime = moment(breakStart, "h:m a").format("HH:mm");

    const intervalTime = data_service.service.duration;

    const workingTime = timelineLabels(startTime, 9 * 60, intervalTime);
    const breakTime = timelineLabels(breakStime, 1 * 60, 60);

    let initialTime = workingTime.filter(item => {
      return !breakTime.includes(item);
    });

    let finalTime = initialTime.filter(oras => {
      return !appointmentTimes.includes(oras);
    });
    finalTime.map(ft => times.push(ft));
  }

  return (
    <DGrid two gap="10px">
      <Content
        height="100%"
        width="100%"
        flex
        justify="center"
        align="center"
        pad="0"
        margin="0 auto"
      >
        <DatePicker
          selected={startDate}
          minDate={new Date().setDate(new Date().getDate() + 1)}
          onChange={handleDateChanged}
          inline
        />
      </Content>
      <Content width="100%" height="100%" flex justify="center" align="center">
        {data_employee && data_service ? (
          loading_employee || loading_appointments ? (
            <h3>Loading...</h3>
          ) : (
            <DGrid two gap="20px">
              {!times ? (
                <h2>Loading...</h2>
              ) : (
                times.map(time => (
                  <div className="pretty p-default p-curve">
                    <input
                      type="radio"
                      name="time"
                      key={time}
                      value={time}
                      onChange={handleTimeChanged}
                    />
                    <div className="state p-info-o">
                      <label style={styles.label}>{time}</label>
                    </div>
                  </div>
                ))
              )}
            </DGrid>
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
    fontWeight: 700
  }
};

export default AppointDate;
