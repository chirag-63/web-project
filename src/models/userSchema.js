import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, unique: true, required: true },
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, sparse: true },
    googleID: { type: String, unique: true, sparse: true },
    githubID: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;