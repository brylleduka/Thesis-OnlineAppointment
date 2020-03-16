import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import Layout from "../../components/admin/layout/Layout";
import DataTable from "react-data-table-component";
import { FETCH_INQUIRIES } from "../../util/graphql/inquiry";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { DButton, DLabel } from "../../components/styled/utils";
import { Popup, Icon } from "semantic-ui-react";
import ReplyModal from "../../components/admin/inquiry/ReplyModal";

const Inquiry = () => {
  const [open, setOpen] = useState(false);
  const [inquiries, setInquiries] = useState([]);

  const [inq, setInq] = useState({});

  const { data: data_inquiries, loading: loading_inquiries, error } = useQuery(
    FETCH_INQUIRIES
  );

  useEffect(() => {
    if (data_inquiries) {
      setInquiries(data_inquiries.inquiries);
    }
  }, [data_inquiries]);

  const handleRow = e => {
    setInq(e.currentTarget.value);
    setOpen(true);
  };

  const columns = [
    {
      name: "Inquiry ID",
      selector: "_id",
      sortable: true
    },
    {
      name: "Subject",
      selector: "subject",
      wrap: true
    },

    {
      name: "Message",
      selector: "message",
      format: row => {
        const length = 50;
        const msg = row.message;

        const trimString =
          msg.length > length
            ? msg.substring(0, length) + "..."
            : msg.substring(0, length);
        return <span>{trimString}</span>;
      }
    },
    {
      name: "Actions",
      cell: row => (
        <Popup
          trigger={
            <DButton
              height="32px"
              pad="2px 8px"
              value={row._id}
              onClick={handleRow}
            >
              <Icon name="eye" />
            </DButton>
          }
          mouseEnterDelay={500}
          mouseLeaveDelay={500}
          content="View detailed appointment info."
          position="left center"
          size="tiny"
        />
      )
    }
  ];

  return (
    <Layout>
      {loading_inquiries ? (
        <h1>Loading...</h1>
      ) : (
        <DataTable
          title={title}
          columns={columns}
          data={inquiries.map(inq => inq)}
          responsive
          customStyles={customStyles}
          pagination={true}
          paginationPerPage={5}
          paginationRowsPerPageOptions={paginationRowsPerPageOptions}
          highlightOnHover
          pointerOnHover
        />
      )}
      {inq && <ReplyModal inqId={inq} open={open} setOpen={setOpen} />}
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
