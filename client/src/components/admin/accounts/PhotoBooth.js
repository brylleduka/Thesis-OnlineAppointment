import React, { useCallback, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useDropzone } from "react-dropzone";
import { DGrid, Content, DCard, DImage } from "../../styled/containers";
import { DButton, IconWrap } from "../../styled/utils";
import { Camera } from "@styled-icons/boxicons-solid/Camera";
import Carousel, { Modal, ModalGateway } from "react-images";
import Spinner from "../../Spinner";

const PhotoBooth = ({
  id,
  photo,
  fetchEmployee,
  handleDetails,
  handleSchedule,
}) => {
  // LIGHT BOX
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const openLightbox = () => {
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setViewerIsOpen(false);
  };

  // DROPZONE
  const [addEmployeePhoto, { loading }] = useMutation(UPLOAD_EMPLOYEE_PHOTO, {
    refetchQueries: [
      {
        query: fetchEmployee,
        variables: {
          employeeId: id,
        },
      },
    ],
  });

  const onDrop = useCallback(
    ([file]) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      addEmployeePhoto({ variables: { employeeId: id, file } });
    },
    [addEmployeePhoto]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const images = [
    {
      src: photo
        ? `/images/employees/${photo}`
        : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ];

  return (
    <Content
      flex
      direct="column"
      margin="0 auto"
      align="center"
      width="100%"
      height="auto"
    >
      <DCard
        circle
        dh="200px"
        dw="200px"
        flex
        justifyCenter
        alignCenter
        fcol
        grayzoom
      >
        <DImage circle height="100%" align="100%">
          {loading ? (
            <Content flex justify="center" align="center" width="100%">
              <Spinner small />
            </Content>
          ) : (
            <img
              src={
                photo !== null
                  ? `/images/employees/${photo}`
                  : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              }
              alt="Avatar"
              onClick={openLightbox}
            />
          )}
        </DImage>
        <IconWrap
          {...getRootProps()}
          bg={({ theme }) => theme.bluer}
          circle
          shadow
          bottomcenter
          small
          pad="3px"
          bgcolor={({ theme }) => theme.bluer}
        >
          <Camera title="Upload" />
          <input {...getInputProps()} />
        </IconWrap>
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel views={images} />
            </Modal>
          ) : null}
        </ModalGateway>
      </DCard>
      <Content
        width="80%"
        margin="24px auto"
        height="auto"
        flex
        align="center"
        direct="column"
      >
        <DButton width="150px" onClick={handleDetails} fluid>
          Account Details
        </DButton>
        <DButton width="150px" onClick={handleSchedule} fluid>
          Schedule
        </DButton>
      </Content>
    </Content>
  );
};

const UPLOAD_EMPLOYEE_PHOTO = gql`
  mutation addEmployeePhoto($employeeId: ID!, $file: Upload) {
    addEmployeePhoto(_id: $employeeId, file: $file)
  }
`;

export default PhotoBooth;
