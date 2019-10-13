import fs from "fs";
import { gql } from "apollo-server-koa";

function readSchema(name: string) {
  return gql(fs.readFileSync(__dirname.concat(`/${name}`), "utf8"));
}

export default [
  readSchema("schemas/link.graphql"),
  readSchema("schemas/user.graphql"),
  readSchema("schemas/auth.graphql"),
  readSchema("schemas/til.graphql"),
];
