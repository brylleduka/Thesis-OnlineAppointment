import moment from "moment";

const timeLineLabels = (
  desiredStartTime,
  timeLength,
  interval,
  breakTimeLength = 0
) => {
  const periodsInADay = moment
    .duration(timeLength + breakTimeLength, "MINUTES")
    .as("MINUTES");

  let timeSlot = [];

  const startTimeMoment = moment(desiredStartTime, "hh:mm A");
  for (let i = 0; i <= periodsInADay; i += interval) {
    startTimeMoment.add(i === 0 ? 0 : interval, "MINUTES");
    timeSlot.push(startTimeMoment.format("hh:mm A"));
  }
  return timeSlot;
};

export default timeLineLabels;
