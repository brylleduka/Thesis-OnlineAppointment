import React, { useState, useCallback } from "react";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/react-hooks";
import {
  FETCH_ALL_EMPLOYEES_QUERY,
  FETCH_EMPLOYEE_QUERY,
} from "../../../util/graphql/employee";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Content, DCard, DImage } from "../../styled/containers";
import { IconWrap, DButton } from "../../styled/utils";
import { Camera } from "@styled-icons/boxicons-solid/Camera";
import { Schedule } from "@styled-icons/material/Schedule";
import { UserDetail } from "@styled-icons/boxicons-solid/UserDetail";
import toaster from "toasted-notes";
import Toasted from "../../Toasted";
import useWindowSize from "../../../util/hooks/useWindowSize";
import Spinner from "../../Spinner";

const PhotoBooth = ({
  employee,
  employeeId,
  handleSchedule,
  handleDetails,
  s,
}) => {
  const { width: wid } = useWindowSize();
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  // LIGHT BOX
  const openLightbox = () => {
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setViewerIsOpen(false);
  };

  // DROPZONE
  const [addEmployeePhoto, { loading, data: empDataImg }] = useMutation(
    UPLOAD_EMPLOYEE_PHOTO,
    {
      refetchQueries: [
        { query: FETCH_EMPLOYEE_QUERY, variables: { employeeId } },
      ],
      onCompleted() {
        toaster.notify(({ onClose }) => (
          <Toasted success onClick={onClose}>
            Image Uploaded
          </Toasted>
        ));
      },
    }
  );

  const onDrop = useCallback(
    ([file]) => {
      if (file) {
        addEmployeePhoto({ variables: { employeeId, file } });
      } else {
        toaster.notify(({ onClose }) => (
          <Toasted warning onClick={onClose}>
            File size is to big
          </Toasted>
        ));
      }
    },
    [addEmployeePhoto]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 2048000,
  });

  const images = [
    {
      src: empDataImg
        ? empDataImg.addEmployeePhoto.Location
        : employee.imageURL !== null
        ? employee.imageURL
        : "https://zessencefacial.s3-ap-southeast-1.amazonaws.com/global/smiling-woman-with-touching-her-cheek-3762185.jpg",
    },
  ];

  return (
    <Content
      width="100%"
      height="100%"
      flex
      justify="flex-start"
      align="center"
      mcenter
      direct="column"
    >
      <DCard
        dw={wid < 524 ? "70%" : "100%"}
        dh="250px"
        mcenter
        p="0px"
        grayzoom
      >
        {loading ? (
          <Spinner content="Loading..." medium />
        ) : (
          <DImage height="100%" width="100%">
            <img
              src={
                empDataImg
                  ? empDataImg.addEmployeePhoto.Location
                  : employee.imageURL !== null
                  ? employee.imageURL
                  : "https://zessencefacial.s3-ap-southeast-1.amazonaws.com/global/smiling-woman-with-touching-her-cheek-3762185.jpg"
              }
              alt={employee.name}
              onClick={openLightbox}
            />
          </DImage>
        )}
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
      </DCard>

      <DButton width="180px" flex onClick={handleDetails}>
        <UserDetail size="22px" />
        Details
      </DButton>
      <DButton width="180px" flex onClick={handleSchedule}>
        <Schedule size="22px" title="Employee's Schdule Tab" />
        Schedule
      </DButton>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel views={images} />
          </Modal>
        ) : null}
      </ModalGateway>
    </Content>
  );
};

const UPLOAD_EMPLOYEE_PHOTO = gql`
  mutation addEmployeePhoto($employeeId: ID!, $file: Upload) {
    addEmployeePhoto(_id: $employeeId, file: $file) {
      Location
    }
  }
`;

export default PhotoBooth;
