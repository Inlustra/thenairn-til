import Koa from "koa";
import { ApolloServer } from "apollo-server-koa";
import typeDefs from "./graphql/schema";
import setupPassport from "./auth";
import setupDatabase from "./database";
import user from "./database/user";
import til from "./database/til";
import resolvers from "./graphql/resolvers";
import getEnvironment from "./environment";

async function startServer() {
  const environment = await getEnvironment();
  const db = await setupDatabase(environment.dbHost);
  console.log("Started DB");
  const userModel = user(db);
  const tilModel = til(db);

  const passport = setupPassport(
    environment.jwtSecretKey,
    async (id: string) => {
      const user = await userModel.findById(id);
      if (!user) {
        throw new Error("Invalid user");
      }
      return { user };
    }
  );
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ctx}) => {
      console.log(ctx.req.user, null, 2)
      return { environment, userModel, tilModel };
    }
  });

  const app = new Koa();
  app.use(passport.initialize());
  app.use(passport.session());
  server.applyMiddleware({ app });
  app.listen({ port: environment.port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${environment.port}${server.graphqlPath}`
    )
  );
}

startServer();
