import { Resolvers } from "../types";
import { UserDocument, UserModel } from "../../database/user";
import { AuthenticationError } from "apollo-server-koa";
import { sign } from "jsonwebtoken";

export interface Context {
  environment: Environment;
  user: UserDocument | null;
  userModel: UserModel;
}

const resolvers: Resolvers<Context> = {
  Query: {
    me: (parent, _, { user }) => user,
    login: async (parent, { email, password }, { userModel, environment }) => {
      try {
        const user = await userModel.findByEmailAndPassword(email, password);
        return sign(
          {
            email: user.email,
            sign_in_provider: "password"
          },
          environment.jwtSecretKey,
          {
            subject: user._id,
            expiresIn: "7d"
          }
        );
      } catch (error) {
        throw new AuthenticationError("Invalid email or password");
      }
    }
  }
};

export default resolvers;
