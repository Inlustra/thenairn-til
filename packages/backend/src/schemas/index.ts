import { importSchema } from "graphql-import";
import { gql } from "apollo-server-koa";
import tilSchema from "./til";
import userSchema from "./user";

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, tilSchema, userSchema];
