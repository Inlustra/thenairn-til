import { gql } from "apollo-server-koa";

export default gql`
  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
    tils: [Til!]!
  }

  extend type Query {
    user(id: ID!): User!
  }

  extend type Mutation {
    createUser(email: String!, username: String!, password: String!): User!
  }
`;
