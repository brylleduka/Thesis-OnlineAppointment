import React, { useRef } from "react";
import { Icon, Popup } from "semantic-ui-react";
import { DImage, Content, DSection, Overlay } from "../../../styled/containers";

const ImageSection = ({
  isColor,
  preview,
  selectedFile,
  onSelectedFile,
  values,
  bgImgURL,
}) => {
  const fileInput = useRef();

  const handleInputClick = () => {
    fileInput.current.click();
  };

  return (
    <>
      <DSection width="100%" height="50vh" bgcolor={isColor}>
        <DImage dashed height="100%" width="100%">
          {selectedFile ? (
            <img src={preview} alt="showcase" />
          ) : (
            bgImgURL && <img src={bgImgURL} alt="showcase" />
          )}
        </DImage>

        <Overlay
          flex
          bgl
          justify={"flex-start"}
          align="center"
          className={"dark"}
        >
          <div className="overlay-content">
            <h3>{values.title ? values.title : "TITLE"}</h3>
            <h4>{values.subtitle ? values.subtitle : "SUBTITLE"}</h4>
            <p className="ps">
              {values.description
                ? values.description
                : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere ante orci, at interdum nunc maximus eu. Pellentesque tempus est ligula, sit ame"}
            </p>
          </div>
        </Overlay>
      </DSection>

      <Content width="80%" margin="0 auto" flex justify="center" align="center">
        <input
          type="file"
          value={undefined}
          onChange={onSelectedFile}
          style={{ display: "none" }}
          ref={fileInput}
        />
        <Popup
          content="Select image for background slide"
          trigger={
            <Icon
              name="camera"
              size="large"
              onClick={handleInputClick}
              style={{ cursor: "pointer", color: "#2193b0", opacity: 0.75 }}
              className="icon_camera-custom"
            />
          }
        />
      </Content>
    </>
  );
};

export default ImageSection;