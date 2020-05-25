import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_EMPLOYEES_NOT_ADMIN_QUERY } from "../../../../util/graphql/employee";

import { DButton } from "../../../styled/utils";
import { DGrid, Content } from "../../../styled/containers";
import DataTable from "react-data-table-component";
import Spinner from "../../../Spinner";
import MenuDots from "../../../MenuDots";
import { Eye } from "styled-icons/fa-regular";
import { DeleteForever } from "@styled-icons/material";
import { Restore } from "@styled-icons/material/Restore";
import { Grid } from "@styled-icons/boxicons-solid/Grid";
import useWindowSize from "../../../../util/hooks/useWindowSize";
import ArchEmpView from "./ArchEmpView";
import Page404 from "../../../../pages/Page404";

const ArchEmp = () => {
  const { width: wid } = useWindowSize();
  const [archEmp, setArchEmp] = useState([]);
  const [empView, setEmpView] = useState(false);
  const [empValue, setEmpValue] = useState("");

  const {
    data: archEmpData,
    loading: archEmpLoad,
    error: archEmpErr,
  } = useQuery(FETCH_EMPLOYEES_NOT_ADMIN_QUERY, {
    variables: { limit: 0, active: false },
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
      right: wid <= 1024 ? true : false,
      grow: wid <= 1024 ? 0 : 1,
      cell: (row) =>
        wid <= 1024 ? (
          <MenuDots data-eid={row._id} onMouseOver={handleMenu}>
            <Content
              flex
              margin="0 auto"
              align="center"
              justify="center"
              width="100%"
              height="100%"
              pad="3px 0"
              data-eid={row._id}
              onMouseOver={handleMenu}
            >
              <DButton flex onClick={() => setEmpView(true)}>
                <Eye size={"18px"} title="View Details" />
              </DButton>

              <DButton
                flex
                bgconfirm
                onClick={() => alert("Restore: " + row._id)}
              >
                <Restore size={"18px"} title="Restore File" />
              </DButton>
              <DButton flex bgalert>
                <DeleteForever size={"18px"} title="Delete Permanently" />
              </DButton>
            </Content>
          </MenuDots>
        ) : (
          <Content
            flex
            margin="0 auto"
            align="center"
            justify="center"
            width="100%"
            height="100%"
            pad="3px 0"
            direct={wid <= 1024 ? "column" : "row"}
            data-eid={row._id}
            onMouseOver={handleMenu}
          >
            <DButton
              flex
              onClick={() => setEmpView(true)}
              pad={wid <= 1024 && "2px 10px"}
            >
              <Eye size={"18px"} title="View Details" />
            </DButton>

            <DButton
              flex
              bgconfirm
              onClick={() => alert("Restore: " + row._id)}
              pad={wid <= 1024 && "2px 10px"}
            >
              <Restore size={"18px"} title="Restore File" />
            </DButton>
            <DButton flex bgalert pad={wid <= 1024 && "2px 10px"}>
              <DeleteForever size={"18px"} title="Delete Permanently" />
            </DButton>
          </Content>
        ),

      // <Content
      //   flex
      //   margin="0 auto"
      //   align="center"
      //   justify="center"
      //   width="100%"
      //   height="100%"
      //   pad="3px 0"
      //   direct={wid <= 1024 ? "column" : "row"}
      //   data-eid={row._id}
      //   onMouseOver={handleMenu}
      // >
      //   <DButton
      //     flex
      //     onClick={() => setEmpView(true)}
      //     pad={wid <= 1024 && "2px 10px"}
      //     fluid={wid <= 1024 ? true : null}
      //   >
      //     <Eye size={"18px"} title="View Details" />
      //   </DButton>

      //   <DButton
      //     flex
      //     bgconfirm
      //     onClick={() => alert("Restore: " + row._id)}
      //     pad={wid <= 1024 && "2px 10px"}
      //     fluid={wid <= 1024 ? true : null}
      //   >
      //     <Restore size={"18px"} title="Restore File" />
      //   </DButton>
      //   <DButton
      //     flex
      //     bgalert
      //     pad={wid <= 1024 && "2px 10px"}
      //     fluid={wid <= 1024 ? true : null}
      //   >
      //     <DeleteForever
      //       size={ "18px"}
      //       title="Delete Permanently"
      //     />
      //   </DButton>
      // </Content>
    },
  ];

  return (
    <>
      {archEmpErr ? <Page404 /> : null}
      <DataTable
        columns={columns}
        data={archEmp.map((emp) => emp)}
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
