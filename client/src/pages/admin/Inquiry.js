import React, { useEffect, useState } from "react";
import Layout from "../../components/admin/layout/Layout";
import DataTable from "react-data-table-component";
import { FETCH_INQUIRIES } from "../../util/graphql/inquiry";
import { useQuery } from "@apollo/react-hooks";
import { Eye } from "styled-icons/fa-regular/Eye";
import { DButton, DLabel } from "../../components/styled/utils";
import { Link } from "react-router-dom";

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);

  const { data: data_inquiries, loading: loading_inquiries, error } = useQuery(
    FETCH_INQUIRIES
  );

  useEffect(() => {
    if (data_inquiries) {
      setInquiries(data_inquiries.inquiries);
    }
  }, [data_inquiries]);

  console.log(data_inquiries);

  const columns = [
    {
      name: "Inquiry ID",
      selector: "_id",
      sortable: true
    },
    {
      name: "Name",
      selector: "name",
      wrap: true,
      sortable: true
    },
    {
      name: "Email",
      selector: "email",
      wrap: true,
      sortable: true
    },
    {
      name: "Subject",
      selector: "subject",
      wrap: true
    },
    {
      name: "Actions",
      cell: row => (
        <DButton as={Link} to={`/zeadmin/inq/${row._id}`}>
          <Eye size="18px" style={{ color: "white" }} />
        </DButton>
      )
    }
  ];

  return (
    <Layout>
      {!data_inquiries ? (
        <h1>Loading...</h1>
      ) : (
        <DataTable
          title={title}
          columns={columns}
          data={data_inquiries.inquiries.map(inq => inq)}
          responsive
          customStyles={customStyles}
          pagination={true}
          paginationPerPage={5}
          paginationRowsPerPageOptions={paginationRowsPerPageOptions}
          highlightOnHover
          pointerOnHover
        />
      )}
    </Layout>
  );
};

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
    Inquiry List
  </DLabel>
);
const paginationRowsPerPageOptions = [5, 10, 15, 20];

export default Inquiry;
