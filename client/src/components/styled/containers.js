import styled from "styled-components";

const columns = {
  two: "repeat(2, 1fr)",
  three: "repeat(3, 1fr)",
  four: "repeat(4 , 1fr)",
  five: "repeat(5 , 1fr)",
  six: "repeat(6,1fr)",
};

const rows = {
  two: "repeat(2, 1fr)",
  three: "repeat(3, 1fr)",
  four: "repeat(4 , 1fr)",
  five: "repeat(5 , 1fr)",
  six: "repeat(6,1fr)",
};

export const DContainer = styled.div`
  width: 100%;
  margin: auto;
  background: rgba(242, 242, 242, 0.2);
  margin-top: 12vh;
`;

export const DShowCase = styled.div`
  width: 100%;
  height: ${(props) => (props.height ? props.height : "100vh")};
  position: relative;
  background: ${(props) => props.bgcolor && props.bgcolor};
  background-image: url(${(props) => props.background && props.background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: center;

  h1,
  h2,
  p {
    margin-left: 48px;
  }
  .btn {
    margin-left: 48px;
  }

  img {
    height: 100%;
    width: auto;
    object-fit: cover;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${(props) =>
    props.bg
      ? props.bg
      : props.bgr
      ? "linear-gradient(270deg, rgba(0,0,0,0.4) 8%, rgba(255,255,255,0) 100%)"
      : props.bgl
      ? "linear-gradient(90deg, rgba(0,0,0,0.4) 8%, rgba(255,255,255,0) 100%)"
      : props.bgc
      ? "rgba(0,0,0,0.4)"
      : "rgba(0, 0, 0, 0)"};
  border-radius: inherit;
  z-index: 1;
  display: ${(props) => props.flex && "flex"};
  justify-content: ${(props) => props.justify && props.justify};
  align-items: ${(props) => props.align && props.align};
  flex-flow: ${(props) => props.flow && props.flow};
  flex-direction: ${(props) => props.direct && props.direct};
  padding: ${(props) => props.pad && props.pad};
  cursor: ${(props) => props.pointer && "pointer"};
  opacity: ${(props) => props.opac && props.opac};
  transition: opacity 0.3s ease;

  overflow: hidden;

  &:hover {
    opacity: ${(props) => props.hovOpac && props.hovOpac};
  }

  .overlay-box {
    width: 0;
    height: 100%;

    border: 1px solid white;
    margin: 0 auto;
    transform: rotate(45deg);
    transition: width 0.4s ease-in-out;

    .overlay-box__content {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;

      text-align: center;
      transform: rotate(-45deg);
      h1 {
        transform: translateY(80px);
        transition: transform 0.4s ease-in-out;
      }
    }
  }

  &:hover .overlay-box {
    width: 100%;
  }

  &:hover .overlay-box .overlay-box__content {
    h1 {
      transform: translateY(20px);
    }
  }

  .overlay-content {
    width: ${(props) => (props.cwidth ? props.cwidth : "80%")};
    text-align: ${(props) => (props.talign ? props.talign : "left")};
    height: auto;
    margin: ${(props) => (props.cmarg ? props.cmarg : "0 24px")};
    padding: 10px 40px;

    h1,
    h2,
    p {
      letter-spacing: 5px;
      line-height: 1.4;
    }

    h3,
    h4,
    .ps {
      letter-spacing: 1px;
      line-height: 1.4;
    }
    .ps {
      font-size: 10px;
    }

    h1 {
      font-size: ${(props) => (props.fs ? props.fs : "60px")};
      font-weight: 700;
      text-transform: uppercase;
    }
  }

  @media (max-width: 768px) {
    .overlay-content {
      min-width: 90%;
      h1 {
        font-size: 32px;
      }
      h1,
      p {
        letter-spacing: 2px;
        line-height: 2;
      }
    }
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const DGrid = styled.section`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) =>
    props.two
      ? columns.two
      : props.three
      ? columns.three
      : props.four
      ? columns.four
      : props.six
      ? columns.six
      : props.custom
      ? props.custom
      : "1fr"};
  grid-gap: ${(props) => props.gap && props.gap};
  grid-template-rows: ${(props) =>
    props.row2
      ? rows.two
      : props.row3
      ? rows.three
      : props.row4
      ? rows.four
      : props.row6
      ? rows.six
      : props.rowCustom
      ? props.rowCustom
      : "1fr"};
  margin: ${(props) => props.margin && props.margin};

  .card-content {
    border-radius: ${(props) => (props.circle ? "40% 40% 10px 10px" : "5px")};
    padding: 10px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 2px rgba(0, 0, 0, 0.2),
      0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.1),
      0 16px 16px rgba(0, 0, 0, 0.05);

    .card-details {
      padding: 0 10px;

      h3 {
        margin-bottom: 5px;
      }
      p {
        font-size: 13px;
      }
      a {
        display: inline-block;
        padding: 10px 0;
        color: #0067b8;
        text-transform: uppercase;
        font-weight: 700;
      }
    }
  }

  @media (max-width: 1024px) {
    grid-template-columns: ${(props) =>
      props.med10 ? props.med10 : "repeat(2, 1fr)"};
  }

  @media (max-width: 768px) {
    grid-template-columns: ${(props) =>
      props.med7 ? props.med7 : "repeat(2, 1fr)"};
  }

  @media (max-width: 500px) {
    grid-template-columns: ${(props) => (props.med5 ? props.med5 : "1fr")};
  }
`;

export const DCard = styled.div`
  position: relative;
  border-radius: 10px;
  padding: ${(props) => (props.p ? props.p : "10px")};
  height: ${(props) => (props.dh ? props.dh : "300px")};
  width: ${(props) => (props.dw ? props.dw : "250px")};
  cursor: ${(props) => props.pointer && "pointer"};
  display: ${(props) => props.flex && "flex"};
  justify-content: ${(props) =>
    props.justifyCenter
      ? "center"
      : props.justifyAround
      ? "space-around"
      : props.justifyBetween
      ? "space-between"
      : props.jusitfyFend
      ? "flex-end"
      : "flex-start"};

  align-items: ${(props) =>
    props.alignCenter
      ? "center"
      : props.alignAround
      ? "space-around"
      : props.alignBetween
      ? "space-between"
      : props.alignFend
      ? "flex-end"
      : "flex-start"};
  flex-direction: ${(props) => props.fcol && "column"};

  overflow: hidden;
  background: ${(props) => (props.bg ? props.bg : "#ffffff")};
  box-shadow: ${(props) =>
    props.bs
      ? props.bs
      : ("0 1px 1px rgba(0, 0, 0, 0.12)",
        "0 2px 2px rgba(0, 0, 0, 0.12)",
        "0 4px 4px rgba(0, 0, 0, 0.12)",
        "0 6px 8px rgba(0, 0, 0, 0.12)",
        "0 8px 16px rgba(0, 0, 0, 0.12)")};

  .card-details {
    padding: 0 10px;
    margin: 16px 0;

    h3 {
      margin-bottom: 5px;
    }
    p {
      font-size: 13px;
    }
    a {
      display: inline-block;
      padding: 10px 0;
      color: #0067b8;
      text-transform: uppercase;
      font-weight: 700;
    }
  }

  .camera {
    position: absolute;
    bottom: 15%;
    right: 25%;
    transform: translate(-50%, -50%);
    z-index: 10;
    background: ${({ theme }) => theme.primary};
    border-radius: 50%;
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.blue};
    }

    &:focus,
    &:active {
      background: darken(${({ theme }) => theme.primary}, 12%);
      outline: none;
      border: none;
    }
  }
`;

export const DSection = styled.section`
  height: ${(props) => (props.height ? props.height : "400px")};
  width: ${(props) => (props.width ? props.width : "100%")};
  margin: ${(props) =>
    props.margin ? props.margin : props.mcenter ? "0 auto" : "0"};
  padding: ${(props) => props.pad && props.pad};
  background: ${(props) => props.bgcolor && props.bgcolor};
  background-image: url(${(props) => props.background && props.background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;

  display: ${(props) => props.flex && "flex"};
  justify-content: ${(props) => props.justify && props.justify};
  align-items: ${(props) => props.align && props.align};
  flex-flow: ${(props) => props.flow && props.flow};
  flex-direction: ${(props) => props.direct && props.direct};
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const Content = styled.div`
  height: ${(props) => props.height && props.height};
  width: ${(props) =>
    props.width ? props.width : props.fluid ? "100%" : "50%"};
  padding: ${(props) => props.pad && props.pad};
  display: ${(props) => props.flex && "flex"};
  justify-content: ${(props) => props.justify && props.justify};
  align-items: ${(props) => props.align && props.align};
  flex-flow: ${(props) => props.flow && props.flow};
  flex-direction: ${(props) => props.direct && props.direct};
  letter-spacing: 2px;
  position: relative;
  margin: ${(props) => props.margin && props.margin};
  background: url('${(props) =>
    props.background && props.background}') no-repeat center center/cover;
  background-attachment: ${(props) => props.fixed && "fixed"};
  background-color: ${(props) => props.bgcolor && props.bgcolor};
  border-radius: ${(props) =>
    props.rounded
      ? "10px"
      : props.br1
      ? "0% 24% 26% 39% / 20% 0% 100% 0% "
      : "0"};
  box-shadow: ${(props) =>
    props.bs &&
    ("0 1px 1px rgba(0, 0, 0, 0.12)",
    "0 2px 2px rgba(0, 0, 0, 0.12)",
    "0 4px 4px rgba(0, 0, 0, 0.12)",
    "0 6px 8px rgba(0, 0, 0, 0.12)",
    "0 8px 16px rgba(0, 0, 0, 0.12)")};
  z-index: 2;
  font-weight: ${(props) => props.weight && props.weight};

  h2 {
    text-transform: uppercase;
  }

  h1,
  h2,
  h3,
  h4,
  p,
  span {
    color: ${(props) => props.color && props.color};
  }

  p {
    margin: 10px 0 20px;
    font-size: ${(props) => (props.size ? props.size : "14px")};
  }
  .content-edit {
    color: ${({ theme }) => theme.blue};
    &:hover {
      color: ${({ theme }) => theme.bluer};
      cursor: pointer;
    }
  }

  img {
    max-height: ${(props) => (props.imgHeight ? props.imgHeight : "300px")};
    width: ${(props) => (props.imgWidth ? props.imgWidth : "100%")};
    border-radius: ${(props) => props.circle && "50%"};
    object-fit: contain;
  }
`;

export const DImage = styled.div`
  height: ${(props) => (props.height ? props.height : "300px")};
  width: ${(props) => (props.width ? props.width : "auto")};
  position: relative;
  overflow: hidden;
  border-radius: ${(props) =>
    props.circle ? "50%" : props.rounded ? "20px" : "0"};
  border: ${(props) =>
    props.bordered
      ? "1px solid #000"
      : props.dashed
      ? "1px dashed #ccc"
      : "none"};
  margin: ${(props) => (props.m ? props.m : "0 auto")};
  padding: ${(props) => props.pad && props.pad};
  img {
    display: inline;
    margin: 0 auto;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const DFooterLinks = styled.section`
  background: #f2f2f2;
  color: #616161;
  font-size: 12px;
  padding: 35px 0;

  .links-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
    align-items: flex-start;
    justify-content: center;

    li {
      line-height: 2.8;
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export const DFooter = styled.footer`
  background: #f2f2f2;
  font-size: 12px;
  padding: 20px 0;
  color: #616161;

  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
    }
    li {
      margin-right: 30px;
      margin-bottom: 20px;
    }
  }
`;

export const Section2Styled = styled.div`
  position: relative;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  max-height: 100vh;
  min-height: 30vh;
  height: 100%;
  width: ${(props) => (props.width ? props.width : "90%")};
  margin: 24px auto;
  text-align: center;

  .switch {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: auto;
    margin-bottom: 24px;
    position: absolute;
    top: 0;
    right: 24px;
  }

  .sec2-container {
    width: 100%;
    min-width: 90%;
    margin: 0 auto;
    padding-top: 48px;
    .sec2-inner {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      ${(props) => props.alt && "flex-direction: row-reverse"};
      margin: 0 auto;
      height: 100vh;

      .sec2-content {
        width: 50%;

        .sec2-content_inner {
          width: 90%;
          margin: 0 auto;
          color: #323232;
          h1 {
            font-weight: 500;
            font-size: 32px;
            text-align: left;
            margin-bottom: 24px;
            .sec2-content_line {
              margin: 0;
              height: 44px;
              overflow: hidden;
            }
          }
          p {
            font-size: 14px;
            line-height: 24px;
            padding: 12px;
            margin-bottom: 56px;
            text-align: justify;
          }
        }
      }
      .sec2-images {
        width: 55%;
        height: 100%;
        position: relative;

        .sec2-images_inner {
          .sec2-image {
            position: absolute;
            overflow: hidden;

            &.imgs:nth-child(1) {
              top: 0;
              right: 0;
              width: 45%;
              height: 50%;
            }
            &.imgs:nth-child(2) {
              bottom: 24px;
              left: 0;
              width: 52%;
              height: 65%;
            }

            img {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              width: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    .sec2-container {
      width: 100%;
      .sec2-inner {
        width: 100%;
        justify-content: center;
        margin: 0 auto;
        .sec2-content {
          width: 100%;
        }
      }
    }

    .sec2-images {
      display: none;
    }
  }

  .subtitle {
    font-size: 18px;
`;
