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

export { FETCH_THE_SHOWCASE, FETCH_HOME_SECTION };
