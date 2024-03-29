import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_EMPLOYEES_NOT_ADMIN_QUERY } from "../../../../util/graphql/employee";

import { DButton } from "../../../styled/utils";
import { Content } from "../../../styled/containers";
import DataTable from "react-data-table-component";
import Spinner from "../../../Spinner";

import { Eye } from "styled-icons/fa-regular";

import { Grid } from "@styled-icons/boxicons-solid/Grid";
import useWindowSize from "../../../../util/hooks/useWindowSize";
import ArchEmpView from "./ArchEmpView";
import ArchEmpDelete from "./ArchEmpDelete";
import ArchEmpRestore from "./ArchEmpRestore";
import Page404 from "../../../../pages/Page404";

const ArchEmp = () => {
  const [archEmp, setArchEmp] = useState([]);
  const [empView, setEmpView] = useState(false);
  const [empValue, setEmpValue] = useState("");

  const {
    data: archEmpData,
    loading: archEmpLoad,
    error: archEmpErr,
  } = useQuery(FETCH_EMPLOYEES_NOT_ADMIN_QUERY, {
    variables: { limit: 0, active: false },
    pollInterval: 500,
  });

  useEffect(() => {
    if (archEmpData) setArchEmp(archEmpData.aestheticiansReceps);
  }, [archEmpData]);

  const handleMenu = (e) => {
    setEmpValue(e.currentTarget.dataset.eid);
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
      name: "Employee ID",
      selector: "empId",

      sortable: true,
    },
    {
      name: "Thumbnail",
      selector: "photo",
      grow: 0.5,
      hide: "md",
      cell: (row) => (
        <img
          height="80px"
          width="52px"
          alt={row.empId}
          src={
            row.photo !== null
              ? `/images/employees/${row.photo}`
              : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }
        />
      ),
    },
    {
      name: "Name",
      selector: "lastName",
      wrap: true,
      sortable: true,
      cell: (row) => (
        <span>
          {row.title}. {row.firstName} {row.lastName}
        </span>
      ),
    },
    {
      name: "Role",
      selector: "role",
      sortable: true,
      wrap: true,
    },
    {
      name: "Status",
      selector: "active",
      sortable: true,
      wrap: true,
      cell: (row) =>
        row.active ? (
          <span
            style={{
              fontWeight: "bold",
              fontSize: "14px",
              color: "#0f9b0f",
            }}
          >
            Active
          </span>
        ) : (
          <span
            style={{
              fontWeight: "bold",
              fontSize: "14px",
              color: "#f12711",
            }}
          >
            Inactive
          </span>
        ),
    },
    {
      name: "Actions",
      grow: 1,
      cell: (row) => (
        <Content
          flex
          margin="0 auto"
          align="center"
          justify="center"
          width="300px"
          height="100%"
          pad="3px 0"
          flow="row nowrap"
          data-eid={row._id}
          onMouseOver={handleMenu}
        >
          <DButton flex onClick={() => setEmpView(true)}>
            <Eye size={"18px"} title="View Details" />
          </DButton>

          <ArchEmpRestore empId={empValue} />
          <ArchEmpDelete empId={empValue} />
        </Content>
      ),
    },
  ];

  return (
    <>
      {archEmpErr ? <Page404 /> : null}
      <DataTable
        columns={columns}
        data={archEmp}
        responsive
        customStyles={customStyles}
        pagination={true}
        paginationPerPage={10}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        highlightOnHover
        pointerOnHover
        progressPending={archEmpLoad}
        progressComponent={
          <Spinner content="Please wait while we fetch our data..." />
        }
      />

      <ArchEmpView empId={empValue} empView={empView} setEmpView={setEmpView} />
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
      fontSize: "14px",
    },
  },
  rows: {
    style: {
      fontSize: "12px",
      fontWeight: "700 !important",
      color: "#232323",
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

export default ArchEmp;
