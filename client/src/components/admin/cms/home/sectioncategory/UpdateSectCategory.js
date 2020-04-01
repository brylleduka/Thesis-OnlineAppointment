import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_HOME_SECTION } from "../../../../../util/graphql/cms";
import { Modal, Icon, Form, TextArea, Popup } from "semantic-ui-react";
import { BlockPicker } from "react-color";
import Spinner from "../../../../Spinner";
import toaster from "toasted-notes";
import { DButton } from "../../../../styled/utils";
import { Content } from "../../../../styled/containers";

const colors = [
  "#6dd5ed",
  "#2193b0",
  "#fe8c00",
  "#E9E4F0",
  "#203A43",
  "#FFFFFF"
];

const UpdateSectCategory = ({
  setOpenCatSec,
  openCatSec,
  categorySectionInfo
}) => {
  const [isColor, setIsColor] = useState(
    categorySectionInfo && categorySectionInfo.bgColor
  );

  const [isDark, setIsDark] = useState(
    categorySectionInfo && categorySectionInfo.dark
  );

  const [gridCount, setGridCount] = useState(
    categorySectionInfo && categorySectionInfo.grid
  );

  const [values, setValues] = useState({
    title: categorySectionInfo && categorySectionInfo.title,
    subtitle: categorySectionInfo && categorySectionInfo.subtitle,
    paragraph: categorySectionInfo && categorySectionInfo.paragraph
  });

  const [updateSectionCategory, { loading }] = useMutation(
    UPDATE_CATEGORY_SECTION,
    {
      variables: {
        sectionName: "CATEGORY",
        ...values,
        grid: gridCount,
        dark: isDark,
        bgColor: isColor
      },
      refetchQueries: [
        { query: FETCH_HOME_SECTION, variables: { sectionName: "CATEGORY" } }
      ],
      onCompleted() {
        setOpenCatSec(false);
        toaster.notify("Update Category Section");
      }
    }
  );

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeComplete = color => {
    setIsColor(color.hex);
  };

  const handleDark = () => {
    setIsDark(!isDark);
  };

  const handleGrid = event => {
    setGridCount(parseInt(event.target.value));
  };

  const handleSave = () => {
    updateSectionCategory();
  };

  return (
    <Modal
      size="small"
      open={openCatSec}
      onClose={() => setOpenCatSec(false)}
      closeIcon
    >
      <Modal.Header>Update Section Category</Modal.Header>
      <Modal.Content scrolling>
        <Form>
          <Form.Field>
            <label>Title</label>
            <input
              name="title"
              value={values.title || ""}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Subtitle</label>
            <input
              name="subtitle"
              value={values.subtitle || ""}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Paragraph</label>
            <TextArea
              maxLength="150"
              style={{ minHeight: 100 }}
              name="paragraph"
              value={values.paragraph || ""}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>
              Background-color{" "}
              <Popup
                content="This Background color is for fallback if background image is not set or unavailable"
                trigger={<Icon name="question circle outline" size="large" />}
              />
            </label>

            <BlockPicker
              width="200px"
              triangle="hide"
              color={isColor}
              colors={colors}
              onChange={handleChangeComplete}
            />
          </Form.Field>
          <Form.Field>
            <label>
              Text Contrast{" "}
              <Popup
                content="Change the text to white if background is dark and dark text if background is light"
                trigger={<Icon name="question circle outline" size="large" />}
              />
            </label>
            <Content
              flex
              align="center"
              margin="0 auto"
              width="80%"
              height="10vh"
            >
              <div className="pretty p-switch p-fill">
                <input
                  type="checkbox"
                  name="dark"
                  value={isDark}
                  checked={isDark === true ? true : false}
                  onChange={handleDark}
                />
                <div className="state p-info">
                  <label>{isDark === true ? "Light" : "Dark"}</label>
                </div>
              </div>
            </Content>
          </Form.Field>
          <Form.Field>
            <label>Grid Count Display</label>
            <Content
              flex
              justify="space-around"
              align="center"
              margin="0 auto"
              width="80%"
              height="10vh"
            >
              <div className="pretty p-default  p-curve p-pulse">
                <input
                  type="radio"
                  name="switch1"
                  value="2"
                  checked={gridCount === 2 ? true : false}
                  onChange={handleGrid}
                />
                <div className="state  p-info-o">
                  <label>Two</label>
                </div>
              </div>
              <div className="pretty p-default  p-curve p-pulse">
                <input
                  type="radio"
                  name="switch1"
                  value="3"
                  checked={gridCount === 3 ? true : false}
                  onChange={handleGrid}
                />
                <div className="state  p-info-o">
                  <label>Three</label>
                </div>
              </div>
              <div className="pretty p-default p-curve p-pulse">
                <input
                  type="radio"
                  name="switch1"
                  value="4"
                  checked={gridCount === 4 ? true : false}
                  onChange={handleGrid}
                />
                <div className="state  p-info-o">
                  <label>Four</label>
                </div>
              </div>
            </Content>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <DButton onClick={handleSave}>
          {loading ? <Spinner small inverted /> : "Save"}
        </DButton>
      </Modal.Actions>
    </Modal>
  );
};

const UPDATE_CATEGORY_SECTION = gql`
  mutation updateHomeSection(
    $sectionName: String
    $title: String
    $subtitle: String
    $paragraph: String
    $bgColor: String
    $dark: Boolean
    $grid: Int
  ) {
    updateHomeSection(
      sectionName: $sectionName
      inputHomeContent: {
        title: $title
        subtitle: $subtitle
        paragraph: $paragraph
        bgColor: $bgColor
        dark: $dark
        grid: $grid
      }
    ) {
      _id
      sectionName
      title
      subtitle
      paragraph
      bgColor
      dark
      grid
    }
  }
`;

export default UpdateSectCategory;
