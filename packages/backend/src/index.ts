import Koa from "koa";
import { ApolloServer } from "apollo-server-koa";
import typeDefs from "./graphql/schema";
import setupPassport from "./auth";
import setupDatabase from "./database";
import user from "./database/user";

async function startServer() {
  const environment = await getEnvironment();
  const db = await setupDatabase(environment.dbHost);
  const userModel = user(db);
  const passport = setupPassport(
    environment.jwtSecretKey,
    userModel.authUserId
  );

  const resolvers = {
    Query: {}
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return { user: req.user };
    }
  });

  passport.initialize();

  const app = new Koa();
  app.use(passport.session());
  server.applyMiddleware({ app });
  app.listen({ port: environment.port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${environment.port}${server.graphqlPath}`
    )
  );
}

startServer();
