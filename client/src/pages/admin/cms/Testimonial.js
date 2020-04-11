import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_TESTIMONIALS } from "../../../util/graphql/testimonial";
import Layout from "../../../components/admin/layout/Layout";
import DataTable from "react-data-table-component";
import { DSection, Content } from "../../../components/styled/containers";

import ToggleView from "../../../components/admin/testimonial/ToggleView";
import MenuView from "../../../components/admin/testimonial/MenuView";
import Spinner from "../../../components/Spinner";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);

  const {
    data: dataReviews,
    loading: loadReviews,
  } = useQuery(FETCH_TESTIMONIALS, { variables: { active: true } });

  useEffect(() => {
    if (dataReviews) {
      setReviews(dataReviews.testimonials);
    }
  }, [dataReviews]);

  const columns = [
    {
      cell: (row) => <ToggleView swid={row._id} tggl={row.view} />,
      width: "80px",
      button: true,
      style: {
        borderBottom: "1px solid #FFFFFF",
        marginBottom: "-1px",
      },
    },
    {
      name: "Message",
      selector: "message",
      sortable: true,
      wrap: true,
    },
    {
      name: "Name",
      selector: "user.lastName",
      sortable: true,
      format: (row) => `${row.user.firstName} ${row.user.lastName}`,
    },
    {
      name: "Action",
      cell: (row) => <MenuView menuId={row._id} review={row} />,
      button: true,
      allowOverflow: true,
      width: "80px",
    },
  ];

  return (
    <Layout>
      <DSection
        width="90%"
        mcenter
        height="100%"
        flex
        justify="flex-start"
        align="flex-start"
        direct="column"
      >
        <Content width="100%" margin="20px 0">
          <DataTable
            columns={columns}
            data={reviews.map((rev) => rev)}
            responsive
            customStyles={customStyles}
            pagination={true}
            paginationPerPage={5}
            paginationRowsPerPageOptions={paginationRowsPerPageOptions}
            highlightOnHover
            pointerOnHover
            progressPending={loadReviews}
            progressComponent={
              <Spinner content="Please wait while we fetch our data..." />
            }
          />
        </Content>
      </DSection>
    </Layout>
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

const paginationRowsPerPageOptions = [5, 10, 15, 20];

const TOGGLE_REVIEW = gql`
  mutation toggleTestimonial($id: ID) {
    toggleTestimonial(_id: $id) {
      _id
    }
  }
`;

export default Testimonial;
