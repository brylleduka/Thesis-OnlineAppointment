import gql from "graphql-tag";

export const FETCH_CONTACT_INFO = gql`
  query contact {
    contact {
      _id
      address
      lat
      lng
      mapKey
      phone
      mobile
    }
  }
`;
