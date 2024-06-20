import { InferSchemaType, Schema, model } from "mongoose";

const messageSchema = new Schema({
  chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
  message: { type: String, required: true },
  sentFrom: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sentTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: { type: Date, required: true },
});

export type Message = InferSchemaType<typeof messageSchema>;

export default model<Message>("Message", messageSchema);
