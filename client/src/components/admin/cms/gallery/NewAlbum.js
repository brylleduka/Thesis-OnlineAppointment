import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_GALLERIES } from "../../../../util/graphql/gallery";
import { Modal } from "semantic-ui-react";
import { DButton, DInput } from "../../../styled/utils";
import { Plus } from "@styled-icons/boxicons-regular";
import toaster from "toasted-notes";
import Spinner from "../../../Spinner";
import Toasted from "../../../Toasted";

const NewAlbum = () => {
  const [albumOpen, setAlbumOpen] = useState(false);
  const [title, setTitle] = useState("");

  const [newAlbum, { loading: loadNewAlbum }] = useMutation(NEW_ALBUM, {
    variables: {
      title,
    },
    refetchQueries: [{ query: FETCH_GALLERIES, variables: { active: true } }],
    onCompleted() {
      setAlbumOpen(false);
      setTitle("");
      toaster.notify(
        ({ onClose }) => (
          <Toasted success onClick={onClose}>
            New Album Added
          </Toasted>
        ),
        { position: "bottom-right" }
      );
    },
  });

  const handleTitle = (e) => {
    setTitle(e.currentTarget.value);
  };

  const handleNewAlbum = (e) => {
    e.preventDefault();
    newAlbum();
  };

  return (
    <>
      <DButton flex onClick={() => setAlbumOpen(true)}>
        <Plus size="22px" />
        New album
      </DButton>
      <Modal
        size="mini"
        open={albumOpen}
        onClose={() => setAlbumOpen(false)}
        closeIcon
      >
        <Modal.Header>New Album</Modal.Header>
        <Modal.Content>
          <DInput
            name="title"
            value={title}
            onChange={handleTitle}
            fluid
            placeholder="Album Title"
          />
        </Modal.Content>
        <Modal.Actions>
          <DButton onClick={handleNewAlbum}>
            {loadNewAlbum ? (
              <Spinner small inverted row content="Loading..." />
            ) : (
              "Save"
            )}
          </DButton>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const NEW_ALBUM = gql`
  mutation addGallery($title: String) {
    addGallery(title: $title) {
      _id
      title
      active
      createdAt
      updatedAt
    }
  }
`;

export default NewAlbum;
