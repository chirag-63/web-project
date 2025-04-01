import { NextResponse } from "next/server";
import connectToDB from "@/lib/db";
import Chat from "@/models/chatSchema";

export async function GET(req, { params }) {
  try {
    await connectToDB();
    const { chatId } = await params;

    const chat = await Chat.findById(chatId).populate("messages");
    if (!chat) {
      return NextResponse.json(
        { success: false, message: "Chat not found. Create chat first." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, chat });
  } catch (error) {
    throw error;
  }
}
