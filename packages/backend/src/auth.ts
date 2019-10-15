import { KoaPassport } from "koa-passport";
import { ExtractJwt, Strategy } from "passport-jwt";

type Authenticator<T> = (
  id: string
) => Promise<{
  user: T;
  info?: any;
}>;

function setupPassport<T>(secret: string, authenticator: Authenticator<T>) {
  const passport = new KoaPassport();
  
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret,
      },
      async (jwtPayload, done) => {
        if (!jwtPayload.sub) {
          done(new Error("Invalid JWT, subject not found"));
        }
        try {
          const authResult = await authenticator(jwtPayload.sub);
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
