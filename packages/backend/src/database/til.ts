import { Schema, Mongoose, Document, Model } from "mongoose";
import { UserDocument } from "./user";

export interface Til {
  title: string;
  code: {
    language: string;
    body: string;
  };
  tags: string[];
  author: UserDocument;
}

export interface TilDocument extends Document, Til {}

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
  tags: {
    type: [String],
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

const til = (mongoose: Mongoose) =>
  mongoose.model<TilDocument, TilModel>("til", tilSchema);

export default til;
