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
`;

export const DShowCase = styled.header`
  width: 100%;
  height: ${props => (props.height ? props.height : "90vh")};
  position: relative;
  background: url('${props =>
    props.background && props.background}') no-repeat center center/cover;

  background: ${props => props.bgcolor && props.bgcolor};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  padding-bottom: 50px;
  margin-bottom: 20px;

  h2,
  p {
    margin-bottom: 10px;
  }
  .btn {
    margin-top: 20px;
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

  &:hover {
    opacity: ${props => props.hovOpac && props.hovOpac};
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
    border-radius: ${props => (props.circle ? "40% 40% 10px 10px" : "20px")};
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 2px rgba(0, 0, 0, 0.2),
      0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.1),
      0 16px 16px rgba(0, 0, 0, 0.05);

    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: ${props => (props.circle ? "50%" : "20px")};
    }

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
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 2px rgba(0, 0, 0, 0.2),
    0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.1),
    0 16px 16px rgba(0, 0, 0, 0.05);

  img {
    width: 100%;
    height: ${props => (props.imgHeight ? props.imgHeight : "300px")};
    object-fit: cover;
    border-radius: inherit;
  }

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
  h2 {
    text-transform: uppercase;
  }
  p {
    margin: 10px 0 20px;
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
  margin: ${props => props.m && props.m};

  img {
    display: inline;
    margin: 0 auto;
    height: 100%;
    width: auto;
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
