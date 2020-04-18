import React, { useEffect, useState, useContext } from "react";
import { FETCH_CURRENT_APPOINTMENTS } from "../../../util/graphql/appointment";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Content } from "../../styled/containers";
import { DButton, DLabel } from "../../styled/utils";
import { Eye } from "@styled-icons/fa-regular/Eye";
import { Grid } from "@styled-icons/boxicons-solid/Grid";
import Spinner from "../../Spinner";
import moment from "moment";

const CurrentAppointments = () => {
  const [isCurrentAppoint, setIsCurrentAppoint] = useState([]);

  const { loading, data: currentAppointmentData } = useQuery(
    FETCH_CURRENT_APPOINTMENTS
  );

  useEffect(() => {
    if (currentAppointmentData) {
      setIsCurrentAppoint(currentAppointmentData.currentAppointments);
    }
  }, [currentAppointmentData]);

  const columns = [
    {
      cell: () => <Grid size="22px" color="green" />,
      width: "56px",
      style: {
        borderBottom: "1px solid #fff",
        marginBottom: "-1px",
      },
    },
    {
      name: "Aesthetician",
      selector: "employee.lastName",
      wrap: true,
      sortable: true,
      format: (row) => `${row.employee.firstName} ${row.employee.lastName}`,
    },
    {
      name: "Service",
      selector: "service",
      wrap: true,
      sortable: true,
      format: (row) => `${row.service.name}`,
    },
    {
      name: "Date",
      selector: "date",
      wrap: true,
      sortable: true,
      format: (row) => `${moment(parseInt(row.date)).format("LL")}`,
    },
    {
      name: "Status",
      selector: "status",
      wrap: true,
      sortable: true,
      cell: (row) => (
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
      ),
    },
    {
      name: "Actions",

      cell: (row) => (
        <DButton as={Link} to={`/zeadmin/appointment/${row._id}`} flex>
          <Eye size="22px" />
        </DButton>
      ),
    },
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
      <DataTable
        columns={columns}
        data={isCurrentAppoint.map((currAppoint) => currAppoint)}
        responsive
        customStyles={customStyles}
        pagination={true}
        paginationPerPage={5}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        highlightOnHover
        pointerOnHover
        progressPending={loading}
        progressComponent={
          <Spinner content="Please wait while we fetch our data..." />
        }
      />
    </Content>
  );
};

const customStyles = {
  headRow: {
    style: {
      border: "none",
    },
  },
  headCells: {
    style: {
      color: "#202124",
      fontSize: "14px",
    },
  },
  rows: {
    style: {
      fontSize: "14px",
      fontWeight: "700",
      color: "#000",
    },
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "25px",
      outline: "1px solid #FFFFFF",
    },
  },
  pagination: {
    style: {
      marginTop: "10px",
      border: "none",
    },
  },
};

const paginationRowsPerPageOptions = [5, 10, 15, 20];

export default CurrentAppointments;
