import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const link = new HttpLink({
  uri: "localhost",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
