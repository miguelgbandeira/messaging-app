import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, maxLength: 100 },
  password: { type: String, required: true, unique: true, select: false },
  createdAt: { type: Date, required: true },
});

export type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
