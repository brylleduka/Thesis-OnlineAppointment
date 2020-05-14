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
        image
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
        image
        height
        width
      }
      createdAt
      updatedAt
    }
  }
`;

export { FETCH_GALLERIES, FETCH_GALLERY };
