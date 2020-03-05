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

export { FETCH_SHOWCASE };
