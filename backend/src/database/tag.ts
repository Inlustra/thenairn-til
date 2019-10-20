import { Schema, Mongoose, Document, Model } from "mongoose";
import { UserDocument } from "./user";

export interface Tag {
  label: string;
}

export interface TagDocument extends Document, Tag {}

export interface TagModel extends Model<TagDocument> {}

const tagSchema = new Schema<TagDocument>({
  label: {
    type: String,
    required: true,
    unique: true
  }
});

const til = (mongoose: Mongoose) =>
  mongoose.model<TagDocument, TagModel>("tag", tagSchema);

export default til;
