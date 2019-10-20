import { TagModel, TagDocument } from "../../database/tag";
import {
  QueryResolvers,
  MutationResolvers,
  TagResolvers,
  Resolvers
} from "../../generated/graphql";

export interface Context {
  tagModel: TagModel;
}

const Tag: TagResolvers<Context, TagDocument> = {
  id: parent => parent.id,
  label: parent => console.log(parent) as any || parent.label
};

const Query: QueryResolvers<Context> = {
  tag: async (parent, { id, label }, context) => {
    if (!id && !label) {
      throw new Error("Either id or label must be defined");
    }
    if (id && label) {
      throw new Error("Search using either id or label, not both");
    }
    if (id) {
      return await context.tagModel.findById(id);
    }
    return await context.tagModel.findOne({ label });
  },
  tags: async (parent, { search }, { tagModel }) => {
    return await tagModel.find({ label: new RegExp(search) });
  }
};

const Mutation: MutationResolvers<Context> = {
  createTag: async (parent, { input }, { tagModel }) =>
    await tagModel.create({ ...input })
};

const resolvers: Resolvers<Context> = {
  Tag,
  Query,
  Mutation
};

export default resolvers;
