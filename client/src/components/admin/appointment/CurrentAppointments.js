import React, { useEffect, useState, useContext } from "react";
import { FETCH_CURRENT_APPOINTMENTS } from "../../../util/graphql/appointment";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { DSection, DGrid, Content } from "../../styled/containers";
import { DButton, DLabel } from "../../styled/utils";
import Skeleton from "../../Skeleton";
import { Eye } from "styled-icons/fa-regular/Eye";
import moment from "moment";

const CurrentAppointments = () => {
  const [currentAppointments, setCurrentAppointments] = useState([]);

  const { loading, data: currentAppointmentData } = useQuery(
    FETCH_CURRENT_APPOINTMENTS
  );

  useEffect(() => {
    if (currentAppointmentData) {
      setCurrentAppointments(currentAppointmentData.currentAppointments);
    }
  }, [currentAppointmentData]);

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
      selector: "service",
      wrap: true,
      sortable: true,
      format: row => `${row.service.name}`
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
        <DButton as={Link} to={`/zeadmin/appointment/${row._id}`}>
          <Eye size="18px" style={{ color: "white" }} />
        </DButton>
      )
    }
  ];

  return (
    <Content
      height="100%"
      width="100%"
      flex
      justify="center"
      align="center"
      margin="5vh 0"
    >
      {!currentAppointmentData ? (
        <h4>Loading..</h4>
      ) : (
        <DataTable
          title={title}
          columns={columns}
          data={currentAppointmentData.currentAppointments.map(
            currAppoint => currAppoint
          )}
          responsive
          customStyles={customStyles}
          pagination={true}
          paginationPerPage={5}
          paginationRowsPerPageOptions={paginationRowsPerPageOptions}
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
      fontSize: "14px"
    }
  },
  rows: {
    style: {
      fontSize: "14px",
      fontWeight: "700",
      color: "#000"
    },
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "25px",
      outline: "1px solid #FFFFFF"
    }
  },
  pagination: {
    style: {
      marginTop: "10px",
      border: "none"
    }
  }
};

const title = (
  <DLabel
    size="18px"
    bgcolor="#6dd5ed"
    tt="uppercase"
    weight="700"
    pad="10px 25px"
    color="#fff"
    style={{ marginTop: "10vh" }}
    rounded
  >
    Apointment List
  </DLabel>
);
const paginationRowsPerPageOptions = [5, 10, 15, 20];

export default CurrentAppointments;