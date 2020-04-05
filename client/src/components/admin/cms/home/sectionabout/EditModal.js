import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Popup } from "semantic-ui-react";
import Spinner from "../../../../Spinner";

const EditModal = ({ aboutBool }) => {
  const [updateAboutSection, { loading }] = useMutation(UPDATE_ABOUT_SECTION, {
    variables: { sectionName: "ABOUT" },
  });

  const handleReverse = () => {
    updateAboutSection();
  };

  return (
    <>
      {loading ? (
        <Spinner small />
      ) : (
        <Popup
          content="Toggle Position"
          trigger={
            <div className="pretty p-switch p-fill p-toggle">
              <input
                type="checkbox"
                name="alt"
                value={aboutBool}
                onChange={handleReverse}
                checked={aboutBool === true ? true : false}
              />
              <div className="state p-primary p-on">
                <label style={{ fontWeight: 500 }}>Reverse</label>
              </div>
              <div className="state p-warning p-off">
                <label style={{ fontWeight: 500 }}>Default</label>
              </div>
            </div>
          }
          position="left center"
          size="tiny"
          inverted
        />
      )}
    </>
  );
};

const UPDATE_ABOUT_SECTION = gql`
  mutation updateAboutSection($sectionName: String!) {
    updateAboutSection(sectionName: $sectionName) {
      _id
      sectionName
      alt
    }
  }
`;

export default EditModal;
