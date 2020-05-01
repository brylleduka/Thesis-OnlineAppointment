import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../../util/hooks/useForm";
import toaster from "toasted-notes";
import { Form, Label, Grid } from "semantic-ui-react";
import { Content, DGrid } from "../../../components/styled/containers";
import { DButton, DLabel, IconWrap } from "../../../components/styled/utils";
import { Edit, Trash } from "@styled-icons/boxicons-solid";
import Spinner from "../../../components/Spinner";
import MenuDots from "../../../components/MenuDots";
import DTextArea from "../../../components/DTextArea";
import CategoryDelete from "./CategoryDelete";
import parser from "html-react-parser";
import Toasted from "../../../components/Toasted";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const CategoryDetails = ({ category, historyCallback }) => {
  const [open, setOpen] = useState(false);
  // const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  // const editor = useRef(null);
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
        <Toasted success onClick={onClose}>
          Category Updated
        </Toasted>
      ));
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

  // const config = {
  //   removePlugins: ["Table", "Image", "MediaEmbed"],
  // };

  return (
    <>
      <Form noValidate>
        <DGrid>
          <MenuDots topright medium>
            <Grid divided columns={2}>
              <Grid.Column>
                <DButton confirm onClick={handleEdit} flex>
                  <IconWrap mcenter>
                    <Edit size="22px" title="Update Content" />
                  </IconWrap>
                </DButton>
              </Grid.Column>
              <Grid.Column>
                <DButton alert flex onClick={() => setOpen(true)}>
                  <IconWrap mcenter>
                    <Trash size="22px" title="Archive or Permanently Delete" />
                  </IconWrap>
                </DButton>
              </Grid.Column>
            </Grid>
          </MenuDots>

          <Content
            width="100%"
            height="100%"
            flex
            justify="flex-start"
            align="flex-start"
            direct="column"
            margin="12px auto"
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
              <DTextArea border active={isEdit ? true : null}>
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

              <DTextArea border active={!isEdit ? true : null}>
                {parser(content)}
              </DTextArea>
            </Content>
          </Content>
          {isEdit && (
            <Content flex justify="flex-end" align="center" width="100%">
              <DButton type="submit" onClick={handleSubmit}>
                {loading ? (
                  <Spinner small row inverted content="Loading..." />
                ) : (
                  "Save"
                )}
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
