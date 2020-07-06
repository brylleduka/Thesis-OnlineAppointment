import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_MY_CURRENT_APPOINTMENTS } from "../../../util/graphql/appointment";
import { Content } from "../../styled/containers";
import { DButton } from "../../styled/utils";
import DataTable from "react-data-table-component";
import { Popup, Icon } from "semantic-ui-react";
import Spinner from "../../Spinner";
import moment from "moment";
import CurrentAppointModal from "./CurrentAppointModal";

const CurrentAppointment = () => {
  const [open, setOpen] = useState(false);
  const [isPop, setIsPop] = useState(false);
  const [currentAppoint, setCurrentAppoint] = useState([]);

  const handlePop = () => {
    setIsPop(!isPop);
  };

  const { data: currentAppointData, loading: currentAppointLoading } = useQuery(
    FETCH_MY_CURRENT_APPOINTMENTS
  );

  useEffect(() => {
    if (currentAppointData) {
      setCurrentAppoint(currentAppointData.myCurrentAppointment);
    }
  }, [currentAppointData]);

  const columns = [
    {
      name: "ID",
      selector: "_id",
      flex: 0,
      sortable: true,
    },
    {
      name: "Aesthetician",
      selector: "employee",
      wrap: true,
      sortable: true,
      cell: (row) =>
        row.employee === null
          ? "N/A"
          : row.employee.firstName + " " + row.employee.lastName,
    },
    {
      name: "Service",
      selector: "service.name",
      wrap: true,
      sortable: true,
      cell: (row) => (row.service === null ? "N/A" : row.service.name),
    },
    {
      name: "Date",
      selector: "date",
      wrap: true,
      sortable: true,
      format: (row) => `${moment(row.date).format("LL")}`,
    },
    {
      name: "Status",
      selector: "status",

      sortable: true,
      cell: (row) => (
        <span
          style={
            row.status === "PENDING"
              ? { fontSize: 12, fontWeight: 500, color: "gold" }
              : row.status === "VERIFIED"
              ? { fontSize: 12, fontWeight: 500, color: "green" }
              : { fontSize: 12, fontWeight: 500, color: "blue" }
          }
        >
          {/* {row.status === "INPROGRESS" ? "IN PROGRESS" : row.status} */}
          {row.status}
        </span>
      ),
    },
    {
      name: "Actions",
      right: true,
      cell: (row) => (
        <>
          <Popup
            trigger={
              <DButton onClick={() => setOpen(true)}>
                <Icon name="eye" fitted />
              </DButton>
            }
            mouseEnterDelay={500}
            mouseLeaveDelay={500}
            content="View detailed appointment info."
            position="left center"
            size="tiny"
          />
          <CurrentAppointModal
            appointId={row._id}
            open={open}
            setOpen={setOpen}
          />
        </>
      ),
    },
  ];

  return (
    <Content
      height="100%"
      flex
      justify="center"
      align="center"
      direct="column"
      width="100%"
      rounded
    >
      <DataTable
        columns={columns}
        data={currentAppoint}
        responsive
        pagination={true}
        paginationPerPage={5}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        customStyles={customStyles}
        progressPending={currentAppointLoading}
        progressComponent={
          <Spinner content="Please wait while we fetch our data..." />
        }
        highlightOnHover
        pointerOnHover
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
      fontSize: "12px",
      fontWeight: "700",
    },
  },
  rows: {
    style: {
      fontSize: "12px",
      fontWeight: "700",
      color: "#000",
    },
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "25px",
      outline: "1px solid #FFFFFF",
    },
    pagination: {
      style: {
        marginTop: "10px",
        border: "none",
      },
    },
  },
};

const paginationRowsPerPageOptions = [5, 10, 15, 20];

export default CurrentAppointment;
