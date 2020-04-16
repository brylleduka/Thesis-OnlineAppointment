import React, { useRef, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../../util/hooks/useForm";
import toaster from "toasted-notes";
import JoditEditor from "jodit-react";
import { Form, Label, Popup, Grid, Icon } from "semantic-ui-react";
import { Content, DGrid } from "../../../components/styled/containers";
import {
  DButton,
  DotsVertical,
  DLabel,
} from "../../../components/styled/utils";
import Spinner from "../../../components/Spinner";
import CategoryDelete from "./CategoryDelete";
import parser from "html-react-parser";
import Toasted from "../../../components/Toasted";
import CKEditor from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
// import InlineEditor from "@ckeditor/ckeditor5-build-inline";

const CategoryDetails = ({ category, historyCallback }) => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const editor = useRef(null);
  const [content, setContent] = useState(category.description);

  const { values, handleChange, handleSubmit } = useForm(
    updateCategoryCallback,
    {
      title: category.name,
    }
  );

  const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY_DETAILS, {
    variables: {
      categoryId: category._id,
      title: values.title,
      description: content,
    },

    onCompleted() {
      setIsEdit(false);
      toaster.notify(({ onClose }) => (
        <Toasted success>Category Updated</Toasted>
      ));
      editor.destroy();
    },
  });

  function updateCategoryCallback() {
    updateCategory();
  }

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  const config = {
    removePlugins: ["Table", "Image", "MediaEmbed"],
  };

  return (
    <>
      <Form noValidate>
        <DGrid>
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <Popup
              on={"click"}
              trigger={<DotsVertical size="32px" />}
              flowing
              position="top right"
            >
              <Grid divided columns={2}>
                <Grid.Column>
                  <DButton width="80px" onClick={handleEdit}>
                    <Icon name="edit" fitted />
                  </DButton>
                </Grid.Column>
                <Grid.Column>
                  <DButton alert width="80px" onClick={() => setOpen(true)}>
                    <Icon name="trash" fitted />
                  </DButton>
                </Grid.Column>
              </Grid>
            </Popup>
          </div>

          <Content
            width="100%"
            height="100%"
            flex
            justify="flex-start"
            align="flex-start"
            direct="column"
            margin="12px auto"
            style={{ overflow: "visible !important" }}
          >
            <Label style={styles.label}>Title</Label>
            {isEdit ? (
              <Content
                width="90%"
                flex
                justify="flex-start"
                align="center"
                pad="3px 15px"
                margin="0 auto"
              >
                <input
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
              </Content>
            ) : (
              <Content
                width="90%"
                flex
                justify="flex-start"
                align="center"
                pad="3px 15px"
                margin="0 auto"
              >
                <DLabel
                  flex
                  justifyEnd
                  alignCenter
                  weight={700}
                  w={"50%"}
                  size="18px"
                >
                  {values.title}
                </DLabel>
              </Content>
            )}
          </Content>
          <Content
            width="100%"
            height="100%"
            flex
            justify="flex-start"
            align="flex-start"
            direct="column"
            margin="12px auto"
          >
            <Label style={styles.label}>Description</Label>
            <Content
              width="90%"
              height="auto"
              flex
              justify="flex-start"
              align="center"
              pad="3px 15px"
              margin="0 auto"
            >
              <div className={isEdit ? "editorck active" : "editorck"}>
                <CKEditor
                  onInit={(editor) => {
                    console.log("Editor is ready to use!", editor);

                    // Insert the toolbar before the editable area.
                    editor.ui
                      .getEditableElement()
                      .parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                      );

                    console.log(editor.state);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                  }}
                  editor={DecoupledEditor}
                  data={content}
                  // onBlur={(event, editor) => {
                  //   console.log("Blur.", editor);
                  // }}
                  // onFocus={(event, editor) => {
                  //   console.log("Focus.", editor);
                  // }}
                  config={config}
                />
              </div>

              <div
                style={
                  isEdit
                    ? {
                        display: "none",
                        border: "1px solid #ccc",
                        width: "100%",
                        height: "100%",
                        maxHeight: "150px",
                        minHeight: "50px",
                        margin: "0 auto",
                        borderRadius: "5px",
                        padding: "10px",
                      }
                    : {
                        display: "block",
                        border: "1px solid #ccc",
                        width: "100%",
                        height: "100%",
                        maxHeight: "150px",
                        minHeight: "50px",
                        margin: "0 auto",
                        borderRadius: "5px",
                        padding: "10px",
                      }
                }
              >
                {parser(content)}
              </div>
            </Content>
          </Content>
          {isEdit && (
            <Content flex justify="flex-end" align="center" width="100%">
              <DButton type="submit" onClick={handleSubmit}>
                {loading ? <Spinner small inverted /> : "Save"}
              </DButton>
              <DButton alert onClick={handleCancel}>
                Cancel
              </DButton>
            </Content>
          )}
        </DGrid>
      </Form>
      <CategoryDelete
        open={open}
        setOpen={setOpen}
        category={category}
        historyCallback={historyCallback}
      />
    </>
  );
};

const styles = {
  label: {
    width: "20%",
    textAlign: "center",
    fontWeight: 700,
    fontSize: "14px",
    marginBottom: "1rem",
  },
};

const UPDATE_CATEGORY_DETAILS = gql`
  mutation updateCategory(
    $categoryId: ID!
    $title: String
    $description: String
  ) {
    updateCategory(_id: $categoryId, name: $title, description: $description) {
      _id
      name
      description
    }
  }
`;

export default CategoryDetails;
