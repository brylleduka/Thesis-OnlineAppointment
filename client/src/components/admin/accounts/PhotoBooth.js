import React, { useCallback, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useDropzone } from "react-dropzone";
import { DGrid, Content, DCard, DImage } from "../../styled/containers";
import { Camera } from "@styled-icons/boxicons-solid/Camera";
import Carousel, { Modal, ModalGateway } from "react-images";
import Spinner from "../../Spinner";

const PhotoBooth = ({
  id,
  photo,
  fetchEmployee,
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
          employeeId: id
        }
      }
    ]
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
        : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    }
  ];

  return (
    <Content width="100%" height="auto">
      <DGrid gap="15px">
        <DCard dh="200px" flex justifyBetween alignCenter fcol>
          <DImage circle height="150px" width="150px">
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
        {/* <DCard dh="100%" flex fcol justifyBetween>
          <DButton onClick={handleDetails} fluid>
            Account Details
          </DButton>
          <DButton onClick={handleSchedule} fluid>
            Schedule
          </DButton>
        </DCard> */}
      </DGrid>
    </Content>
  );
};

const UPLOAD_EMPLOYEE_PHOTO = gql`
  mutation addEmployeePhoto($employeeId: ID!, $file: Upload) {
    addEmployeePhoto(_id: $employeeId, file: $file)
  }
`;

export default PhotoBooth;
