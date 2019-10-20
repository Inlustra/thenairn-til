import { TilModel, TilDocument } from "../../database/til";
import { UserDocument } from "../../database/user";
import { AuthenticationError, UserInputError } from "apollo-server-koa";
import {
  Resolvers,
  TilCodeResolvers,
  TilResolvers,
  QueryResolvers,
  MutationResolvers
} from "../../generated/graphql";
import { TagModel } from "../../database/tag";

export interface Context {
  tilModel: TilModel;
  tagModel: TagModel;
  user: UserDocument | null;
}

const TilCode: TilCodeResolvers<Context, TilDocument["code"]> = {
  body: parent => parent.body,
  language: parent => parent.language
};

const Til: TilResolvers<Context, TilDocument> = {
  author: async parent =>
    (await parent.populate("author").execPopulate()).author,
  code: parent => parent.code,
  id: parent => parent.id,
  tags: async parent => (await parent.populate("tags").execPopulate()).tags,
  title: parent => parent.title
};

const Query: QueryResolvers<Context> = {
  til: async (parent, { id }, context) => await context.tilModel.findById(id),
  tils: async (parent, p, context) => await context.tilModel.find({})
};

const Mutation: MutationResolvers<Context> = {
  createTil: async (
    parent,
    { til, createTags },
    { tilModel, user, tagModel }
  ) => {
    if (!user) {
      throw new AuthenticationError("You must be logged in to create a TIL");
    }
    const createdTags = await Promise.all(
      (createTags || []).map(createTag => tagModel.create(createTag))
    );
    const createTagsIds = createdTags.map(tag => tag.id);
    const savedTil = await tilModel.create({
      ...til,
      code: { ...til.code },
      author: user.id,
      tags: [...(til.tags || []), ...createTagsIds]
    });
    return savedTil;
  },
  deleteTil: async (parent, { id }, { tilModel, user }) => {
    if (!user) {
      throw new AuthenticationError("You must be logged in to delete a TIL");
    }
    const result = await tilModel.deleteOne({
      _id: id,
      author: user.id
    });
    if (!result.ok) {
      throw new Error(`Unable to complete request: ${result.ok}`);
    }
    if (!result.deletedCount) {
      throw new UserInputError(
        "TIL already deleted or invalid deletion request"
      );
    }
    return true;
  }
};

const resolvers: Resolvers<Context> = {
  TilCode,
  Til,
  Query,
  Mutation
};

export default resolvers;
