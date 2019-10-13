import { Resolvers } from "../types";
import { UserModel } from "../../database/user";

export interface Context {
  userModel: UserModel;
}

const resolvers: Resolvers<Context> = {
  User: {
    username: parent => parent.username,
    email: parent => parent.email,
    password: parent => parent.password,
    id: parent => parent._id,
    tils: async parent =>
      !parent.tils
        ? (await parent.populate("tils").execPopulate()).tils
        : parent.tils
  },
  Query: {
    user: async (parent, { id }, context) =>
      await context.userModel.findById(id)
  }
};

export default resolvers;
