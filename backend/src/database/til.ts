import { Schema, Mongoose, Document, Model } from "mongoose";
import { UserDocument } from "./user";
import { TagDocument } from "./tag";

export interface Til {
  title: string;
  code: {
    language: string;
    body: string;
  };
  tags: TagDocument[];
  author: UserDocument;
}

export interface TilDocument extends Document, Til {
  populateTags: Promise<Til>
}

export interface TilModel extends Model<TilDocument> {}

const tilSchema = new Schema<TilDocument>({
  title: {
    type: String,
    required: true
  },
  code: {
    type: {
      language: String,
      body: String
    },
    required: true
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: "tag"
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

const til = (mongoose: Mongoose) =>
  mongoose.model<TilDocument, TilModel>("til", tilSchema);

export default til;
