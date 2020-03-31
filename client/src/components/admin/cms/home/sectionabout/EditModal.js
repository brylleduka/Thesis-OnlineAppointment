import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Popup, Icon, Dimmer, Loader } from "semantic-ui-react";
import { DButton } from "../../../../styled/utils";

const EditModal = ({ aboutBool }) => {
  const [isReverse, setIsReverse] = useState(aboutBool ? aboutBool : false);

  const [updateAboutSection, { loading }] = useMutation(UPDATE_ABOUT_SECTION, {
    variables: {
      alt: isReverse
    }
  });

  const handleReverse = () => {
    setIsReverse(!isReverse);
  };

  const handleSaveAbout = () => {
    updateAboutSection();
  };

  return (
    <Popup
      trigger={
        <DButton>
          <Icon name="edit" fitted />
        </DButton>
      }
      on="click"
      position="top center"
    >
      <div className="pretty p-switch">
        <input
          type="checkbox"
          name="alt"
          value={isReverse}
          onChange={handleReverse}
          checked={isReverse === true ? true : false}
        />
        <div className="state">
          <label>{isReverse ? "Reverse" : "Default"}</label>
        </div>
      </div>
      {loading ? (
        <Dimmer active inverted>
          <Loader size="mini" />
        </Dimmer>
      ) : (
        <Popup
          content="Save changes"
          trigger={
            <Icon
              name="save"
              size="large"
              color="green"
              style={{ cursor: "pointer" }}
              onClick={handleSaveAbout}
            />
          }
          position="left center"
          size="tiny"
          inverted
        />
      )}
    </Popup>
  );
};

const UPDATE_ABOUT_SECTION = gql`
  mutation updateAboutSection(
    $title: String
    $subtitle: String
    $alt: Boolean
  ) {
    updateAboutSection(title: $title, subtitle: $subtitle, alt: $alt) {
      _id
      title
      subtitle
      alt
    }
  }
`;

export default EditModal;
