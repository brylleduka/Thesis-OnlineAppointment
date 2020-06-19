import styled, { css } from "styled-components";

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
  background-position: calc(100% - 20%) calc(100% + 20vh);
  background-size: cover;
  background-attachment: fixed;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: center;

  // h1,
  // h2,
  // p {
  //   margin-left: 48px;
  // }
  // .btn {
  //   margin-left: 48px;
  // }

  img {
    height: 100%;
    width: auto;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 100%;
    background-position: calc(100% - 30%) calc(100% + 15vh);
    align-items: center;
    text-align: center;

    h1,
    h2,
    p {
      margin-left: 0px;
    }
    h1,
    h2 {
      font-size: 14px;
    }
    p {
      font-size: 12px;
    }
    button {
      margin-left: 0px;
      font-size: 14px;
      padding: 0.5em 0.8em;
    }
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
  background-size: ${(props) => (props.bgsize ? props.bgsize : "cover")};
  background-attachment: fixed;

  display: ${(props) => props.flex && "flex"};
  justify-content: ${(props) => props.justify && props.justify};
  align-items: ${(props) => props.align && props.align};
  flex-flow: ${(props) => props.flow && props.flow};
  flex-direction: ${(props) => props.direct && props.direct};
  position: relative;

  ${(props) =>
    props.minh &&
    css`
      min-height: ${props.minh};
    `};
  ${(props) =>
    props.maxh &&
    css`
      min-height: ${props.maxh};
    `};

  ${(props) =>
    props.minw &&
    css`
      min-height: ${props.minw};
    `};
  ${(props) =>
    props.maxw &&
    css`
      min-height: ${props.maxw};
    `};

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
  display: ${(props) => (props.flex ? "flex" : "block")};
  justify-content: ${(props) => props.justify && props.justify};
  align-items: ${(props) => props.align && props.align};
  flex-direction: ${(props) => props.direct && props.direct};
  letter-spacing: 2px;
  position: relative;
  margin: ${(props) => props.margin && props.margin};
  background: url('${(props) =>
    props.background && props.background}') no-repeat center center/cover;
  background-attachment: ${(props) => props.fixed && "fixed"};
  background-color: ${(props) => props.bgcolor && props.bgcolor};
  border-width: ${(props) => props.bordered && "1px"};
  border-style: ${(props) => props.bordered && "solid"};
  border-color: ${(props) =>
    props.bordbtm && "transparent transparent #ccc transparent"};
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

  ${(props) =>
    props.minh &&
    css`
      min-height: ${props.minh};
    `};

  ${(props) =>
    props.maxh &&
    css`
      max-height: ${props.maxh};
    `};

  ${(props) =>
    props.flow &&
    css`
      flex-flow: ${props.flow};
    `};

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

  visibility: visible;
  pointer-events: all;
  transition: visibility 200ms, opacity 0.3s ease-in-out;

  ${(props) =>
    props.invisible &&
    css`
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
    `};

  ${(props) =>
    props.hoverflow &&
    css`
      &:hover {
        overflow: auto;
      }
    `};


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
      ? "linear-gradient(270deg, rgba(0,0,0,0.4) 10%, rgba(255,255,255,0) 100%)"
      : props.bgl
      ? "linear-gradient(90deg, rgba(0,0,0,0.4) 10%, rgba(255,255,255,0) 100%)"
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
  transition: opacity 0.6s ease;
  overflow: hidden;

  &:hover {
    opacity: ${(props) => props.hovOpac && props.hovOpac};
  }

  .overlay-box {
    width: ${(props) => (props.initbox ? "110%" : "0")};
    height: 110%;
    margin: 0 auto;
    transform: rotate(45deg);
    transform-origin: center;
    transition: width 0.4s ease-in-out;

    .overlay-box__content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100%;
      width: 85%;
      text-align: center;
      margin: auto;
      transform: rotate(-45deg);

      .title {
        text-transform: uppercase;
        margin: 1px auto;
      }
      p {
        height: auto;
        font-size: 11px;
      }

      .title,
      p {
        letter-spacing: 2px;
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
    width: ${(props) => (props.cwidth ? props.cwidth : "auto")};
    text-align: ${(props) => (props.talign ? props.talign : "left")};
    height: auto;
    margin: ${(props) => (props.cmarg ? props.cmarg : "0 38px")};
    padding: 10px 40px;

    .title-container {
      position: relative;
      width: auto;

      .title_logo {
        position: absolute;
        top: -26px;
        right: -12px;
      }

      .title {
        font-weight: 700;
        text-transform: uppercase;
        font-size: 52px;
        letter-spacing: 4px;
        text-shadow: 0.4px 0.4px 0.4px rgba(255, 255, 255, 0.6);
      }
    }

    .subtitle {
      font-size: 22px;
    }

    .subtitle,
    .paragraph {
      font-weight: 500;
    }
  }

  @media (max-width: 1024px) {
    display: flex;
    justify-content: center;
    align-items: center;

    .overlay-content {
      min-width: 90%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0;

      .title-container {
        .title {
          font-size: 38px;
        }
        .title_logo {
          position: absolute;
          top: -27px;
          right: -15px;
        }
      }
    }
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
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
  cursor: pointer;

  img {
    display: inline;
    margin: 0 auto;
    height: 100%;
    width: 100%;
    object-fit: ${(props) => (props.objFit ? props.objFit : "cover")};
    transition: all 0.6s ease-in-out;
    ${(props) =>
      props.grayscaling &&
      css`
        filter: grayscale(100%);
      `}
  }
`;

export const DCard = styled.div`
  position: relative;
  border-radius: ${(props) =>
    props.rad ? props.rad : props.circle ? "50%" : "10px"};
  border-top: ${(props) => (props.bordtop ? props.bordtop : "none")};
  border-color: ${(props) =>
    props.bordcolor ? props.bordcolor : "transparent"};
  padding: ${(props) => (props.p ? props.p : "10px")};
  height: ${(props) => (props.dh ? props.dh : "300px")};
  width: ${(props) => (props.dw ? props.dw : "250px")};
  cursor: ${(props) => props.pointer && "pointer"};
  display: ${(props) => props.flex && "flex"};
  margin: ${(props) => (props.mcenter ? "0 auto" : props.margin)};
  justify-content: ${(props) =>
    props.justifyCenter
      ? "center"
      : props.justifyAround
      ? "space-around"
      : props.justifyBetween
      ? "space-between"
      : props.jusitfyEnd
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
  flex-direction: ${(props) => (props.fcol ? "column" : "row")};

  ${(props) =>
    props.maxh &&
    css`
      max-height: ${props.maxh};
    `};

  overflow: ${(props) => (props.overf ? "visible" : "hidden")};
  background: ${(props) => (props.bg ? props.bg : "#ffffff")};
  box-shadow: ${(props) =>
    props.bs
      ? props.bs
      : ("0 1px 1px rgba(0, 0, 0, 0.12)",
        "0 2px 2px rgba(0, 0, 0, 0.12)",
        "0 4px 4px rgba(0, 0, 0, 0.12)")};

  .card-details {
    padding: 0 10px;
    margin: 16px 0;

    h3 {
      margin-bottom: 5px;
    }
    p {
      font-size: 13px;
    }
  }

  a {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
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
  ${(props) =>
    props.grayzoom &&
    css`
      &:hover {
        ${DImage} {
          img {
            filter: grayscale(0);
            transform: scale(1.2);
          }
        }
      }
    `}

  ${(props) =>
    props.overlaying &&
    css`
      &:hover {
        ${Overlay} {
          opacity: 0;
          pointer-events: none;
        }
      }
    `}

    ${(props) =>
      props.hoverflow &&
      css`
        &:hover {
          overflow: auto;
        }
      `};
`;

export const DFooterLinks = styled.section`
  background: ${({ theme }) => theme.dark};
  color: ${({ theme }) => theme.light};
  font-size: 12px;
  padding: 35px 0;
  width: 100%;
  overflow: hidden;

  .footer-container {
    width: 95%;
    margin: 0 auto;
    padding: 0 20px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 20px;
    font-weight: 500;

    .branding {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      p {
        font-size: 12px;
        letter-spacing: 1.5px;
      }

      .brand-content {
        width: 100%;
        display: flex;
        align-items: center;

        h3 {
          font-size: 22px;
        }

        .brand-container {
          width: 80px;
          height: 100%;
          margin-right: 5px;

          .brand {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: grayscale(100%) brightness(0%) invert(100%);
            -webkit-filter: grayscale(100%) brightness(0%) invert(100%);
            -moz-filter: grayscale(100%) brightness(0%) invert(100%);
          }
        }
      }
    }

    .inner-links {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px;

      .logo-ig {
        color: transparent !important;
        background: -webkit-radial-gradient(
          30% 107%,
          circle,
          #fdf497 0%,
          #fdf497 5%,
          #fd5949 45%,
          #d6249f 60%,
          #285aeb 90%
        ) !important;
        background: -o-radial-gradient(
          30% 107%,
          circle,
          #fdf497 0%,
          #fdf497 5%,
          #fd5949 45%,
          #d6249f 60%,
          #285aeb 90%
        ) !important;
        background: radial-gradient(
          circle at 30% 107%,
          #fdf497 0%,
          #fdf497 5%,
          #fd5949 45%,
          #d6249f 60%,
          #285aeb 90%
        ) !important;
        background: -webkit-radial-gradient(
          circle at 30% 107%,
          #fdf497 0%,
          #fdf497 5%,
          #fd5949 45%,
          #d6249f 60%,
          #285aeb 90%
        ) !important;
        background-clip: text !important;
        -webkit-background-clip: text !important;
      }

      li {
        line-height: 2.8;
      }

      a {
        font-weight: 500;
        letter-spacing: 2px;
        color: #fff;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    @media (max-width: 1024) {
      grid-template-columns: repeat(2, 1fr);
      .branding {
        h2 {
          font-size: 38px;
          word-wrap: break-word;
        }
      }

      .inner-links {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      .inner-links {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
`;

export const DFooter = styled.footer`
  background: ${({ theme }) => theme.dark};
  font-size: 12px;
  padding: 20px 0;
  color: ${({ theme }) => theme.light};

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
