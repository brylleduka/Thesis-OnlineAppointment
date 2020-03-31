import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Modal, Icon } from "semantic-ui-react";
import { DButton } from "../../../../styled/utils";
import { FETCH_THE_SHOWCASE } from "../../../../../util/graphql/cms";
import Spinner from "../../../../Spinner";
import toaster from "toasted-notes";

const RemoveSlide = ({ showcase }) => {
  const [isOpenRemove, setIsOpenRemove] = useState(false);

  const [removeSlide, { loading }] = useMutation(REMOVE_SLIDE, {
    variables: {
      showcaseId: showcase._id
    },
    refetchQueries: [
      { query: FETCH_THE_SHOWCASE, variables: { sectionName: "SHOWCASE" } }
    ],
    onCompleted() {
      setIsOpenRemove(false);
      toaster.notify("Slide Remove", { position: "bottom-right" });
    }
  });

  const handleRemoveSlide = e => {
    e.preventDefault();
    removeSlide();
  };

  return (
    <>
      <DButton alert onClick={() => setIsOpenRemove(true)}>
        <Icon name="trash" fitted />
      </DButton>
      <Modal
        basic
        open={isOpenRemove}
        closeIcon
        onClose={() => setIsOpenRemove(false)}
      >
        <Modal.Header>Slide ID: {showcase._id}</Modal.Header>
        <Modal.Content>
          <h1>Are you sure you want to remove this slide?</h1>
        </Modal.Content>
        <Modal.Actions>
          <DButton basic confirm onClick={handleRemoveSlide}>
            {loading ? <Spinner inverted small /> : "Yes"}
          </DButton>
          <DButton basic alert onClick={() => setIsOpenRemove(false)}>
            No
          </DButton>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const REMOVE_SLIDE = gql`
  mutation removeShowcase($showcaseId: ID!) {
    removeShowcase(showcaseId: $showcaseId)
  }
`;

export default RemoveSlide;
