import Koa from "koa";
import { ApolloServer } from "apollo-server-koa";
import typeDefs from "./graphql/schema";
import { setupPassport, setupTokenGenerator } from "./auth";
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
      return { user: await userModel.findById(id) };
    }
  );
  const tokenGenerator = setupTokenGenerator(environment.jwtSecretKey);
  const app = new Koa();
  app.use(passport.initialize());
  app.use((ctx, next) =>
    passport.authenticate(
      "jwt",
      { session: false },
      async (err: any, user: any, info: any, status: any) => {
        if (user) {
          ctx.user = user;
        }
        await next();
      }
    )(ctx, next)
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ ctx: { user } }) => {
      return { user, environment, userModel, tilModel, tokenGenerator };
    }
  });
  server.applyMiddleware({ app });

  app.listen({ port: environment.port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${environment.port}${server.graphqlPath}`
    )
  );
}

startServer();
