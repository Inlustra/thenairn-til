import { Passport } from "koa-passport";
import { ExtractJwt, Strategy } from "passport-jwt";

type Authenticator<T> = (
  id: string
) => Promise<{
  user: T;
  info?: any;
}>;

function setupPassport<T>(secret: string, authenticator: Authenticator<T>) {
  const passport = new Passport();
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
      },
      async (jwtPayload, done) => {
        if (!jwtPayload.id) {
          done(new Error("Invalid JWT, id not found"));
        }
        try {
          const authResult = await authenticator(jwtPayload.id);
          done(undefined, authResult.user, authResult.info);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  return passport;
}

export default setupPassport;
