import mongoose, { Schema } from "mongoose";

const ChatSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
