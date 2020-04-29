import React from "react";
import DataTable from "react-data-table-component";
import { Content, DImage } from "../../styled/containers";
import { DButton, DLabel } from "../../styled/utils";
import { Grid } from "@styled-icons/boxicons-solid/Grid";
import moment from "moment";
import PrintProvider, { Print, NoPrint } from "react-easy-print";

const FilePrint = ({ filteredItems }) => {
  return (
    <Print printOnly name="foo">
      <Content
        flex
        justify="flex-start"
        align="flex-start"
        direct="column"
        width="100%"
        align="100%"
      >
        <DImage objFit="contain" circle height="100px" width="100px">
          <img src="/images/logo.png" />
        </DImage>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          quo maiores nam distinctio reiciendis iusto quod aspernatur error
          corporis, sit debitis fugit consequatur adipisci similique quaerat
          nesciunt temporibus enim earum.
        </p>
        <DataTable
          columns={columnsPrint}
          data={filteredItems}
          customStyles={customStyles}
          dense
        />
      </Content>
    </Print>
  );
};

const columnsPrint = [
  {
    cell: () => <Grid size="16px" color="green" />,
    width: "36px",
  },
  {
    name: "Client",
    selector: "user",
    sortable: true,
    wrap: true,
    flow: 1,
    format: (row) => `${row.user.firstName} ${row.user.lastName}`,
  },
  {
    name: "Aesthetician",
    selector: "employee",
    wrap: true,
    flow: 1,
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
    width: "120px",
    format: (row) => `${moment(parseInt(row.date)).format("LL")}`,
  },
  {
    name: "Status",
    selector: "status",
    wrap: true,
    sortable: true,
    right: true,
    conditionalCellStyles: [
      {
        when: (row) => row.status === "CANCELLED",
        style: {
          backgroundColor: "rgba(241, 39, 17, 0.7)",
          fontWeight: "700",
          fontSize: "9px",
        },
      },
      {
        when: (row) => row.status === "DONE",
        style: {
          backgroundColor: "rgba(33, 147, 176, 0.7)",
          fontWeight: "700",
          fontSize: "9px",
        },
      },
      {
        when: (row) => row.status === "RESCHEDULED",
        style: {
          backgroundColor: "#6dd5ed",
          fontWeight: "700",
          fontSize: "9px",
        },
      },
    ],
  },
];

const customStyles = {
  rows: {
    style: {
      fontSize: "11px",
      fontWeight: "700",
      color: "#000",
      marginBottom: "5px",
    },
  },
};

// const conditionalRowStyles = [
//   {
//     when: (row) => row.status === "CANCELLED",
//     style: {
//       backgroundColor: "rgba(241, 39, 17, 0.7)",
//       fontWeight: 700,
//       color: "#FFFFFF",
//       "&:hover": {
//         cursor: "pointer",
//       },
//     },
//   },
//   {
//     when: (row) => row.status === "DONE",
//     style: {
//       backgroundColor: "rgba(33, 147, 176, 0.8)",
//       fontWeight: 700,
//       color: "#FFFFFF",
//       "&:hover": {
//         cursor: "pointer",
//       },
//     },
//   },
// ];

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

export default FilePrint;
