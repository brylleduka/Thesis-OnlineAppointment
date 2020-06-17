import React, { useCallback, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useDropzone } from "react-dropzone";
import { FETCH_USER_ACCOUNT } from "../../../util/graphql/user";
import { DGrid, DCard, Content, DImage } from "../../styled/containers";
import { DButton } from "../../styled/utils";
import { Camera } from "@styled-icons/boxicons-solid/Camera";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import Carousel, { Modal, ModalGateway } from "react-images";

const AccountContentOne = ({ handleAppointments, handleDetails, userInfo }) => {
  const [preview, setPreview] = useState();
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = () => {
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setViewerIsOpen(false);
  };

  // DROPZONE
  const [addUserPhoto, { loading, data: uploadFileData }] = useMutation(
    UPLOAD_USER_PHOTO
  );

  const onDrop = useCallback(
    ([file]) => {
      if (file) {
        setPreview(URL.createObjectURL(file));
        addUserPhoto({ variables: { userId: userInfo._id, file } });
      }
    },
    [addUserPhoto]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 1024000,
  });

  const images = [
    {
      src:
        (uploadFileData && uploadFileData.addUserPhoto.Location) ||
        userInfo.imageURL,
    },
  ];

  return (
    <Content width="100%" height="auto">
      <Content flex direct="column" align="center" height="auto" width="100%">
        <DCard dh="200px" flex justifyBetween alignCenter fcol>
          {loading ? (
            <h1>Loading..</h1>
          ) : (
            <DImage circle height="150px" width="150px">
              <img
                src={
                  uploadFileData
                    ? uploadFileData.addUserPhoto.Location
                    : userInfo.imageURL !== null
                    ? userInfo.imageURL
                    : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                }
                alt="Avatar"
                onClick={openLightbox}
              />
            </DImage>
          )}
          <span className="camera" {...getRootProps()}>
            <Camera size="18px" color="white" />
            <input {...getInputProps()} />
          </span>
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel views={images} />
              </Modal>
            ) : null}
          </ModalGateway>
        </DCard>
        <DCard dh="100%" flex fcol>
          <DButton onClick={handleDetails} fluid="true">
            Account Details
          </DButton>
          <DButton onClick={handleAppointments} fluid="true">
            Appointments
          </DButton>
        </DCard>
      </Content>
    </Content>
  );
};

const UPLOAD_USER_PHOTO = gql`
  mutation addUserPhoto($userId: ID!, $file: Upload) {
    addUserPhoto(_id: $userId, file: $file) {
      Location
    }
  }
`;

export default AccountContentOne;
