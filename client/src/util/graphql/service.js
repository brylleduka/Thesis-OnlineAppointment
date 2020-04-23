import gql from "graphql-tag";

const FETCH_ALL_CATEGORIES_QUERY = gql`
  query categories {
    categories {
      _id
      name
      description
      photo
      services {
        _id
        name
        price
        duration
        description
        photo
      }
      employees {
        _id
        empId
        title
        firstName
        lastName
      }
    }
  }
`;

const FETCH_CATEGORY_QUERY = gql`
  query category($categoryId: ID!) {
    category(_id: $categoryId) {
      _id
      name
      description
      photo
      services {
        _id
        name
        price
        duration
        description
        photo
      }
      employees {
        _id
        title
        empId
        firstName
        lastName
        email
        contact
      }
    }
  }
`;

// END-CATEGORIES

// SERVICES

const FETCH_ALL_SERVICES_QUERY = gql`
  query allServices {
    allServices {
      _id
      name
      duration
      price
      photo
      description
      category {
        _id
        name
      }
    }
  }
`;

const FETCH_SERVICES_QUERY = gql`
  query services($categoryId: ID) {
    services(categoryId: $categoryId) {
      _id
      name
      duration
      price
      description
      photo

      category {
        _id
        name
        description
      }
    }
  }
`;

const FETCH_SINGLE_SERVICE_QUERY = gql`
  query service($serviceId: ID!) {
    service(_id: $serviceId) {
      _id
      name
      duration
      price
      description
      photo

      category {
        _id
        name
      }
    }
  }
`;

// END _ SERVICES

export {
  FETCH_ALL_SERVICES_QUERY,
  FETCH_ALL_CATEGORIES_QUERY,
  FETCH_CATEGORY_QUERY,
  FETCH_SERVICES_QUERY,
  FETCH_SINGLE_SERVICE_QUERY,
};
