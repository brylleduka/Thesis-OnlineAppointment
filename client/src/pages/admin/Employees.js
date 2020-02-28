import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_EMPLOYEES_NOT_ADMIN_QUERY } from "../../util/graphql";
import Layout from "../../components/admin/layout/Layout";
import { Link } from "react-router-dom";
import { Eye } from "styled-icons/fa-regular/Eye";
import { DButton, DLabel } from "../../components/styled/utils";
import { Content, DSection } from "../../components/styled/containers";
import DataTable from "react-data-table-component";
import Skeleton from "../../components/Skeleton";
import NewEmployee from "../../components/admin/employees/NewEmployee";
import { AuthContext } from "../../context/auth";

const Employees = () => {
  const [open, setOpen] = useState(false);
  const [employeesAR, setEmployeesAR] = useState([]);
  const { employeeAuth } = useContext(AuthContext);

  const {
    data: data_employeesAR,
    loading: loading_employeesAR,
    error
  } = useQuery(FETCH_EMPLOYEES_NOT_ADMIN_QUERY);

  useEffect(() => {
    if (data_employeesAR) {
      setEmployeesAR(data_employeesAR.aestheticiansReceps);
    }
  }, [data_employeesAR]);

  if (error) {
    return <p>Oops!</p>;
  }

  const columns = [
    {
      name: "Employee ID",
      selector: "empId",
      sortable: true
    },
    {
      name: "Thumbnail",
      selector: "photo",
      grow: 0,
      cell: row => (
        <img
          height="80px"
          width="52px"
          alt={row.empId}
          src={
            row.photo !== null
              ? `/images/${row.photo}`
              : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }
        />
      )
    },
    {
      name: "Name",
      selector: "name",
      wrap: true,
      sortable: true,
      cell: row => (
        <span>
          {row.title}. {row.firstName} {row.lastName}
        </span>
      )
    },
    {
      name: "Role",
      selector: "role",
      wrap: true
    },
    {
      name: "Actions",
      cell: row => (
        <DButton as={Link} to={`/zeadmin/employee/${row._id}`}>
          <Eye size="18px" style={{ color: "white" }} />
        </DButton>
      )
    }
  ];

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
      size="22px"
      bgcolor="#6dd5ed"
      tt="uppercase"
      weight="700"
      pad="10px 25px"
      color="#fff"
      customStyles={customStyles}
      rounded
    >
      Employee List
    </DLabel>
  );
  const paginationRowsPerPageOptions = [5, 10, 15, 20];

  return (
    <Layout>
      <DSection height="100%" width="90%">
        <Content width="100%" flex justify="flex-end" align="center">
          {employeeAuth.role !== "ADMIN" || employeeAuth.level < 3 ? (
            ""
          ) : (
            <DButton onClick={() => setOpen(true)}>New Employee</DButton>
          )}
        </Content>
        {loading_employeesAR ? (
          <Skeleton />
        ) : (
          <Content width="100%" margin="20px 0">
            <DataTable
              title={title}
              columns={columns}
              data={data_employeesAR.aestheticiansReceps.map(aesrep => aesrep)}
              responsive
              customStyles={customStyles}
              pagination={true}
              paginationPerPage={5}
              paginationRowsPerPageOptions={paginationRowsPerPageOptions}
              highlightOnHover
              pointerOnHover
            />
          </Content>
        )}
      </DSection>
      <NewEmployee open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Employees;
