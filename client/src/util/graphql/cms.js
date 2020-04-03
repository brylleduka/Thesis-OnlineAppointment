import gql from "graphql-tag";

const FETCH_THE_SHOWCASE = gql`
  query showcaseCMS($sectionName: String) {
    showcaseCMS(sectionName: $sectionName) {
      _id
      content {
        _id
        title
        subtitle
        paragraph
        bgImg
        bgColor
        position
        dark
      }
    }
  }
`;

const FETCH_HOME_SECTION = gql`
  query homeCMS($sectionName: String) {
    homeCMS(sectionName: $sectionName) {
      _id
      title
      subtitle
      paragraph
      bgImg
      bgColor
      grid
      dark
      alt
    }
  }
`;

const FETCH_ABOUT_CMS = gql`
  query aboutUsCMS($contentName: String) {
    aboutUsCMS(contentName: $contentName) {
      _id
      title
      subtitle
      paragraph
      bgImg
      bgColor
      dark
      overlay
      story {
        _id
        title
        subtitle
        paragraph
        alt
      }
      mission {
        _id
        title
        subtitle
        paragraph
        alt
      }
    }
  }
`;

export { FETCH_THE_SHOWCASE, FETCH_HOME_SECTION, FETCH_ABOUT_CMS };
