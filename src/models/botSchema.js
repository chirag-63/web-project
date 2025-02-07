import mongoose from "mongoose";

const botSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Bot = mongoose.models.Bot || mongoose.model("Bot", botSchema);
export default Bot;