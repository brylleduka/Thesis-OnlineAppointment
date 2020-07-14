import React, { useRef } from "react";
import { Icon, Popup } from "semantic-ui-react";
import {
  DImage,
  Content,
  DSection,
  ShowcaseOverlay,
} from "../../../../styled/containers";

const ImageSection = ({
  isPosition,
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

        <ShowcaseOverlay
          titleSize="58px"
          greetSize="18px"
          paragSize="14px"
          bgr={isPosition === "right" ? true : null}
          bgl={isPosition === "left" ? true : null}
          bgc={isPosition === "center" ? true : null}
        >
          <div className="overlay-content">
            <h3 className="greeting">{values.subtitle}</h3>
            <h1 className="title">{values.title}</h1>
            <p className="content">{values.paragraph}</p>
          </div>
        </ShowcaseOverlay>
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
