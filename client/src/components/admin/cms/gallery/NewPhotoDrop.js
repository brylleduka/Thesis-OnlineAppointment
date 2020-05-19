import React, { useState, useCallback } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_GALLERY } from "../../../../util/graphql/gallery";
import { Content } from "../../../styled/containers";
import { Plus } from "@styled-icons/boxicons-regular";
import toaster from "toasted-notes";
import Spinner from "../../../Spinner";
import Toasted from "../../../Toasted";
import { useDropzone } from "react-dropzone";

const NewPhotoDrop = ({ albumId }) => {
  const [addGalleryPhoto, { loading }] = useMutation(ADD_PHOTOS, {
    refetchQueries: [
      { query: FETCH_GALLERY, variables: { id: albumId, active: true } },
    ],
    onCompleted() {
      toaster.notify(
        ({ onClose }) => (
          <Toasted success onClick={onClose}>
            Upload Success
          </Toasted>
        ),
        { position: "bottom-right" }
      );
    },
  });

  // DROPZONE
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        addGalleryPhoto({ variables: { id: albumId, image: file } });
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result;
          console.log(binaryStr);
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [addGalleryPhoto]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Content
      width="100%"
      height="100px"
      rounded
      margin="24px auto"
      flex
      justify="center"
      align="center"
      style={{
        border: "2px dashed #D3CCE3",
        outline: "none",
        cursor: "pointer",
        color: "#D3CCE3",
      }}
      {...getRootProps({ className: "dropzone" })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p style={{ fontSize: "18px", fontWeight: 700 }}>
          Drop the files here ...
        </p>
      ) : (
        <p style={{ fontSize: "18px" }}>
          Drag 'n' drop some files here, or click to select files
        </p>
      )}
    </Content>
  );
};

const ADD_PHOTOS = gql`
  mutation addGalleryPhoto($id: ID!, $image: [Upload]) {
    addGalleryPhoto(_id: $id, image: $image) {
      _id
      title
      active
      photos {
        _id
        name
        caption
        src
        height
        width
      }
      createdAt
      updatedAt
    }
  }
`;

export default NewPhotoDrop;
