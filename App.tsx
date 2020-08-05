import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";

import client from "./src/config/apolloClient";
import Router from "./src/navigation/Router";
import LoadAssets from "./src/lib/LoadAssets";
import { ThemeProvider } from "@shopify/restyle";
import theme from "./src/config/Theme";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider {...{ theme }}>
        <LoadAssets>
          <Router />
        </LoadAssets>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
