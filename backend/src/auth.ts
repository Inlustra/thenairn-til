import { KoaPassport } from "koa-passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { sign } from "jsonwebtoken";

type Authenticator<T> = (
  id: string
) => Promise<{
  user: T;
  info?: any;
}>;

export function setupPassport<T>(secret: string, authenticator: Authenticator<T>) {
  const passport = new KoaPassport();

  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
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

export function setupTokenGenerator(secret: string) {
  return (user: { id: string; email: string; signInProvider: string }) => {
    return sign(
      {
        email: user.email,
        sign_in_provider: "password"
      },
      secret,
      {
        subject: user.id,
        expiresIn: "7d"
      }
    );
  };
}
