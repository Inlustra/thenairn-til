import mongoose, { Document } from "mongoose";
import { UserDocument } from "./user";

interface TilDocument extends Document {
  title: string;
  code: {
    language: string;
    body: string;
  };
  tags: string[];
  author: UserDocument;
}

const tilSchema = new mongoose.Schema<TilDocument>({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

const til = mongoose.model("til", tilSchema);

export default til;
