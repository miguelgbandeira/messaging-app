import { InferSchemaType, Schema, model } from "mongoose";

const chatSchema = new Schema({
  messages: {
    type: [Schema.Types.ObjectId],
    ref: "Message",
    required: true,
  },
  users: { type: [Schema.Types.ObjectId], ref: "User", required: true },
});

export type Chat = InferSchemaType<typeof chatSchema>;

export default model<Chat>("Chat", chatSchema);
