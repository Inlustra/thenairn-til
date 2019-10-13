import { gql } from "apollo-server-koa";

export default gql`

  input TilCodeInput {
    language: String!
    body: String!
  }

  type TilCode {
    language: String!
    body: String!
  }

  input TilInput {
    title: String!
    code: TilCodeInput!
    tags: [String!]!
  }

  type Til {
    id: ID!
    title: String!
    code: TilCode!
    author: User!
    tags: [String!]!
  }

  extend type Query {
    til(id: ID!): Til!
    tils: [Til!]!
  }


  extend type Mutation {
    createTil(input: TilInput!): Til!
    deleteTil(id: ID!): Boolean!
  }
`;
