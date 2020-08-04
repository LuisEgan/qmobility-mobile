import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";

import client from "./src/config/apolloClient";
import Router from "./src/navigation/Router";
import LoadAssets from "./src/lib/LoadAssets";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <LoadAssets>
        <Router />
      </LoadAssets>
    </ApolloProvider>
  );
};

export default App;
