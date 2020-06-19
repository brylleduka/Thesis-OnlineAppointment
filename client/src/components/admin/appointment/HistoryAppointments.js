import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Content } from "../../styled/containers";
import { DButton, DLabel } from "../../styled/utils";
import { Icon } from "semantic-ui-react";
import { Grid } from "@styled-icons/boxicons-solid/Grid";
import Spinner from "../../Spinner";
import moment from "moment";
import FilterInput from "../../FilterInput";
import FilePrint from "../report/FilePrint";
import { NoPrint } from "react-easy-print";

const HistoryAppointments = ({ historyAppointments, loading }) => {
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = historyAppointments.filter(
    (item) =>
      item &&
      (item.status.includes(filterText.toUpperCase()) ||
        (item.service && item.service.name.includes(filterText)) ||
        (item.employee && item.employee.lastName.includes(filterText)) ||
        (item.user && item.user.lastName.includes(filterText)) ||
        moment(parseInt(item.date)).format("LL").includes(filterText) ||
        (
          item.status.toUpperCase() +
          "/" +
          moment(parseInt(item.date)).format("LL").toUpperCase() +
          "/" +
          item.status.toUpperCase()
        ).includes(filterText.toUpperCase()))
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <>
        <FilterInput
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
          isPrint={true}
        />
        <DButton onClick={() => setIsPrintOpen(true)}>
          <Icon name="print" fitted />
        </DButton>
      </>
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <Content width="100%" height="100%">
      <FilePrint
        filteredItems={filteredItems}
        isPrintOpen={isPrintOpen}
        setIsPrintOpen={setIsPrintOpen}
      />

      <NoPrint force>
        <Content
          height="100%"
          width="100%"
          flex
          justify="center"
          align="center"
          direct="column"
        >
          <DataTable
            title={title}
            columns={columns}
            data={filteredItems}
            responsive
            customStyles={customStyles}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={paginationRowsPerPageOptions}
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            highlightOnHover
            pointerOnHover
            progressPending={loading}
            progressComponent={
              <Spinner content="Please wait while we fetch our data..." />
            }
          />
        </Content>
      </NoPrint>
    </Content>
  );
};

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
    name: "ID",
    selector: "_id",
    wrap: true,
    omit: true,
  },
  {
    name: "Client",
    selector: "user",
    wrap: true,
    sortable: true,
    format: (row) =>
      `${row.user && row.user.firstName} ${row.user && row.user.lastName}`,
    omit: true,
  },
  {
    name: "Aesthetician",
    selector: "employee",
    wrap: true,
    sortable: true,
    cell: (row) =>
      row.employee !== null ? (
        <span>
          {row.employee.title} {row.employee.firstName} {row.employee.lastName}
        </span>
      ) : (
        "NF"
      ),
  },
  {
    name: "Service",
    selector: "service",
    wrap: true,
    sortable: true,
    cell: (row) => (row.service ? row.service.name : "NF"),
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
    wrap: true,
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

    cell: (row) => (
      <DButton as={Link} to={`/zeadmin/appointment/${row._id}`}>
        <Icon name="eye" fitted />
      </DButton>
    ),
    right: true,
  },
];

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
      marginBottom: "5px",
    },
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "25px",
      outline: "1px solid #FFFFFF",
    },
  },
};

const title = (
  <DLabel
    size="18px"
    tt="uppercase"
    weight="700"
    pad="10px 20px"
    color="bluer"
    rounded
  >
    Appointment History
  </DLabel>
);
const paginationRowsPerPageOptions = [5, 10, 15, 20];

export default HistoryAppointments;
