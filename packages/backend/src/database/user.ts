import bcrypt from "bcrypt";
import { Schema, Mongoose, Document, Model } from "mongoose";
import { TilDocument } from "./til";

export interface User {
  email: string;
  username: string;
  password: string;
  tils: TilDocument[];
}

export interface UserDocument extends Document, User {
  validatePassword: (this: UserDocument, password: string) => Promise<boolean>;
}

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
  tils: [
    {
      type: Schema.Types.ObjectId,
      ref: "til"
    }
  ]
});

userSchema.methods.validatePassword = async function(password) {
  const populatedUser = await this.populate("password").execPopulate();
  return bcrypt.compareSync(password, populatedUser.password);
};

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
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  if (!user.validatePassword(password)) {
    throw new Error("Invalid password");
  }
  return user;
});

const user = (mongoose: Mongoose) =>
  mongoose.model<UserDocument, UserModel>("user", userSchema);

export default user;
