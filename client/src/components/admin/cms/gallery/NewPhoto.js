import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_GALLERY } from "../../../../util/graphql/gallery";
import { Modal } from "semantic-ui-react";
import { DButton, DInput } from "../../../styled/utils";
import { Plus } from "@styled-icons/boxicons-regular";
import toaster from "toasted-notes";
import Spinner from "../../../Spinner";
import Toasted from "../../../Toasted";

const NewPhoto = ({ albumId }) => {
  const [newPhotoOpen, setNewPhotoOpen] = useState(false);

  const [addGalleryPhoto, { loading }] = useMutation(ADD_PHOTOS, {
    refetchQueries: [
      { query: FETCH_GALLERY, variables: { id: albumId, active: true } },
    ],
    onCompleted() {
      toaster.notify(({ onClose }) => (
        <Toasted success onClick={onClose}>
          Upload Success
        </Toasted>
      ));
    },
  });

  // DROPZONE
  // const onDrop = useCallback(
  //   (acceptedFiles) => {
  //     acceptedFiles.forEach((file) => {
  //       addGalleryPhoto({ variables: { id: albumId, image: file } });
  //       const reader = new FileReader();

  //       reader.onabort = () => console.log("file reading was aborted");
  //       reader.onerror = () => console.log("file reading has failed");
  //       reader.onload = () => {
  //         // Do whatever you want with the file contents
  //         const binaryStr = reader.result;
  //         console.log(binaryStr);
  //       };
  //       reader.readAsArrayBuffer(file);
  //     });
  //   },
  //   [addGalleryPhoto]
  // );
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <DButton onClick={() => setNewPhotoOpen(true)}>Add New Photo</DButton>
      <Modal
        size="small"
        open={newPhotoOpen}
        onClose={() => setNewPhotoOpen(false)}
        closeIcon
      >
        <Modal.Header>Add Photo</Modal.Header>
        <Modal.Content>
          <Modal.Description>{albumId}</Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <DButton>Save</DButton>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const ADD_PHOTOS = gql`
  mutation addGalleryPhoto($id: ID!, $caption: String, $image: Upload) {
    addGalleryPhoto(_id: $id, caption: $caption, image: $image) {
      _id
      title
      active
      photos {
        _id
        name
        caption
        image
        height
        width
      }
      createdAt
      updatedAt
    }
  }
`;

export default NewPhoto;
