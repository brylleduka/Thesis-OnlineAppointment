import React, { useState, useRef } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_ABOUT_CMS } from "../../../../util/graphql/cms";
import { Icon, Modal, Form, Popup, Divider, TextArea } from "semantic-ui-react";
import { DImage, Content, DSection, DGrid } from "../../../styled/containers";
import { DButtonFree, DButton } from "../../../styled/utils";
import Spinner from "../../../Spinner";
import useUploadFile from "../../../../util/hooks/useUploadFile";
import toaster from "toasted-notes";

const ModalMissionVision = ({ isMissionVision }) => {
  const fileInputMV = useRef();
  const [openMission, setOpenMission] = useState(false);
  const [reverseMV, setReverseMV] = useState(
    isMissionVision ? isMissionVision.alt : false
  );

  const [valuesMV, setValuesMV] = useState({
    mtitle: isMissionVision ? isMissionVision.mission.title : "",
    msubtitle: isMissionVision ? isMissionVision.mission.subtitle : "",
    mparagraph: isMissionVision ? isMissionVision.mission.paragraph : "",
    vtitle: isMissionVision ? isMissionVision.vision.title : "",
    vsubtitle: isMissionVision ? isMissionVision.vision.subtitle : "",
    vparagraph: isMissionVision ? isMissionVision.vision.paragraph : "",
  });

  const {
    preview: previewMV,
    selectedFile: selectedFileMV,
    onSelectedFile: onSelectedFileMV,
  } = useUploadFile();

  const [updateMission, { loading }] = useMutation(UPDATE_ABOUT_MISSIONVISION, {
    variables: {
      ...valuesMV,
      photo: selectedFileMV,
      alt: reverseMV,
    },
    refetchQueries: [
      { query: FETCH_ABOUT_CMS, variables: { contentName: "ABOUTUS" } },
    ],
    onCompleted() {
      setOpenMission(false);
      toaster.notify("Update Successfully", {
        position: "bottom-right",
      });
    },
  });

  const handleInputClickMV = () => {
    fileInputMV.current.click();
  };

  const handleChangeValues = (e) => {
    setValuesMV({ ...valuesMV, [e.target.name]: e.target.value });
  };

  const handleReverseMV = () => {
    setReverseMV(!reverseMV);
  };

  const handleSaveMV = () => {
    updateMission();
  };

  return (
    <>
      <DButtonFree
        top={0}
        right={0}
        onClick={() => setOpenMission(true)}
        style={{ zIndex: 3 }}
      >
        <Icon name="edit" fitted />
      </DButtonFree>
      <Modal open={openMission} onClose={() => setOpenMission(false)} closeIcon>
        <Modal.Header>Update Header Content</Modal.Header>
        <DGrid two gap="20px">
          <Modal.Content style={{ padding: "10px" }}>
            <DSection width="100%" height="50vh">
              <DImage dashed height="100%" width="100%">
                {selectedFileMV ? (
                  <img src={previewMV} alt="showcase" />
                ) : (
                  isMissionVision.imageURL && (
                    <img src={isMissionVision.imageURL} alt="about" />
                  )
                )}
              </DImage>
            </DSection>

            <Content
              width="80%"
              margin="0 auto"
              flex
              justify="center"
              align="center"
            >
              <input
                type="file"
                value={undefined}
                onChange={onSelectedFileMV}
                style={{ display: "none" }}
                ref={fileInputMV}
              />
              <Popup
                content="Select image for background slide"
                trigger={
                  <Icon
                    name="camera"
                    size="large"
                    onClick={handleInputClickMV}
                    style={{
                      cursor: "pointer",
                      color: "#2193b0",
                      opacity: 0.75,
                    }}
                    className="icon_camera-custom"
                  />
                }
              />
            </Content>
          </Modal.Content>
          <Modal.Content scrolling style={{ padding: "10px" }}>
            <Form>
              <Divider horizontal>Mission</Divider>
              <Form.Field>
                <label>Title</label>
                <input
                  name="mtitle"
                  value={valuesMV.mtitle || ""}
                  onChange={handleChangeValues}
                />
              </Form.Field>
              <Form.Field>
                <label>Subtitle</label>
                <input
                  name="msubtitle"
                  value={valuesMV.msubtitle || ""}
                  onChange={handleChangeValues}
                />
              </Form.Field>

              <Form.Field>
                <label>Paragraph</label>
                <TextArea
                  style={{ minHeight: 100 }}
                  name="mparagraph"
                  value={valuesMV.mparagraph || ""}
                  onChange={handleChangeValues}
                />
              </Form.Field>

              <Divider horizontal>Vision</Divider>
              <Form.Field>
                <label>Title</label>
                <input
                  name="vtitle"
                  value={valuesMV.vtitle || ""}
                  onChange={handleChangeValues}
                />
              </Form.Field>
              <Form.Field>
                <label>Subtitle</label>
                <input
                  name="vsubtitle"
                  value={valuesMV.vsubtitle || ""}
                  onChange={handleChangeValues}
                />
              </Form.Field>

              <Form.Field>
                <label>Paragraph</label>
                <TextArea
                  style={{ minHeight: 100 }}
                  name="vparagraph"
                  value={valuesMV.vparagraph || ""}
                  onChange={handleChangeValues}
                />
              </Form.Field>

              <Form.Field>
                <label>
                  Image Position
                  <Popup
                    content="Adding overlay over the top of slide and make the text white for contrast"
                    trigger={
                      <Icon name="question circle outline" size="large" />
                    }
                  />
                </label>
                <Content
                  flex
                  align="center"
                  margin="0 auto"
                  width="80%"
                  height="10vh"
                >
                  <div className="pretty p-switch p-fill">
                    <input
                      type="checkbox"
                      name="reverse"
                      value={reverseMV}
                      checked={reverseMV === true ? true : false}
                      onChange={handleReverseMV}
                    />
                    <div className="state p-info">
                      <label>Reverse</label>
                    </div>
                  </div>
                </Content>
              </Form.Field>
            </Form>
          </Modal.Content>
        </DGrid>
        <Modal.Actions>
          <DButton confirm onClick={handleSaveMV}>
            {loading ? <Spinner small inverted /> : "Update"}
          </DButton>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const UPDATE_ABOUT_MISSIONVISION = gql`
  mutation updateMission(
    $mtitle: String
    $msubtitle: String
    $mparagraph: String
    $vtitle: String
    $vsubtitle: String
    $vparagraph: String
    $photo: Upload
    $alt: Boolean
  ) {
    updateMission(
      inputMissionVision: {
        mtitle: $mtitle
        msubtitle: $msubtitle
        mparagraph: $mparagraph
        vtitle: $vtitle
        vsubtitle: $vsubtitle
        vparagraph: $vparagraph
        photo: $photo
        alt: $alt
      }
    ) {
      missionvision {
        photo
        imageURL
        alt
        mission {
          title
          subtitle
          paragraph
        }
        vision {
          title
          subtitle
          paragraph
        }
      }
    }
  }
`;

export default ModalMissionVision;
