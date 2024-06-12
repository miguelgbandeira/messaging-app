import { InferSchemaType, Schema, model } from "mongoose";

const messageSchema = new Schema({
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
  SentOn: { type: Date, required: true },
});

type Message = InferSchemaType<typeof messageSchema>;

export default model<Message>("Message", messageSchema);
