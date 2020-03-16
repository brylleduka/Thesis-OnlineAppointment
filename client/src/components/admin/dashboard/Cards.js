import React from "react";
import { useHistory } from "react-router-dom";
import { DSection, DGrid } from "../../styled/containers";
import ClientCard from "./ClientCard";
import AppointmentCard from "./AppointmentCard";
import InquiryCard from "./InquiryCard";

const Cards = () => {
  const history = useHistory();
  return (
    <DSection
      height="100%"
      width="100%"
      flex
      justify="space-around"
      align="center"
      margin="20px 0"
    >
      <DGrid three gap="25px">
        <ClientCard history={history} />
        <AppointmentCard history={history} />
        <InquiryCard history={history} />
      </DGrid>
    </DSection>
  );
};

const options = {
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false
        },
        display: false
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: false
        },
        display: false
      }
    ]
  },
  legend: {
    display: false
  }
};

export default Cards;
