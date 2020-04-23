import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_USERS_ACCOUNT } from "../../util/graphql/user";
import Layout from "../../components/admin/layout/Layout";
import { Link } from "react-router-dom";
import { Eye } from "styled-icons/fa-regular";
import { DButton, DLabel } from "../../components/styled/utils";
import { Content, DSection } from "../../components/styled/containers";
import DataTable from "react-data-table-component";
import Spinner from "../../components/Spinner";
import { Grid } from "@styled-icons/boxicons-solid/Grid";
import NewEmployee from "../../components/admin/employees/NewEmployee";
import { AuthContext } from "../../context/auth";
import { DotsVertical } from "../../components/styled/utils";

const User = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const { employeeAuth } = useContext(AuthContext);

  const { data: data_users, loading: loading_users, error } = useQuery(
    FETCH_USERS_ACCOUNT
  );

  useEffect(() => {
    if (data_users) {
      setUsers(data_users.getUsers);
    }
  }, [data_users]);

  if (error) {
    return <p>Oops!</p>;
  }

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
      name: "Profile",
      selector: "photo",
      grow: 0,
      cell: (row) => (
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
      ),
    },
    {
      name: "Last Name",
      selector: "lastName",
      wrap: true,
      sortable: true,
      cell: (row) => <div>{row.lastName}</div>,
    },
    {
      name: "First Name",
      selector: "firstName",
      wrap: true,
      sortable: true,
      cell: (row) => <div>{row.firstName}</div>,
    },
    {
      name: "Email",
      selector: "email",
      wrap: true,
      sortable: true,
      cell: (row) => <div>{row.email}</div>,
    },
    {
      name: "Actions",
      cell: (row) => (
        <DButton as={Link} to={`/zeadmin/userInfo/${row._id}`}>
          <Eye size="18px" style={{ color: "white" }} />
        </DButton>
      ),
      button: true,
      allowOverflow: true,
      width: "80px",
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
      Client List
    </DLabel>
  );
  const paginationRowsPerPageOptions = [5, 10, 15, 20];

  return (
    <Layout>
      <DSection
        height="100%"
        flex
        justify="center"
        align="center"
        direct="column"
        width="90%"
        mcenter
        style={{ minHeight: "50vh" }}
      >
        {loading_users ? (
          <Spinner content="Please wait while we fetch our data..." />
        ) : (
          <Content width="100%" margin="20px 0">
            <DataTable
              title={title}
              columns={columns}
              data={data_users.getUsers.map((getUser) => getUser)}
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
    </Layout>
  );
};

export default User;
