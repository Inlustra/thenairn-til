import bcrypt from "bcrypt";
import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
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
    required: true
  },
  tils: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "til"
    }
  ]
});

userSchema.pre<UserDocument>("save", function() {
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
});

const user = mongoose.model("user", userSchema);

export default user;
