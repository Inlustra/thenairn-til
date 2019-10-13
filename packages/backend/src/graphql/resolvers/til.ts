import { Resolvers } from "../types";
import { TilModel } from "../../database/til";

export interface Context {
  tilModel: TilModel;
}

const resolvers: Resolvers<Context> = {
  Til: {
    author: async parent =>
      parent.author
        ? parent.author
        : (await parent.populate("author").execPopulate()).author,
    code: parent => parent.code,
    id: parent => parent._id,
    tags: parent => parent.tags,
    title: parent => parent.title
  },
  Query: {
    til: async (parent, { id }, context) => await context.tilModel.findById(id),
    tils: async (parent, _, context) => await context.tilModel.find({})
  }
};

export default resolvers;
