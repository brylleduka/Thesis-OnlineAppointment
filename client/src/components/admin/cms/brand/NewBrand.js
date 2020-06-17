import React, { useCallback } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_BRANDS } from "../../../../util/graphql/brand";
import { Content } from "../../../styled/containers";

import toaster from "toasted-notes";

import Toasted from "../../../Toasted";
import { useDropzone } from "react-dropzone";

const NewBrand = () => {
  const [addBrand, { loading }] = useMutation(ADD_BRAND, {
    refetchQueries: [{ query: FETCH_BRANDS }],
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
    ([file]) => {
      if (file) {
        addBrand({ variables: { image: file } });
      } else {
        toaster.notify(
          ({ onClose }) => (
            <Toasted alert onClick={onClose}>
              File size was to large
            </Toasted>
          ),
          { position: "bottom-right" }
        );
      }
    },
    [addBrand]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 1024000,
  });
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

const ADD_BRAND = gql`
  mutation addBrand($image: Upload) {
    addBrand(image: $image) {
      _id
      image
      imageURL
      active
    }
  }
`;

export default NewBrand;
