import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

import { FETCH_MY_APPOINTMENT_HISTORY } from "../../../util/graphql/appointment";
import { Content } from "../../styled/containers";
import { DButton } from "../../styled/utils";
import Spinner from "../../Spinner";
import DataTable from "react-data-table-component";
import { Popup, Icon } from "semantic-ui-react";
import CurrentAppointModal from "./CurrentAppointModal";

import moment from "moment";

const MyAppointmentHistory = () => {
  const [open, setOpen] = useState(false);
  const [isPop, setIsPop] = useState(false);
  const [appoint, setAppoint] = useState(null);
  const [appointHistory, setAppointHistory] = useState([]);

  const { data: appointHistoryData, loading: appointHistoryLoading } = useQuery(
    FETCH_MY_APPOINTMENT_HISTORY
  );

  useEffect(() => {
    if (appointHistoryData) {
      setAppointHistory(appointHistoryData.myAppointmentHistory);
    }
  }, [appointHistoryData]);

  const handleRow = (e) => {
    setAppoint(e.currentTarget.value);
    setOpen(true);
  };

  const handlePop = () => {
    setIsPop(!isPop);
  };

  const columns = [
    {
      name: "ID",
      selector: "_id",
      sortable: true,
    },
    {
      name: "Aesthetician",
      selector: "employee",

      sortable: true,
      cell: (row) =>
        row.employee === null
          ? "N/A"
          : row.employee.firstName + " " + row.employee.lastName,
    },
    {
      name: "Service",
      selector: "service.name",
      sortable: true,
      cell: (row) => (row.service === null ? "N/A" : row.service.name),
    },
    {
      name: "Date",
      selector: "date",

      sortable: true,
      format: (row) => `${moment(parseInt(row.date)).format("LL")}`,
    },
    {
      name: "Status",
      selector: "status",

      sortable: true,
      cell: (row) => (
        <span
          style={
            row.status === "CANCELLED"
              ? { fontSize: 14, fontWeight: 500, color: "firebrick" }
              : row.status === "DONE"
              ? { fontSize: 14, fontWeight: 500, color: "blue" }
              : { fontSize: 14, fontWeight: 500, color: "blue" }
          }
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Actions",
      right: true,
      cell: (row) => (
        <Popup
          trigger={
            <DButton
              height="32px"
              pad="2px 8px"
              value={row._id}
              onClick={handleRow}
            >
              <Icon name="eye" />
            </DButton>
          }
          mouseEnterDelay={500}
          mouseLeaveDelay={500}
          content="View detailed appointment info."
          position="left center"
          size="tiny"
        />
      ),
    },
  ];

  return (
    <>
      <Content
        height="100%"
        flex
        justify="center"
        align="center"
        direct="column"
        width="100%"
      >
        <DataTable
          compact
          columns={columns}
          data={appointHistory.map((historyAppoint) => historyAppoint)}
          responsive
          customStyles={customStyles}
          pagination={true}
          paginationPerPage={5}
          paginationRowsPerPageOptions={paginationRowsPerPageOptions}
          progressPending={appointHistoryLoading}
          progressComponent={
            <Spinner content="Please wait while we fetch our data..." />
          }
          highlightOnHover
          pointerOnHover
        />
      </Content>
      {appoint && (
        <CurrentAppointModal
          appointId={appoint}
          setAppoint={setAppoint}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
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
  },
  pagination: {
    style: {
      border: "none",
    },
  },
};

const paginationRowsPerPageOptions = [5, 10, 15, 20];

export default MyAppointmentHistory;
