import { Resolvers } from "../types";
import { UserModel, UserDocument } from "../../database/user";
import { sign } from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server-koa";
import { Environment } from "../../environment";

export interface Context {
  user: UserDocument | null;
  userModel: UserModel;
  environment: Environment;
  tokenGenerator: (user: UserDocument) => string;
}

const resolvers: Resolvers<Context> = {
  User: {
    username: parent => parent.username,
    email: parent => parent.email,
    id: parent => parent.id,
    tils: async parent => (await parent.populate("tils").execPopulate()).tils
  },
  Query: {
    user: async (parent, { id }, context) =>
      await context.userModel.findById(id),
    me: (parent, _, { user }) => user,
    login: async (
      parent,
      { email, password },
      { userModel, tokenGenerator }
    ) => {
      try {
        const user = await userModel.findByEmailAndPassword(email, password);
        return tokenGenerator(user);
      } catch (error) {
        throw new AuthenticationError("Invalid email or password");
      }
    }
  },
  Mutation: {
    register: async (
      parent,
      { user },
      { userModel, tokenGenerator, user: loggedInUser }
    ) => {
      if (loggedInUser) {
        throw new UserInputError("Already logged in.");
      }
      const savedUser = await userModel.create({
        ...user
      });
      return tokenGenerator(savedUser);
    }
  }
};

export default resolvers;
