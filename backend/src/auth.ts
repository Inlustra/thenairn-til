import { Context } from "koa";
import { KoaPassport } from "koa-passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { sign } from "jsonwebtoken";

type Authenticator<T> = (
  id: string
) => Promise<{
  user: T;
  info?: any;
}>;

const COOKIE_NAME = "devtailjwt";
const bearerExtractor = ExtractJwt.fromAuthHeaderAsBearerToken();

export function setupPassport<T>(
  secret: string,
  authenticator: Authenticator<T>
) {
  const passport = new KoaPassport();
  passport.use(
    new Strategy(
      {
        jwtFromRequest: request =>
          request?.cookies?.get(COOKIE_NAME, {
            signed: true
          }) ?? bearerExtractor(request),
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
  return (ctx: Context) => (user: {
    id: string;
    email: string;
    signInProvider: string;
  }) => {
    const token = sign(
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

    ctx.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      signed: true
      //TODO: correctly set expires
    });
    return token;
  };
}
