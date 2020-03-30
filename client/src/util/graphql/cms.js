import gql from "graphql-tag";

const FETCH_SHOWCASE = gql`
  query contentManagements($section: String) {
    contentManagements(section: $section) {
      _id
      photo
      section
      headline
      paragraph
    }
  }
`;

const FETCH_THE_SHOWCASE = gql`
  query homeCMS($sectionName: String) {
    homeCMS(sectionName: $sectionName) {
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

export { FETCH_SHOWCASE, FETCH_THE_SHOWCASE };
