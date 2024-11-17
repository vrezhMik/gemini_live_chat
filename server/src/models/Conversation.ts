import mongoose, { Schema, Types } from "mongoose";

const ConversationSchema = new Schema({
  _id: { type: Number, required: true },
  chat_id: { type: Number, required: true },
  messages: [
    {
      sender: { type: String, required: true },
      content: { type: Schema.Types.Mixed, required: true },
      timestamp: { type: Date, required: true, default: Date.now },
    },
  ],
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

export default Conversation;
