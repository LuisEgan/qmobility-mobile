import { gql } from "@apollo/client";

const user = gql`
  query User {
    user {
      id
      name
      lastname
      dateOfBirth
      avatarUrl
    }
  }
`;

export default {
  user,
};
