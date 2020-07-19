import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_SERVICES_QUERY } from "../../../../util/graphql/service";
import { DButton, DLabel } from "../../../styled/utils";
import DataTable from "react-data-table-component";
import Spinner from "../../../Spinner";
import { Eye } from "styled-icons/fa-regular";
import { DeleteForever } from "@styled-icons/material";
import { Restore } from "@styled-icons/material/Restore";
import { Grid } from "@styled-icons/boxicons-solid/Grid";
import Page404 from "../../../../pages/Page404";
import parser from "html-react-parser";
import { DCard, Content } from "../../../styled/containers";
import ArchServSubView from "./ArchServSubView";
import ArchServSubRestore from "./ArchServSubRestore";
import ArchServSubDelete from "./ArchServSubDelete";

const ArchServSub = () => {
  const [archServices, setArchServices] = useState([]);
  const [serviceIdVal, setServiceIdVal] = useState("");
  const [serviceView, setServiceView] = useState(false);

  const {
    data: servicesData,
    loading: servicesLoad,
    error: servicesErr,
  } = useQuery(FETCH_ALL_SERVICES_QUERY, {
    variables: { active: false },
    pollInterval: 500,
  });

  useEffect(() => {
    if (servicesData) setArchServices(servicesData.allServices);
  }, [servicesData]);

  const handleServiceHover = (e) => {
    setServiceIdVal(e.currentTarget.dataset.serviceid);
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
      name: "Thumbnail",
      selector: "photo",
      grow: 0.5,
      hide: "md",
      cell: (row) => (
        <img
          height="80px"
          width="52px"
          alt={row.photo}
          src={
            row.photo !== null
              ? `/images/service/${row.photo}`
              : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }
        />
      ),
    },
    {
      name: "Name",
      selector: "name",
      wrap: true,
      sortable: true,
      cell: (row) => <span>{row.name}</span>,
    },
    {
      name: "Description",
      selector: "description",
      cell: (row) =>
        row.description.length > 100
          ? parser(row.description.substr(0, 100)) + "..."
          : parser(row.description.substr(0, 100)),
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
          data-serviceid={row._id}
          onMouseOver={handleServiceHover}
        >
          <DButton flex onClick={() => setServiceView(true)}>
            <Eye size={"18px"} title="View Details" />
          </DButton>
          <ArchServSubRestore serviceId={row._id} />
          <ArchServSubDelete serviceId={row._id} />
        </Content>
      ),
    },
  ];

  return (
    <>
      <DCard dw="100%" dh="100%" margin="12px auto" flex fcol>
        <DLabel size="22px" bgblue color="light" rounded>
          Sub Services
        </DLabel>
        <DataTable
          columns={columns}
          data={archServices}
          responsive
          customStyles={customStyles}
          pagination={true}
          paginationPerPage={10}
          paginationRowsPerPageOptions={paginationRowsPerPageOptions}
          highlightOnHover
          pointerOnHover
          progressPending={servicesLoad}
          progressComponent={
            <Spinner content="Please wait while we fetch our data..." />
          }
        />
      </DCard>
      <ArchServSubView
        serviceId={serviceIdVal}
        serviceView={serviceView}
        setServiceView={setServiceView}
      />
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

export default ArchServSub;
