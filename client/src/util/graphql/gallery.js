import gql from "graphql-tag";

const FETCH_GALLERIES = gql`
  query galleries($active: Boolean) {
    galleries(active: $active) {
      _id
      title
      active
      photos {
        _id
        name
        caption
        src
        imageURL
        height
        width
      }
      createdAt
      updatedAt
    }
  }
`;

const FETCH_GALLERY = gql`
  query gallery($id: ID!, $active: Boolean) {
    gallery(_id: $id, active: $active) {
      _id
      title
      active
      photos {
        _id
        name
        caption
        src
        imageURL
        height
        width
      }
      createdAt
      updatedAt
    }
  }
`;

export { FETCH_GALLERIES, FETCH_GALLERY };
