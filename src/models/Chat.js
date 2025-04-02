import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
    enum: ["user", "bot"],
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    index: true,
  },
  messages: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
chatSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure messages are stored in chronological order
chatSchema.pre("save", function (next) {
  this.messages.sort((a, b) => a.timestamp - b.timestamp);
  next();
});

// Add method to get conversation context
chatSchema.methods.getContext = function (limit = 10) {
  return this.messages.slice(-limit).map((msg) => ({
    role: msg.sender === "user" ? "user" : "assistant",
    content: msg.text,
  }));
};

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);
