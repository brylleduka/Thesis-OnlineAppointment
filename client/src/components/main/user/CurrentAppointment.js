import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { FETCH_MY_CURRENT_APPOINTMENTS } from "../../../util/graphql";
import { Content } from "../../styled/containers";
import { DLabel, DButton } from "../../styled/utils";
import DataTable from "react-data-table-component";
import { Eye } from "styled-icons/fa-regular/Eye";
import moment from "moment";

const CurrentAppointment = () => {
  const [currentAppoint, setCurrentAppoint] = useState([]);

  const { data: currentAppointData, loading: currentAppointLoading } = useQuery(
    FETCH_MY_CURRENT_APPOINTMENTS
  );

  const columns = [
    {
      name: "Appointment ID",
      selector: "_id",
      sortable: true
    },
    {
      name: "Aesthetician",
      selector: "employee",
      wrap: true,
      sortable: true,
      format: row => `${row.employee.firstName} ${row.employee.lastName}`
    },
    {
      name: "Service",
      selector: "service.name",
      wrap: true,
      sortable: true
    },
    {
      name: "Date",
      selector: "date",
      wrap: true,
      sortable: true,
      format: row => `${moment(parseInt(row.date)).format("LL")}`
    },
    {
      name: "Status",
      selector: "status",
      wrap: true,
      sortable: true,
      cell: row => (
        <span
          style={
            row.status === "PENDING"
              ? { fontSize: 14, fontWeight: 500, color: "gold" }
              : row.status === "VERIFIED"
              ? { fontSize: 14, fontWeight: 500, color: "green" }
              : { fontSize: 14, fontWeight: 500, color: "blue" }
          }
        >
          {row.status}
        </span>
      )
    },
    {
      name: "Actions",

      cell: row => (
        <DButton as={Link} to={`/zessence/myappointment/${row._id}`}>
          <Eye size="18px" style={{ color: "white" }} />
        </DButton>
      )
    }
  ];

  return (
    <Content
      height="50vh"
      flex
      justify="center"
      align="center"
      direct="column"
      bgcolor="#eee"
      width="100%"
      pad="10px"
      rounded
    >
      <DLabel size="16px" tt="uppercase" weight="700" pad="10px 25px" rounded>
        My Appointment
      </DLabel>
      {currentAppointLoading ? (
        <h2>Loading...</h2>
      ) : (
        <DataTable
          columns={columns}
          data={currentAppointData.myCurrentAppointment.map(
            currentAppoint => currentAppoint
          )}
          responsive
          customStyles={customStyles}
          highlightOnHover
          pointerOnHover
        />
      )}
    </Content>
  );
};

const customStyles = {
  headRow: {
    style: {
      border: "none"
    }
  },
  headCells: {
    style: {
      color: "#202124",
      fontSize: "14px",
      fontWeight: "700"
    }
  },
  rows: {
    style: {
      fontSize: "12px",
      fontWeight: "700",
      color: "#000"
    },
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "25px",
      outline: "1px solid #FFFFFF"
    }
  }
};

// const title = (

// );

export default CurrentAppointment;
