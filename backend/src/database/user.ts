import bcrypt from "bcryptjs";
import { Schema, Mongoose, Document, Model } from "mongoose";
import { TilDocument } from "./til";

export interface User {
  email: string;
  username: string;
  password: string;
  tils: TilDocument[];
}

export interface UserDocument extends Document, User {}

export interface UserModel extends Model<UserDocument> {
  findByEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserDocument>;
}

const userSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
});

userSchema.pre<UserDocument>("save", function() {
  if (!this.isModified("password")) {
    return;
  }
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
});

userSchema.static("findByEmailAndPassword", async function(
  this: UserModel,
  email: string,
  password: string
): Promise<UserDocument> {
  const user = await this.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("User not found");
  }
  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error("Invalid password");
  }
  return user;
});

const user = (mongoose: Mongoose) =>
  mongoose.model<UserDocument, UserModel>("user", userSchema);

export default user;
