import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import DataTable from "react-data-table-component";
import { Eye } from "styled-icons/fa-regular/Eye";
import { DButton } from "../../styled/utils";

const UpcommingAppointments = ({ appointments }) => {
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
              : row.status === "CANCELLED"
              ? { fontSize: 14, fontWeight: 500, color: "firebrick" }
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

  const title = <h2>Upcomming Appointments</h2>;

  return (
    <DataTable
      title={title}
      columns={columns}
      data={appointments.map(appointment => appointment)}
      responsive={true}
      pagination
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5]}
    />
  );
};

export default UpcommingAppointments;
