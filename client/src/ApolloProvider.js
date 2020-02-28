import React from "react";
import App from "./App";

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

import { createUploadLink } from "apollo-upload-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";

const uploadLink = createUploadLink({
  uri: "/graphql"
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  const employeeToken = localStorage.getItem("jwtTokenEmployee");
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  if (employeeToken) {
    return {
      headers: {
        Authorization: `Basic ${employeeToken}`
      }
    };
  }
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
