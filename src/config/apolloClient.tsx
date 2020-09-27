import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AsyncStorage } from "react-native";
import { ASYNC_STORAGE_ITEMS } from "../lib/constants";

const httpLink = new HttpLink({
  // uri: "https://backend-qmobility.azurewebsites.net/graphql/",
  uri: "https://1145e7756992.ngrok.io/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const userToken = await AsyncStorage.getItem(ASYNC_STORAGE_ITEMS.USER_TOKEN);

  return {
    headers: {
      ...headers,
      Authorization: userToken ? `Bearer ${userToken}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;
