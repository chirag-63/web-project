import { NextResponse } from "next/server";
import connectToDB from "@/lib/db";
import Chat from "@/models/chatSchema";
import messageSchema from "@/models/messageSchema";

export async function POST(req) {
  try {
    const body = await req.json();
    const { chatId, sender, content } = body;

    if (!chatId || !sender || !content) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    await connectToDB();
    const newMessage = await messageSchema.create({
      chat: chatId,
      sender,
      content,
    });

    await Chat.findByIdAndUpdate(chatId, {
      $push: { messages: newMessage._id },
    });
    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    console.log(error);
    throw error;
  }
}