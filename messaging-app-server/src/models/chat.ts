import { InferSchemaType, Schema, model } from "mongoose";

const chatSchema = new Schema({
  users: { type: [Schema.Types.ObjectId], ref: "User", required: true },
  last_message: { type: Schema.Types.ObjectId, ref: "Message" },
});

export type Chat = InferSchemaType<typeof chatSchema>;

export default model<Chat>("Chat", chatSchema);
