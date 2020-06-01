import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  FETCH_CATEGORY_QUERY,
  FETCH_ALL_CATEGORIES_QUERY,
} from "../../../../util/graphql/service";
import { DButton, IconWrap } from "../../../styled/utils";
import { DGrid, Content } from "../../../styled/containers";
import { JCard4, JCard3 } from "../../../styled/card";
import { Modal, Popup } from "semantic-ui-react";
import { DeleteForever, Restore, Warning } from "@styled-icons/material";

import { Check } from "@styled-icons/entypo";
import { Cancel } from "@styled-icons/typicons";
import parser from "html-react-parser";
import useWindowSize from "../../../../util/hooks/useWindowSize";

import toaster from "toasted-notes";
import Toasted from "../../../Toasted";
import Spinner from "../../../Spinner";

const ArchServCategView = ({ categoryId, categoryView, setCategoryView }) => {
  const { width: wid } = useWindowSize();
  const [categ, setCateg] = useState({});
  const [popWarnCateg, setPopWarnCateg] = useState(false);

  // QUERY CATEGORY
  const { data: categoryData, loading: categoryLoad } = useQuery(
    FETCH_CATEGORY_QUERY,
    {
      variables: { categoryId },
    }
  );

  useEffect(() => {
    if (categoryData) setCateg(categoryData.category);
  }, [categoryData]);

  // DELETE CATEGORY
  const [deleteCategory, { loading: loadResult }] = useMutation(
    DELETE_CATEG_PERM,
    {
      variables: {
        categoryId,
      },
      refetchQueries: [
        {
          query: FETCH_ALL_CATEGORIES_QUERY,
          variables: { active: false },
        },
      ],
      onCompleted() {
        setCategoryView(false);
        toaster.notify(
          ({ onClose }) => (
            <Toasted success onClick={onClose}>
              Successfully Deleted
            </Toasted>
          ),
          { position: "bottom-right" }
        );
      },
    }
  );
  // END DELETE

  // RESTORE
  const [archiveServCategory, { loading: loadArchServCategory }] = useMutation(
    RESTORE_SERVICE_CATEGORY,
    {
      variables: {
        categoryId,
        active: true,
      },

      refetchQueries: [
        {
          query: FETCH_ALL_CATEGORIES_QUERY,
          variables: { active: false },
        },
      ],
      onCompleted() {
        setCategoryView(false);
        toaster.notify(
          ({ onClose }) => (
            <Toasted success onClick={onClose}>
              Successfully Restored
            </Toasted>
          ),
          { position: "bottom-right" }
        );
      },
    }
  );
  // END RESTORE

  const handleWarning = () => {
    setPopWarnCateg(!popWarnCateg);
  };

  const handleDeleteConfirm = (e) => {
    e.preventDefault();
    deleteCategory();
  };

  const confirmRestoreCateg = (e) => {
    e.preventDefault();
    archiveServCategory();
  };

  return (
    <>
      <Modal
        size={wid < 1024 ? "tiny" : "small"}
        open={categoryView}
        onClose={() => setCategoryView(false)}
        closeIcon
      >
        {categoryLoad ? (
          <Spinner medium content="Please wait while we fetch data..." />
        ) : (
          <DGrid two>
            <Modal.Content>
              <JCard4
                top={"-30px"}
                imgh="250px"
                imgw={wid <= 768 ? "50%" : "75%"}
              >
                <div className="profile-image">
                  <img
                    src={
                      categ.photo
                        ? `/images/service/${categ.photo}`
                        : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample83.jpg"
                    }
                    alt={categ.photo}
                  />
                </div>
              </JCard4>
            </Modal.Content>
            <Modal.Content scrolling className="modal-content2">
              <JCard3>
                <div className="description">
                  <h1>{categ.name}</h1>

                  <p style={{ letterSpacing: "2px", lineHeight: 1.5 }}>
                    {categ.description
                      ? parser(categ.description)
                      : categ.description}
                  </p>
                </div>
              </JCard3>
            </Modal.Content>
          </DGrid>
        )}
        <Modal.Actions>
          <Content
            flex
            justify="space-between"
            align="center"
            width="100%"
            height="100%"
          >
            <Content
              flex
              width="100%"
              height="100%"
              justify="flex-start"
              align="center"
            >
              <Popup
                open={popWarnCateg}
                trigger={
                  <DButton alert flex onClick={handleWarning}>
                    <DeleteForever size="22px" />
                    Delete Permanently
                  </DButton>
                }
                position="top center"
                flowing
              >
                <DGrid two gap="5px">
                  <IconWrap
                    size="22px"
                    color="green"
                    margin="0 auto"
                    onClick={handleDeleteConfirm}
                  >
                    {loadResult ? (
                      <Spinner small row content="Deleting..." />
                    ) : (
                      <>
                        <Check title="Confirm deleting permanently" />
                        Confirm
                      </>
                    )}
                  </IconWrap>

                  <IconWrap
                    size="22px"
                    color="red"
                    margin="0 auto"
                    onClick={() => setPopWarnCateg(false)}
                  >
                    <Cancel title="Cancel action" />
                    Cancel
                  </IconWrap>
                </DGrid>
              </Popup>

              <Popup
                trigger={
                  <IconWrap
                    circle
                    color="secondary"
                    small
                    mcenter
                    title="Warning"
                  >
                    <Warning />
                  </IconWrap>
                }
                content={
                  <p style={{ fontWeight: 700 }}>
                    Deleting Permantly cannot be restored
                  </p>
                }
                position="top right"
                size="tiny"
                inverted
              />
            </Content>

            <Content
              width="100%"
              height="100%"
              flex
              justify="flex-end"
              align="center"
            >
              <DButton confirm onClick={confirmRestoreCateg}>
                {loadArchServCategory ? (
                  <Spinner row small content="Restoring..." />
                ) : (
                  <>
                    <Restore size="22px" />
                    Restore
                  </>
                )}
              </DButton>
            </Content>
          </Content>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const DELETE_CATEG_PERM = gql`
  mutation deleteCategory($categoryId: ID!) {
    deleteEmployee(_id: $categoryId)
  }
`;

const RESTORE_SERVICE_CATEGORY = gql`
  mutation archivedCategory($categoryId: ID!, $active: Boolean) {
    archivedCategory(_id: $categoryId, active: $active) {
      _id
      name
      description
      photo
    }
  }
`;

export default ArchServCategView;
