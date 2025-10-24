import React from "react";
import * as ReactDOM from "react-dom/client";
// import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { ApolloProvider } from "@apollo/client/react";

import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

// const client = new ApolloClient({
//   link: new HttpLink({ uri: "http://localhost:4000/graphql"}),
//   cache: new InMemoryCache(),
// });

// const httpLink = new HttpLink({
//   uri: "http://localhost:4000/graphql",
// });

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql",
  })
);


const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query GetBlogs {
//           id
//           title
//           content
//           author
//       }
//     `,
//   })
//   .then((result) => console.log(result));

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>
);