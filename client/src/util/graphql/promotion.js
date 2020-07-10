import gql from "graphql-tag";

const FETCH_PROMOTIONS = gql`
  query promotions {
    promotions {
      _id
      title
      subtitle
      description
      photo
      imageURL
      bgColor
      active
    }
  }
`;

const FETCH_PROMOTION_ACTIVES = gql`
  query promotionActives($active: Boolean) {
    promotionActives(active: $active) {
      _id
      title
      subtitle
      description
      photo
      imageURL
      bgColor
      active
    }
  }
`;

const FETCH_PROMOTION = gql`
  query promotion($promoId: ID) {
    promotion(_id: $promoId) {
      _id
      title
      subtitle
      description
      photo
      imageURL
      bgColor
      active
    }
  }
`;

export { FETCH_PROMOTIONS, FETCH_PROMOTION_ACTIVES, FETCH_PROMOTION };
