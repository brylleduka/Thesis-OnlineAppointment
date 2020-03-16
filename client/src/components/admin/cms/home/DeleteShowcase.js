import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_SHOWCASE } from "../../../../util/graphql/cms";
import { Modal } from "semantic-ui-react";
import { DButton } from "../../../styled/utils";
import Spinner from "../../../Spinner";

const DeleteShowcase = ({ openAlert, setOpenAlert, isDeleteShowCase }) => {
  const [deleteShowcase, { loading: loadingDelete }] = useMutation(
    DELETE_SHOWCASE,
    {
      refetchQueries: [
        {
          query: FETCH_SHOWCASE,
          variables: {
            section: "SHOWCASE"
          }
        }
      ],
      variables: {
        _id: isDeleteShowCase
      },
      onCompleted(result) {
        setOpenAlert(false);
      }
    }
  );

  function deleteShowcaseCB() {
    deleteShowcase();
  }

  return (
    <Modal basic open={openAlert} onClose={() => setOpenAlert(false)}>
      <Modal.Header>Delete Showcase</Modal.Header>
      <Modal.Content>
        Are you sure you want to delete this Showcase Image?
      </Modal.Content>
      <Modal.Actions>
        <DButton confirm basic onClick={deleteShowcaseCB}>
          {loadingDelete ? <Spinner small /> : "Yes"}
        </DButton>
        <DButton alert basic>
          No
        </DButton>
      </Modal.Actions>
    </Modal>
  );
};

const DELETE_SHOWCASE = gql`
  mutation deleteShowcase($_id: ID!) {
    deleteShowcase(_id: $_id)
  }
`;

export default DeleteShowcase;
