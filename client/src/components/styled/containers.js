import styled from "styled-components";

const columns = {
  two: "repeat(2, 1fr)",
  three: "repeat(3, 1fr)",
  four: "repeat(4 , 1fr)",
  five: "repeat(5 , 1fr)",
  six: "repeat(6,1fr)"
};

const rows = {
  two: "repeat(2, 1fr)",
  three: "repeat(3, 1fr)",
  four: "repeat(4 , 1fr)",
  five: "repeat(5 , 1fr)",
  six: "repeat(6,1fr)"
};

export const DContainer = styled.div`
  width: 100%;
  margin: auto;
  background: rgba(242, 242, 242, 0.9);
  margin-top: 14vh;
`;

export const DShowCase = styled.header`
  width: 100%;
  height: ${props => (props.height ? props.height : "100vh")};
  position: relative;
  background: url('${props =>
    props.background && props.background}') no-repeat center center/cover;

  background: ${props => props.bgcolor && props.bgcolor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: center;


  h1,h2,
  p {
    
    margin-left: 48px;
  }
  .btn {
    margin-left: 48px;
  }

  img{
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
  background: ${props => (props.bg ? props.bg : "rgba(0, 0, 0, 0.15)")};
  border-radius: inherit;
  z-index: 1;
  display: ${props => props.flex && "flex"};
  justify-content: ${props => props.justify && props.justify};
  align-items: ${props => props.align && props.align};
  flex-flow: ${props => props.flow && props.flow};
  flex-direction: ${props => props.direct && props.direct};
  padding: ${props => props.pad && props.pad};
  cursor: ${props => props.pointer && "pointer"};
  opacity: ${props => props.opac && props.opac};
  transition: opacity 0.3s ease;

  overflow: hidden;

  &:hover {
    opacity: ${props => props.hovOpac && props.hovOpac};
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
    width: ${props => (props.cwidth ? props.cwidth : "50%")};
    text-align: left;
    margin: ${props => (props.cmarg ? props.cmarg : "0 24px")};
    h1,
    h2,
    h3,
    p {
      color: ${props => (props.color ? props.color : "#fff")};
      letter-spacing: 5px;
      line-height: 2;
    }
    h1 {
      font-size: ${props => (props.fs ? props.fs : "48px")};
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
  display: grid;
  grid-template-columns: ${props =>
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
  grid-gap: ${props => props.gap && props.gap};
  grid-template-rows: ${props =>
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
  margin: ${props => props.margin && props.margin};

  .card-content {
    border-radius: ${props => (props.circle ? "40% 40% 10px 10px" : "5px")};
    padding: 10px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 2px rgba(0, 0, 0, 0.2),
      0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.1),
      0 16px 16px rgba(0, 0, 0, 0.05);

    // img {
    //   width: 100%;
    //   height: 100%;
    //   object-fit: cover;
    //   border-radius: ${props => (props.circle ? "50%" : "20px")};
    // }

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

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const DCard = styled.div`
  position: relative;
  border-radius: 10px;
  padding: ${props => (props.p ? props.p : "10px")};
  height: ${props => (props.dh ? props.dh : "300px")};
  width: ${props => (props.dw ? props.dw : "250px")};
  display: ${props => props.flex && "flex"};
  justify-content: ${props =>
    props.justifyCenter
      ? "center"
      : props.justifyAround
      ? "space-around"
      : props.justifyBetween
      ? "space-between"
      : props.jusitfyFend
      ? "flex-end"
      : "flex-start"};

  align-items: ${props =>
    props.alignCenter
      ? "center"
      : props.alignAround
      ? "space-around"
      : props.alignBetween
      ? "space-between"
      : props.alignFend
      ? "flex-end"
      : "flex-start"};
  flex-direction: ${props => props.fcol && "column"};

  overflow: hidden;
  background: ${props => (props.bg ? props.bg : "#ffffff")};
  box-shadow: ${props =>
    props.bs
      ? props.bs
      : ("0 1px 1px rgba(0, 0, 0, 0.25)",
        "0 2px 2px rgba(0, 0, 0, 0.2)",
        "0 4px 4px rgba(0, 0, 0, 0.15)",
        "0 8px 8px rgba(0, 0, 0, 0.1)",
        "0 16px 16px rgba(0, 0, 0, 0.05)")};

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
  height: ${props => (props.height ? props.height : "400px")};
  width:  ${props => (props.width ? props.width : "100%")};;
  margin: ${props =>
    props.margin ? props.margin : props.mcenter ? "0 auto" : "0"};
  padding: ${props => props.pad && props.pad};
  background: url('${props =>
    props.background && props.background}') no-repeat center center/cover;
  background-attachment: ${props => props.fixed && "fixed"};
  background: ${props => props.bgcolor && props.bgcolor};
  display: ${props => props.flex && "flex"};
  justify-content: ${props => props.justify && props.justify};
  align-items: ${props => props.align && props.align};
  flex-flow: ${props => props.flow && props.flow};
  flex-direction: ${props => props.direct && props.direct};
  position: relative;
`;

export const Content = styled.div`
  height: ${props => props.height && props.height};
  width: ${props => (props.width ? props.width : props.fluid ? "100%" : "50%")};
  padding: ${props => props.pad && props.pad};

  display: ${props => props.flex && "flex"};
  justify-content: ${props => props.justify && props.justify};
  align-items: ${props => props.align && props.align};
  flex-flow: ${props => props.flow && props.flow};
  flex-direction: ${props => props.direct && props.direct};
  letter-spacing: 2px;
  position: relative;
  margin: ${props => props.margin && props.margin};
  background: ${props => props.bgcolor && props.bgcolor};
  border-radius: ${props => props.rounded && "10px"};
  z-index: 2;
  font-weight: ${props => props.weight && props.weight};
  h2 {
    text-transform: uppercase;
  }
  p {
    margin: 10px 0 20px;
  }
  .content-edit {
    color: ${({ theme }) => theme.blue};
    &:hover {
      color: ${({ theme }) => theme.bluer};
      cursor: pointer;
    }
  }

  img {
    max-height: ${props => (props.imgHeight ? props.imgHeight : "300px")};
    width: ${props => (props.imgWidth ? props.imgWidth : "100%")};
    border-radius: ${props => props.circle && "50%"};
    object-fit: contain;
  }
`;

export const DImage = styled.div`
  height: ${props => (props.height ? props.height : "300px")};
  width: ${props => (props.width ? props.width : "auto")};
  position: relative;
  overflow: hidden;
  border-radius: ${props =>
    props.circle ? "50%" : props.rounded ? "20px" : "0"};
  margin: ${props => (props.m ? props.m : "0 auto")};

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
  visibility: hidden;
  height: 100vh;
  margin: 32px 0;
  width: 90%;
  .sec2-container {
    width: 100%;
    min-width: 90%;
    margin: 0 auto;

    .sec2-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 24px;
      height: 100vh;

      .sec2-content {
        width: 50%;

        .sec2-content_inner {
          width: 400px;
          margin: 0 auto;
          color: #323232;
          h1 {
            font-weight: 500;
            font-size: 32px;
            margin-bottom: 24px .sec2-content_line {
              margin: 0;
              height: 44px;
              overflow: hidden;
            }
          }
          p {
            font-size: 14px;
            line-height: 24px;
            padding-right: 48px;
            margin-bottom: 56px;
          }
        }
      }
      .sec2-images {
        width: 50%;
        height: 100vh;
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
            }
          }
        }
      }
    }
  }
`;
