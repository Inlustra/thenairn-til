import Koa from "koa";
import { ApolloServer } from "apollo-server-koa";
import typeDefs from "./graphql/schemas";
import { setupPassport, setupTokenGenerator } from "./auth";
import setupDatabase from "./database";
import user from "./database/user";
import til from "./database/til";
import tag from "./database/tag";
import resolvers from "./graphql/resolvers";
import getEnvironment from "./environment";

if (process.env.NODE_ENV !== "production") {
  require("./dotenv");
}

async function startServer() {
  const environment = await getEnvironment();
  const db = await setupDatabase(environment.dbHost);
  console.log("Started DB");
  const userModel = user(db);
  const tilModel = til(db);
  const tagModel = tag(db);

  const passport = setupPassport(
    environment.jwtSecretKey,
    async (id: string) => {
      return { user: await userModel.findById(id) };
    }
  );
  const tokenGenerator = setupTokenGenerator(environment.jwtSecretKey);
  const app = new Koa();
  app.keys = environment.cookieSecretKeys;
  app.use(passport.initialize());
  app.use((ctx: any, next: any) =>
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
    context: ({ ctx }: { ctx: Koa.Context }) => {
      return {
        user: ctx.user,
        environment,
        userModel,
        tilModel,
        tagModel,
        tokenGenerator: tokenGenerator(ctx),
        db
      };
    },
    introspection: true, // enables introspection of the schema
    playground: true // enables the actual playground,
  });
  server.applyMiddleware({
    app,
    path: "/api/graphql",
    cors: {
      credentials: true
    }
  });
  const appServer = app.listen({ port: environment.port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${environment.port}${server.graphqlPath}`
    )
  );

  process.on("SIGTERM", () => {
    console.log("Bye bye!");
    appServer.close();
    process.exit();
  });

  process.on("SIGINT", () => {
    console.log("Bye bye!");
    appServer.close();
    process.exit();
  });
}

startServer();
