import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_SERVICES_QUERY } from "../../../util/graphql/service";
import { Link } from "react-router-dom";
import { Content } from "../../styled/containers";
import { DButton, DLabel, IconWrap } from "../../styled/utils";
import DataTable from "react-data-table-component";
import { Eye } from "styled-icons/fa-regular/Eye";
import { Grid } from "@styled-icons/boxicons-solid/Grid";
import Spinner from "../../Spinner";
import NewService from "./NewService";
import parse from "html-react-parser";

const ServiceList = ({ categoryId }) => {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);

  const { data: data_services, loading: loading_services } = useQuery(
    FETCH_SERVICES_QUERY,
    {
      variables: {
        categoryId,
      },
    }
  );

  useEffect(() => {
    if (data_services) {
      setServices(data_services.services);
    }
  }, [data_services]);

  const columns = [
    {
      cell: () => (
        <IconWrap color={({ theme }) => theme.bluer}>
          <Grid size="22px" />
        </IconWrap>
      ),
      width: "56px",
      style: {
        borderBottom: "1px solid #fff",
        marginBottom: "-1px",
      },
    },
    {
      name: "Thumbnail",
      selector: "photo",
      grow: 0,
      cell: (row) => (
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
      ),
    },
    {
      name: "Title",
      selector: "name",
      wrap: true,
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
      wrap: true,
      format: (row) => {
        const length = 50;
        const descript = row.description;

        const trimString =
          descript.length > length
            ? descript.substring(0, length) + "..."
            : descript.substring(0, length);

        return <p style={{ fontWeight: 500 }}>{parse(trimString)}</p>;
      },
    },

    {
      name: "Duration",
      selector: "duration",
      wrap: true,
      sortable: true,
      cell: (row) => (
        <span style={{ fontWeight: 500 }}>{row.duration} min</span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <DButton flex width="56px" size="36px">
          <Link to={`/zeadmin/service/${row._id}`} className="flex-center">
            <Eye size="22px" title="View Service Information" />
          </Link>
        </DButton>
      ),
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
  };

  const paginationRowsPerPageOptions = [5, 10, 15, 20];
  return (
    <>
      <Content width="100%" flex justify="space-between" align="center">
        <h3>Services</h3>
        <DButton onClick={() => setOpen(true)}>New Service</DButton>
      </Content>
      <DataTable
        columns={columns}
        data={services.map((service) => service)}
        responsive={true}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        progressPending={loading_services}
        progressComponent={
          <Spinner content="Please wait while we fetch our data..." />
        }
      />

      <NewService categoryId={categoryId} open={open} setOpen={setOpen} />
    </>
  );
};

export default ServiceList;
