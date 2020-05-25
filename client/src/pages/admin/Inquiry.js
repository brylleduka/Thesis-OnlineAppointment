import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import Layout from "../../components/admin/layout/Layout";
import DataTable from "react-data-table-component";
import { FETCH_INQUIRIES } from "../../util/graphql/inquiry";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { DButton } from "../../components/styled/utils";
import { DSection } from "../../components/styled/containers";
import { Popup, Icon, Breadcrumb } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Grid } from "@styled-icons/boxicons-solid/Grid";
import { Eye } from "styled-icons/fa-regular";
import Spinner from "../../components/Spinner";
import ReplyModal from "../../components/admin/inquiry/ReplyModal";
import moment from "moment";

const Inquiry = () => {
  const [open, setOpen] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [inqVal, setInqVal] = useState("");

  const { data: data_inquiries, loading: loading_inquiries, error } = useQuery(
    FETCH_INQUIRIES
  );

  useEffect(() => {
    if (data_inquiries) {
      setInquiries(data_inquiries.inquiries);
    }
  }, [data_inquiries]);

  const [readInq, { loading: loadReadInq }] = useMutation(READ_INQ, {
    variables: { inqId: inqVal },
    refetchQueries: [{ query: FETCH_INQUIRIES }],
  });

  const handleRow = (e) => {
    readInq();
    setOpen(true);
  };

  const handleMouseOver = (e) => {
    setInqVal(e.currentTarget.dataset.inqid);
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
      name: "Subject",
      selector: "subject",
      wrap: true,
    },

    {
      name: "Message",
      selector: "message",
      format: (row) => {
        const length = 50;
        const msg = row.message;

        const trimString =
          msg.length > length
            ? msg.substring(0, length) + "..."
            : msg.substring(0, length);
        return <span>{trimString}</span>;
      },
    },
    {
      name: "Date",
      selector: "createdAt",
      sortable: true,
      cell: (row) => moment(parseInt(row.createdAt)).format("LLL"),
    },
    {
      name: "Status",
      selector: "read",
      sortable: true,
      format: (row) => {
        return (
          <span style={{ fontWeight: 700 }}>
            {row.read ? "Read" : "Unread"}
          </span>
        );
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <Popup
          trigger={
            <DButton
              flex
              data-inqid={row._id}
              onClick={handleRow}
              onMouseOver={handleMouseOver}
            >
              <Eye size="18px" />
            </DButton>
          }
          mouseEnterDelay={500}
          mouseLeaveDelay={500}
          content="View detailed appointment info."
          position="left center"
          size="tiny"
        />
      ),
      right: true,
    },
  ];

  return (
    <Layout>
      <DSection
        width="90%"
        height="100%"
        mcenter
        flex
        justify="space-around"
        align="center"
        direct="column"
        pad="24px 0"
      >
        {/* <Content
          flex
          justify="space-between"
          align="center"
          width="100%"
          margin="0 auto"
        >
          <Breadcrumb size={"huge"}>
            <Breadcrumb.Section as={Link} to="/zeadmin/inquiry" active>
              Inquiry List
            </Breadcrumb.Section>
          </Breadcrumb>
        </Content> */}

        <DataTable
          title={title}
          columns={columns}
          data={inquiries.map((inq) => inq)}
          responsive
          customStyles={customStyles}
          pagination={true}
          paginationPerPage={10}
          paginationRowsPerPageOptions={paginationRowsPerPageOptions}
          highlightOnHover
          pointerOnHover
          progressPending={loading_inquiries}
          progressComponent={
            <Spinner content="Please wait while we fetch our data..." />
          }
        />

        <ReplyModal inqId={inqVal} open={open} setOpen={setOpen} />
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

const title = (
  <Breadcrumb size={"huge"}>
    <Breadcrumb.Section as={Link} to="/zeadmin/inquiry" active>
      Inquiry List
    </Breadcrumb.Section>
  </Breadcrumb>
);

const paginationRowsPerPageOptions = [5, 10, 15, 20];

const READ_INQ = gql`
  mutation readInquiry($inqId: ID!) {
    readInquiry(_id: $inqId)
  }
`;

export default Inquiry;
