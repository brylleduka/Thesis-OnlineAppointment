import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../../util/graphql/service";
import { useMutation } from "@apollo/react-hooks";

import { Modal, Header, Popup, Grid } from "semantic-ui-react";
import { DButton, IconWrap } from "../../styled/utils";
import { Content } from "../../styled/containers";
import { DeleteForever } from "@styled-icons/material";
import { Check } from "@styled-icons/entypo";
import { Cancel } from "@styled-icons/typicons";
import { Warning } from "@styled-icons/material-rounded";

const CategoryDelete = ({ setOpen, open, historyCallback, category }) => {
  const [archivedCategory] = useMutation(ARCHIVE_CATEGORY, {
    variables: { categoryId: category._id },
    refetchQueries: [
      { query: FETCH_ALL_CATEGORIES_QUERY, variables: { active: true } },
    ],
    onCompleted() {
      historyCallback();
    },
  });

  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION, {
    update(cache) {
      const data = cache.readQuery({
        query: FETCH_ALL_CATEGORIES_QUERY,
        variables: { active: true },
      });

      data.categories = data.categories.filter(
        (categ) => categ._id !== category._id
      );

      cache.writeQuery({
        query: FETCH_ALL_CATEGORIES_QUERY,
        variables: { active: true },
        data: { categories: [...data.categories] },
      });
    },
    onCompleted() {
      historyCallback();
    },
    variables: {
      categoryId: category._id,
    },
  });

  const handleDeleteCategory = () => {
    deleteCategory();
  };

  return (
    <Modal
      basic
      size="small"
      open={open}
      closeIcon
      onClose={() => setOpen(false)}
    >
      <Header
        icon="archive"
        content={`Archive this service: ${category.name}?`}
      />
      <Modal.Content>
        <p style={{ fontWeight: 700 }}>
          All containing details about this service will be remove. Are you sure
          you want to continue?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Content
          width="100%"
          height="100%"
          flex
          justify="space-between"
          align="center"
        >
          <Content
            flex
            width="100%"
            height="100%"
            justify="flex-start"
            align="center"
          >
            <Popup
              on="click"
              trigger={
                <DButton alert flex>
                  <DeleteForever size="22px" />
                  Delete Permanently
                </DButton>
              }
              position="top center"
              flowing
            >
              <Grid divided columns={2}>
                <Grid.Column>
                  <IconWrap size="22px" color="green" margin="0 auto">
                    <Check
                      title="Confirm deleting permanently"
                      onClick={handleDeleteCategory}
                    />
                  </IconWrap>
                </Grid.Column>
                <Grid.Column>
                  <IconWrap size="22px" color="red" margin="0 auto">
                    <Cancel title="Cancel action" />
                  </IconWrap>
                </Grid.Column>
              </Grid>
            </Popup>

            <Popup
              trigger={
                <IconWrap
                  circle
                  shadow
                  color="yellow"
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
            />
          </Content>
          <Content
            width="100%"
            height="100%"
            flex
            justify="flex-end"
            align="center"
          >
            <DButton confirm basic onClick={() => archivedCategory()}>
              Yes
            </DButton>
          </Content>
        </Content>
      </Modal.Actions>
    </Modal>
  );
};

const ARCHIVE_CATEGORY = gql`
  mutation archivedCategory($categoryId: ID!) {
    archivedCategory(_id: $categoryId)
  }
`;

const DELETE_CATEGORY_MUTATION = gql`
  mutation deleteCategory($categoryId: ID!) {
    deleteCategory(_id: $categoryId)
  }
`;

export default CategoryDelete;
