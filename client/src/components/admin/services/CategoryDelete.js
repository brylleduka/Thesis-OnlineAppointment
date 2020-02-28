import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../../util/graphql/service";
import { useMutation } from "@apollo/react-hooks";

import { Modal, Header } from "semantic-ui-react";
import { DButton, DButtonCancel } from "../../styled/utils";

const CategoryDelete = ({ setOpen, open, historyCallback, category }) => {
  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION, {
    update(cache) {
      const data = cache.readQuery({
        query: FETCH_ALL_CATEGORIES_QUERY
      });

      data.categories = data.categories.filter(
        categ => categ._id !== category._id
      );

      cache.writeQuery({
        query: FETCH_ALL_CATEGORIES_QUERY,

        data: { categories: [...data.categories] }
      });
    },
    onCompleted(data) {
      historyCallback();
    },
    variables: {
      categoryId: category._id
    }
  });

  const handleDeleteCategory = () => {
    deleteCategory();
  };

  return (
    <Modal basic size="small" open={open}>
      <Header
        icon="archive"
        content={`Delete this service: ${category.name}?`}
      />
      <Modal.Content>
        <p>
          All containing details about this service will be remove. Are you sure
          you want to continue?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <DButton basic onClick={() => setOpen(false)}>
          No
        </DButton>
        <DButtonCancel basic onClick={handleDeleteCategory}>
          Yes
        </DButtonCancel>
      </Modal.Actions>
    </Modal>
  );
};

const DELETE_CATEGORY_MUTATION = gql`
  mutation deleteCategory($categoryId: ID!) {
    deleteCategory(_id: $categoryId)
  }
`;

export default CategoryDelete;
