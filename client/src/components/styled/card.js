import styled from "styled-components";

export const JCard = styled.figure`
  background-color: #fff;
  color: #ffffff;
  font-size: 16px;
  max-width: 100%;
  min-width: 90%;
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "auto")};
  overflow: hidden;
  position: relative;
  text-align: left;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  font-size: 12px;
  margin: 24px auto;

  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.45s ease;
    transition: all 0.45s ease;
  }

  img {
    backface-visibility: hidden;
    max-width: 100%;
    height: 100%;
    vertical-align: top;
    object-fit: cover;
  }

  &:before,
  &:after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: "";
    background-color: #fe8c00;
    opacity: 0.5;
    -webkit-transition: all 0.45s ease;
    transition: all 0.45s ease;
  }

  &:before {
    -webkit-transform: skew(30deg) translateX(-80%);
    transform: skew(30deg) translateX(-80%);
  }

  &:after {
    -webkit-transform: skew(-30deg) translateX(-70%);
    transform: skew(-30deg) translateX(-70%);
  }

  figcaption {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 1;
    bottom: 0;
    padding: 25px 40% 25px 20px;

    &::before,
    &::after {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #2193b0;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
      content: "";
      opacity: 0.5;
      z-index: -1;
    }

    &::before {
      -webkit-transform: skew(30deg) translateX(-100%);
      transform: skew(30deg) translateX(-100%);
    }

    &::after {
      -webkit-transform: skew(-30deg) translateX(-90%);
      transform: skew(-30deg) translateX(-90%);
    }

    h3,
    p {
      margin: 0;
      opacity: 0;
      letter-spacing: 1px;
    }

    h3 {
      font-size: ${(props) => (props.titleSize ? props.titleSize : "36px")};
      font-weight: 700;
      line-height: 1em;
      text-transform: uppercase;
    }

    p {
      font-size: 1em;
    }
  }

  &:hover h3,
  &.hover h3,
  &:hover p,
  &.hover p {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 0.9;
    -webkit-transition-delay: 0.2s;
    transition-delay: 0.2s;
  }

  &:hover:before,
  &.hover:before {
    -webkit-transform: skew(30deg) translateX(-20%);
    transform: skew(30deg) translateX(-20%);
    -webkit-transition-delay: 0.05s;
    transition-delay: 0.05s;
  }

  &:hover:after,
  &.hover:after {
    -webkit-transform: skew(-30deg) translateX(-10%);
    transform: skew(-30deg) translateX(-10%);
  }

  &:hover figcaption:before,
  &.hover figcaption:before {
    -webkit-transform: skew(30deg) translateX(-40%);
    transform: skew(30deg) translateX(-40%);
    -webkit-transition-delay: 0.15s;
    transition-delay: 0.15s;
  }

  &:hover figcaption:after,
  &.hover figcaption:after {
    -webkit-transform: skew(-30deg) translateX(-30%);
    transform: skew(-30deg) translateX(-30%);
    -webkit-transition-delay: 0.1s;
    transition-delay: 0.1s;
  }

  a {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
`;

export const JCard2 = styled.div`
    position: relative;
    z-index: 1;
    display: block;
    background: #fff;
    max-width: 100%;
    min-width: 240px;
    height: 400px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: ${(props) =>
      props.bs
        ? props.bs
        : ("0 1px 1px rgba(0, 0, 0, 0.22)",
          "0 2px 2px rgba(0, 0, 0, 0.22)",
          "0 4px 4px rgba(0, 0, 0, 0.22)",
          "0 6px 8px rgba(0, 0, 0, 0.22)",
          "0 8px 16px rgba(0, 0, 0, 0.22)")};

    .thumbnail {
      width: 100%;
      height:100%;
      overflow: hidden;
      border-radius: 10px 10px 0 0;
      background: #eee;
      img {
        display: block;
        width: 100%;
        height: 100%;
       object-fit: cover;
      }
    }

 
    .post-content {
      position: absolute;
      bottom: 0;
      background: #fff;
      width: 100%;
      padding: 10px;
      border-radius: 0 0 10px 10px;
      .category {
        position: absolute;
        top: -40px;
        left: 0;
        background: ${({ theme }) => theme.secondary};
        padding: 10px 15px;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
      }
      .title {
        color: #ccc;
        font-size: 16px;
        font-weight: 400;
        text-transform: uppercase;
      }
      .sub_title {
        margin: 0;
        padding: 0 0 20px;
        color: ${({ theme }) => theme.secondary};
        font-size: 16px;
        font-weight: 400;
      }

      .description {
          height: 10px;
          margin-top: 12px;
         
          &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            background-color: #f5f5f5;
          }

          &::-webkit-scrollbar {
            width: 10px;
            background-color: #f5f5f5;
          }
          &::-webkit-scrollbar-thumb {
            background-image: -webkit-gradient(
              linear,
              left bottom,
              left top,
              color-stop(0.44, rgb(122, 153, 217)),
              color-stop(0.72, rgb(73, 125, 189)),
              color-stop(0.86, rgb(28, 58, 148))
            );
          }
        
          p{
            color: #232323;
            font-size: 14px;
            line-height: 1.8em;
            opacity: 0;
            
            pointer-events: none;
            transition: all 0.45s ease;
            &:first-of-type {
              margin-top: 1.25rem;
              &:before {
                content: "";
                position: absolute;
                height: 5px;
                background: ${({ theme }) => theme.blue};
                width: 35px;
                top: -0.75rem;
                border-radius: 3px;
              }
            }
          }
        
        }
     
      }
    }

    &:hover {
      .thumbnail {
        background-color: #000;
    
        img {
          -webkit-transform: scale(1.1);
          -moz-transform: scale(1.1);
          transform: scale(1.1);
          opacity: 0.8;
          transition: all 0.8s ease-in;
        }
        transition: all 0.8s ease-in-out;

      }
      .post-content{
        .description{
          height: 175px;
          transition: height 0.6s ease-in-out;
          overflow: ${(props) => props.oflow && "auto"};
          p{
            cursor: default;
            pointer-events: auto;
            -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 0.9;
            -webkit-transition-delay: 0.6s;
            transition-delay: 0.6s;
          }
         
        }
        
      }
     

    }
  
`;

export const JCard3 = styled.div`
  .description {
    height: 100%;
    width: 100%;
    padding: 1rem;
    background: #fff;
    z-index: 1;

    h1 {
      line-height: 1;
      margin: 0;
      font-size: 1.7rem;
    }
    h4 {
      font-size: 1rem;
      font-weight: 300;
      text-transform: capitalize;
      color: #a2a2a2;
      margin-top: 5px;
    }

    p {
      position: relative;
      margin: 1rem 0 0;
      font-size: 16px;
      &:first-of-type {
        margin-top: 1.25rem;
        &:before {
          content: "";
          position: absolute;
          height: 5px;
          background: ${({ theme }) => theme.blue};
          width: 35px;
          top: -0.75rem;
          border-radius: 3px;
        }
      }
    }
  }
`;

export const JCard4 = styled.figure`
  position: relative;
  margin: 10px;
  min-width: 230px;
  max-width: 315px;
  width: 100%;
  height: ${(props) => props.height && props.height};
  color: #000000;
  text-align: center;
  line-height: 1.4em;
  font-size: 14px;

  & * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .profile-image {
    display: inline-block;
    width: 250px;
    height: 300px;
    z-index: 1;
    position: relative;
    margin: ${(props) => props.margin && props.margin};
    top: ${(props) => props.top && props.top};
    right: ${(props) => props.right && props.right};
    bottom: ${(props) => props.bottom && props.bottom};
    left: ${(props) => props.left && props.left};
    padding: 10px;
    border: 2px solid #6dd5ed;

    img {
      width: 100%;
      height: 100%;
      vertical-align: top;
      object-fit: cover;
    }
  }

  &:hover {
    cursor: pointer;
    .profile-image {
      border-color: #2193b0;
    }
    figcaption {
      box-shadow: ${(props) =>
        props.bs
          ? props.bs
          : ("0 1px 1px rgba(0, 0, 0, 0.22)",
            "0 2px 2px rgba(0, 0, 0, 0.22)",
            "0 4px 4px rgba(0, 0, 0, 0.22)",
            "0 6px 8px rgba(0, 0, 0, 0.22)",
            "0 8px 16px rgba(0, 0, 0, 0.22)")};
    }
  }

  figcaption {
    width: 100%;
    height: 250px;
    background-color: #ffffff;
    color: #555;
    padding: 125px 25px 25px;
    margin-top: -100px;
    display: inline-block;
    box-shadow: ${(props) =>
      props.bs
        ? props.bs
        : ("0 1px 1px rgba(0, 0, 0, 0.11)",
          "0 2px 2px rgba(0, 0, 0, 0.11)",
          "0 4px 4px rgba(0, 0, 0, 0.11)",
          "0 6px 8px rgba(0, 0, 0, 0.11)",
          "0 8px 16px rgba(0, 0, 0, 0.11)")};

    h3,
    h4,
    p {
      margin: 0 0 5px;
    }

    h3 {
      font-weight: 600;
      font-size: 1.3em;
    }

    h4 {
      color: #8c8c8c;
      font-weight: 400;
      letter-spacing: 2px;
    }

    p {
      font-size: 0.9em;
      letter-spacing: 1px;
      opacity: 0.9;
    }

    .icons {
      text-align: center;
      width: 100%;
    }
  }
  .linkToPage {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
`;

export const DTestimonialCard = styled.div`
  margin: 0 auto;
  padding: 10px;
  outline: 0;
  border: 0;
  position: relative;
  width: ${(props) => (props.width ? props.width : "100%")};

  figure {
    position: relative;
    float: left;
    overflow: hidden;
    margin: 0 auto;
    min-width: 90%;
    max-width: 100%;
    width: 100%;
    color: #000000;
    text-align: center;
    font-size: 16px;
    background: #2193b0;
    background: -webkit-linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.4),
      rgba(33, 147, 176, 0.7)
    );
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.4),
      rgba(33, 147, 176, 0.7)
    );

    padding: 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    & *,
    & *::before,
    & *::after {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-transition: all 0.35s ease;
      transition: all 0.35s ease;
    }

    .profile {
      width: 100px;
      height: 100px;
      border-radius: 100%;
      display: inline-block;
      position: relative;
      overflow: hidden;
      -webkit-box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.4);
      box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.4);
      margin-bottom: 10px;
      border: solid 5px #fe8c00;
      border-color: ${({ theme }) => theme.blue};

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    figcaption {
      position: relative;
      width: 100%;

      h5,
      h4,
      blockquote {
        margin: 0;
      }

      h5,
      h4 {
        text-transform: uppercase;
        font-weight: 500;
      }

      h4 {
        color: #274046;
      }

      h4,
      h5 {
        color: ${(props) =>
          props.inverted
            ? ({ theme }) => theme.light
            : ({ theme }) => theme.dark};
      }

      blockquote {
        font-size: 1em;
        padding: 45px 20px 40px 50px;
        margin-top: 30px;
        background: #ffffff;
        border-radius: 5px;
        -webkit-box-shadow: inset -1.4px -1.4px 2px rgba(0, 0, 0, 0.3);
        box-shadow: inset -1.4px -1.4px 2px rgba(0, 0, 0, 0.3);
        text-align: left;
        position: relative;

        color: ${(props) =>
          props.inverted
            ? ({ theme }) => theme.light
            : ({ theme }) => theme.dark};

        &::before,
        &::after {
          font-family: "FontAwesome";
          position: absolute;
          font-size: 22px;
          opacity: 0.25;
          color: ${(props) =>
            props.inverted
              ? ({ theme }) => theme.light
              : ({ theme }) => theme.dark};
        }

        &::before {
          content: "\f10d";
          top: 20px;
          left: 20px;
        }
        &::after {
          content: "\f10e";
          bottom: 10px;
          right: 20px;
        }
      }
    }
  }

  ${(props) =>
    props.basic &&
    "figure{background: transparent; figcaption{blockquote{box-shadow: none; background: transparent}}}"}
`;

export const GalleryCard = styled.div`
  position: relative;
  flex: 0 1 15rem;
  background-color: #fff;
  padding-bottom: 5rem;
  transition: background-color 0.2s cubic-bezier(0.5, 0.3, 0.8, 0.06);
  color: #000;
  margin: 3px;
  .thumb {
    position: relative;
    width: 15rem;
    height: 10rem;
    perspective-origin: 50% 0%;
    perspective: 600px;
    z-index: 1;

    &-image,
    &-shadow {
      position: absolute;
      display: block;
      width: 15rem;
      height: 10rem;
      transition: all 0.2s cubic-bezier(0.42, 0, 0.58, 1);
    }

    &-shadow {
      opacity: 0.8;
    }
    &-shadow:nth-child(1) {
      opacity: 0.6;
      background-color: ${({ theme }) => theme.primary};
      transition: all 0.2s cubic-bezier(0.42, 0, 0.58, 1) 0.07s;
    }

    &-shadow:nth-child(2) {
      opacity: 0.7;
      background-color: ${({ theme }) => theme.blue};
      transition: all 0.2s cubic-bezier(0.42, 0, 0.58, 1) 0.05s;
    }

    &-shadow:nth-child(3) {
      background-color: ${({ theme }) => theme.bluer};
      transition: all 0.2s cubic-bezier(0.42, 0, 0.58, 1) 0.03s;
    }

    &-image {
      position: relative;
      background-image: url(${(props) => props.background && props.background});
      background-size: auto 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-color: #607d8b;
      &::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #3f51b5;
        content: "";
        opacity: 0;
        transition: opacity 0.1s;
      }
    }
  }

  .title,
  .explore {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 5rem;
    text-align: center;
    font-weight: 500;
    transition: all 0.2s cubic-bezier(0.5, 0.3, 0.8, 0.06);
  }

  .title span,
  .explore span {
    padding: 0.5rem;
    flex: 1 1 auto;
    text-align: center;
  }

  .explore {
    opacity: 0;
    transform: translate(0, -1rem);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #673ab7;
  }

  .btn {
    position: absolute;
    left: 50%;
    top: 5rem;
    padding: 0.5rem 1rem;
    background-color: #fff;
    border-radius: 2rem;
    border: 2px solid #3f51b5;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    transform: translate(-50%, 2rem);
    cursor: pointer;
    transition: all 0.2s;
    opacity: 0;
    outline: none;
    z-index: 4;
  }

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }

  &:hover .thumb {
    z-index: 3;
  }

  &:hover .title {
    opacity: 0;
  }

  &:hover .explore {
    opacity: 1;
    transform: translate(0, 1rem);
    transition: all 0.2s cubic-bezier(0.42, 0, 0.58, 1) 0.1s;
  }

  &:hover .thumb-image {
    transform: scale(1.05) translate(0, -1rem) rotateX(25deg);
  }

  &:hover .thumb-image::before {
    opacity: 0.4;
  }

  &:hover .thumb-shadow:nth-child(3) {
    transform: scale(1.02) translate(0, -0.3rem) rotateX(15deg);
  }

  &:hover .thumb-shadow:nth-child(2) {
    transform: scale(0.9) translate(0, 1rem) rotateX(15deg);
  }

  &:hover .thumb-shadow:nth-child(1) {
    transform: scale(0.82) translate(0, 2.4rem) rotateX(5deg);
  }

  &:hover .btn {
    opacity: 1;
    color: #3f51b5;
    transform: translate(-50%, 0);
  }

  &:hover .btn:hover {
    color: #fff;
    background-color: #3f51b5;
  }

  a {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 5;
  }
`;
