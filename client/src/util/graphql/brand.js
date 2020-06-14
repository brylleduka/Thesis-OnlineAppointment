import gql from "graphql-tag";

const FETCH_BRANDS = gql`
  query brands {
    brands {
      _id
      image
      active
    }
  }
`;

const FETCH_BRAND = gql`
  query brand($id: ID!) {
    brand(_id: $id) {
      _id
      image
      active
    }
  }
`;

const FETCH_BRAND_ACTIVE = gql`
  query brandActive {
    brandActive {
      _id
      image
      active
    }
  }
`;

export { FETCH_BRANDS, FETCH_BRAND, FETCH_BRAND_ACTIVE };
