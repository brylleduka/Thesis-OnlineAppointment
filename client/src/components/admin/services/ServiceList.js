import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_SERVICES_QUERY } from "../../../util/graphql/service";
import { Link } from "react-router-dom";
import { DSection, Content } from "../../styled/containers";
import { DButton, DLabel } from "../../styled/utils";
import DataTable from "react-data-table-component";
import { Eye } from "styled-icons/fa-regular/Eye";
import Spinner from "../../Spinner";
import NewService from "./NewService";

function extractContent(html) {
  return new DOMParser().parseFromString(html, "text/html").documentElement
    .textContent;
}

const ServiceList = ({ categoryId }) => {
  const [setServices] = useState([]);
  const [open, setOpen] = useState(false);

  const { data: data_services, loading: loading_services } = useQuery(
    FETCH_SERVICES_QUERY,
    {
      variables: {
        categoryId
      }
    }
  );

  // useEffect(() => {
  //   if (data_services) {
  //     setServices(data_services.services);
  //   }
  // }, [data_services]);

  const columns = [
    {
      name: "Service ID",
      selector: "_id",
      sortable: true
    },
    {
      name: "Thumbnail",
      selector: "photo",
      grow: 0,
      cell: row => (
        <img
          height="84px"
          width="56px"
          alt={row.name}
          src={
            row.photo !== null
              ? `/images/service/${row.photo}`
              : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }
        />
      )
    },
    {
      name: "Title",
      selector: "name",
      wrap: true,
      sortable: true
    },
    {
      name: "Description",
      selector: "description",
      wrap: true,
      cell: row => (
        <p style={{ fontWeight: 500 }}>{extractContent(row.description)}</p>
      )
    },

    {
      name: "Duration",
      selector: "duration",
      wrap: true,
      sortable: true,
      cell: row => <span style={{ fontWeight: 500 }}>{row.duration} min</span>
    },
    {
      name: "Actions",
      cell: row => (
        <DButton as={Link} to={`/zeadmin/service/${row._id}`}>
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
      rounded
    >
      Service List
    </DLabel>
  );

  const paginationRowsPerPageOptions = [5, 10, 15, 20];
  return (
    <DSection height="100%" width="90%">
      <Content width="100%" flex justify="flex-end" align="center">
        <DButton onClick={() => setOpen(true)}>New Service</DButton>
      </Content>
      {loading_services ? (
        <Spinner medium />
      ) : (
        <Content width="100%" margin="20px 0">
          <DataTable
            title={title}
            columns={columns}
            data={data_services.services.map(service => service)}
            responsive={true}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={paginationRowsPerPageOptions}
            progressComponent={<Spinner medium />}
            customStyles={customStyles}
            highlightOnHover
            pointerOnHover
          />
        </Content>
      )}

      <NewService categoryId={categoryId} open={open} setOpen={setOpen} />
    </DSection>
  );
};

export default ServiceList;
