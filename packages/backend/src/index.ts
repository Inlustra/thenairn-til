import Koa from "koa";
import { ApolloServer } from "apollo-server-koa";
import typeDefs from "./schemas";

// Construct a schema, using GraphQL schema language

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = new Koa();
server.applyMiddleware({ app });
// alternatively you can get a composed middleware from the apollo server
// app.use(server.getMiddleware());

app.listen({ port: 4098 }, () =>
  console.log(`🚀 Server ready at http://localhost:4098${server.graphqlPath}`)
);
