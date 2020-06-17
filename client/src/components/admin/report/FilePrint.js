import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Content, DImage, DGrid } from "../../styled/containers";
import { DButton, DLabel, DInput } from "../../styled/utils";
import { Modal, Icon } from "semantic-ui-react";
import { Grid } from "@styled-icons/boxicons-solid/Grid";
import moment from "moment";
import { Print } from "react-easy-print";
import DTextArea from "../../DTextArea";
import parser from "html-react-parser";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const FilePrint = ({ filteredItems, isPrintOpen, setIsPrintOpen }) => {
  const [content, setContent] = useState(
    "This report are the list of appointments for the month of June 2020."
  );
  const [author, setAuthor] = useState({
    one: "",
    two: "",
    titleOne: "",
    titleTwo: "",
  });

  const handleAuthor = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const [isEditPrint, setIsEditPrint] = useState(false);

  return (
    <>
      <Modal
        open={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        className="modalBgPrint"
      >
        <Modal.Header>
          <DButton
            onClick={() => window.print()}
            disabled={isEditPrint ? true : false}
          >
            <Icon name="print" fitted /> Print
          </DButton>
          <DButton onClick={() => setIsEditPrint(!isEditPrint)}>
            {isEditPrint ? (
              <>
                <Icon name="save" fitted />
                Save
              </>
            ) : (
              <>
                <Icon name="edit" fitted />
                Edit
              </>
            )}
          </DButton>
        </Modal.Header>

        <Modal.Content>
          <Content
            flex
            justify="flex-start"
            align="flex-start"
            direct="column"
            width="100%"
            align="100%"
          >
            <div
              style={{ position: "absolute", top: 0, right: 0, opacity: 0.5 }}
            >
              <DImage objFit="contain" circle height="200px" width="200px">
                <img src="https://zessencefacial.s3-ap-southeast-1.amazonaws.com/global/logo.png" />
              </DImage>
            </div>

            <Content
              width="100%"
              height="100%"
              flex
              justify="center"
              align="center"
              direct="column"
              margin="12px auto"
            >
              <h3>Z Essence Facial and Spa</h3>
              <Content
                width="100%"
                height="auto"
                flex
                justify="center"
                align="center"
                pad="3px 15px"
                margin="40px 0 0 0"
              >
                <DTextArea active={isEditPrint ? true : null}>
                  <CKEditor
                    onInit={(editor) => {
                      // Insert the toolbar before the editable area.
                      editor.ui
                        .getEditableElement()
                        .parentElement.insertBefore(
                          editor.ui.view.toolbar.element,
                          editor.ui.getEditableElement()
                        );
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data);
                    }}
                    editor={DecoupledEditor}
                    data={content}
                  />
                </DTextArea>

                <DTextArea
                  active={!isEditPrint ? true : null}
                  color={!content ? "#ccc" : null}
                  style={{ marginTop: "40px" }}
                >
                  {parser(content)}
                </DTextArea>
              </Content>
            </Content>
            <DataTable
              columns={columnsPrint}
              data={filteredItems}
              customStyles={customStyles}
              dense
            />
            <Content width="90%" height="100%" margin="24px auto">
              <DGrid two gap="50px">
                <Content
                  height="100%"
                  width="100%"
                  flex
                  justify="center"
                  align="center"
                  direct="column"
                  pad="10px"
                >
                  <Content
                    width="90%"
                    height="100%"
                    margin="12px auto"
                    pad="20px"
                    style={{ borderBottom: "1px solid #000" }}
                  ></Content>
                  {isEditPrint ? (
                    <>
                      <DInput
                        name="one"
                        placeholder="Author"
                        value={author.one}
                        onChange={handleAuthor}
                        textAlign="center"
                        margin="3px"
                      />
                      <DInput
                        name="titleOne"
                        placeholder="Title"
                        value={author.titleOne}
                        onChange={handleAuthor}
                        textAlign="center"
                        margin="3px"
                      />
                    </>
                  ) : (
                    <>
                      <h5>
                        {author.one.trim() !== "" ? author.one : "Author"}
                      </h5>
                      <span>
                        {author.titleOne.trim() !== ""
                          ? author.titleOne
                          : "Title"}
                      </span>
                    </>
                  )}
                </Content>
                <Content
                  height="100%"
                  width="100%"
                  flex
                  justify="center"
                  align="center"
                  direct="column"
                  pad="10px"
                >
                  <Content
                    width="90%"
                    height="100%"
                    margin="12px auto"
                    pad="20px"
                    style={{ borderBottom: "1px solid #000" }}
                  ></Content>
                  {isEditPrint ? (
                    <>
                      <DInput
                        name="two"
                        placeholder="Author"
                        value={author.two}
                        onChange={handleAuthor}
                        textAlign="center"
                        margin="3px"
                      />
                      <DInput
                        name="titleTwo"
                        placeholder="Title"
                        value={author.titleTwo}
                        onChange={handleAuthor}
                        textAlign="center"
                        margin="3px"
                      />
                    </>
                  ) : (
                    <>
                      <h5>
                        {author.two.trim() !== "" ? author.two : "Author"}
                      </h5>
                      <span>
                        {author.titleTwo.trim() !== ""
                          ? author.titleTwo
                          : "Title"}
                      </span>
                    </>
                  )}
                </Content>
              </DGrid>
            </Content>
          </Content>
        </Modal.Content>
      </Modal>
      <Print printOnly name="foo">
        <Content
          flex
          justify="flex-start"
          align="flex-start"
          direct="column"
          width="100%"
          align="100%"
        >
          <div style={{ position: "absolute", top: 0, right: 0, opacity: 0.5 }}>
            <DImage objFit="contain" circle height="200px" width="200px">
              <img src="/images/logo.png" />
            </DImage>
          </div>
          <Content
            width="100%"
            height="100%"
            flex
            justify="flex-start"
            align="flex-start"
            direct="column"
            margin="12px auto"
          >
            <Content
              width="100%"
              height="auto"
              flex
              justify="center"
              align="center"
              pad="3px 15px"
              margin="40px 0 0 0"
            >
              <p style={{ marginTop: "40px" }}>{parser(content)}</p>
            </Content>
          </Content>

          <DataTable
            columns={columnsPrint}
            data={filteredItems}
            customStyles={customStyles}
            dense
          />
          <Content width="90%" height="100%" margin="24px auto">
            <DGrid two gap="50px">
              <Content
                height="100%"
                width="100%"
                flex
                justify="center"
                align="center"
                direct="column"
                pad="10px"
              >
                <Content
                  width="90%"
                  height="100%"
                  margin="12px auto"
                  pad="20px"
                  style={{ borderBottom: "1px solid #000" }}
                ></Content>
                <h5>{author.one}</h5>
                <span>{author.titleOne}</span>
              </Content>
              <Content
                height="100%"
                width="100%"
                flex
                justify="center"
                align="center"
                direct="column"
                pad="10px"
              >
                <Content
                  width="90%"
                  height="100%"
                  margin="12px auto"
                  pad="20px"
                  style={{ borderBottom: "1px solid #000" }}
                ></Content>
                <h5>{author.two}</h5>
                <span>{author.titleTwo}</span>
              </Content>
            </DGrid>
          </Content>
        </Content>
      </Print>
    </>
  );
};

const columnsPrint = [
  {
    cell: () => <Grid size="22px" color="green" />,
    width: "56px",
    style: {
      borderBottom: "1px solid #fff",
      marginBottom: "-1px",
    },
  },
  {
    name: "ID",
    selector: "_id",
    wrap: true,
    omit: true,
  },
  {
    name: "Client",
    selector: "user",
    wrap: true,
    sortable: true,
    format: (row) =>
      `${row.user && row.user.firstName} ${row.user && row.user.lastName}`,
    omit: true,
  },
  {
    name: "Aesthetician",
    selector: "employee",
    wrap: true,
    sortable: true,
    format: (row) =>
      `${row.employee && row.employee.firstName} ${
        row.employee && row.employee.lastName
      }`,
  },
  {
    name: "Service",
    selector: "service",
    wrap: true,
    sortable: true,
    format: (row) => `${row.service && row.service.name}`,
  },
  {
    name: "Date",
    selector: "date",
    wrap: true,
    sortable: true,
    format: (row) => `${moment(parseInt(row.date)).format("LL")}`,
  },
  {
    name: "Status",
    selector: "status",
    wrap: true,
    sortable: true,
    cell: (row) => (
      <span
        style={
          row.status === "CANCELLED"
            ? { fontSize: 14, fontWeight: 500, color: "firebrick" }
            : row.status === "DONE"
            ? { fontSize: 14, fontWeight: 500, color: "blue" }
            : { fontSize: 14, fontWeight: 500, color: "blue" }
        }
      >
        {row.status}
      </span>
    ),
  },
];
const customStyles = {
  rows: {
    style: {
      fontSize: "11px",
      fontWeight: "700",
      color: "#000",
      marginBottom: "5px",
    },
  },
};

const title = (
  <DLabel
    size="18px"
    tt="uppercase"
    weight="700"
    pad="10px 20px"
    color="bluer"
    rounded
  >
    Appointment History
  </DLabel>
);

export default FilePrint;
