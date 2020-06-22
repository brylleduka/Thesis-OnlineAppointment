import gql from "graphql-tag";

const FETCH_ALL_CATEGORIES_QUERY = gql`
  query categories($active: Boolean) {
    categories(active: $active) {
      _id
      name
      description
      photo
      imageURL
      services {
        _id
        name
        price
        duration
        description
        photo
        imageURL
        active
      }
      employees {
        _id
        empId
        title
        firstName
        lastName
        role
        active
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
      imageURL
      services {
        _id
        name
        price
        duration
        description
        photo
        imageURL
        active
      }
      employees {
        _id
        title
        empId
        firstName
        lastName
        email
        contact
        role
        active
      }
    }
  }
`;

// END-CATEGORIES

// SERVICES

const FETCH_ALL_SERVICES_QUERY = gql`
  query allServices($active: Boolean) {
    allServices(active: $active) {
      _id
      name
      duration
      price
      photo
      imageURL
      description
      active
      category {
        _id
        name
      }
    }
  }
`;

const FETCH_SERVICES_QUERY = gql`
  query services($categoryId: ID, $active: Boolean) {
    services(categoryId: $categoryId, active: $active) {
      _id
      name
      duration
      price
      description
      photo
      imageURL
      active
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
      imageURL
      active
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
