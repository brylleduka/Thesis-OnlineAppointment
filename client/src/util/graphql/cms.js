import gql from "graphql-tag";

const FETCH_THE_SHOWCASE = gql`
  query homeCMS($sectionName: String) {
    homeCMS(sectionName: $sectionName) {
      _id
      title
      subtitle
      alt
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

const FETCH_ABOUT_SECTION = gql`
  query homeCMS($sectionName: String) {
    homeCMS(sectionName: $sectionName) {
      _id
      title
      subtitle
      alt
    }
  }
`;

export { FETCH_THE_SHOWCASE, FETCH_ABOUT_SECTION };
