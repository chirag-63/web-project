import { NextResponse } from "next/server";
import connectToDB from "@/lib/db";
import Chat from "@/models/Chat";

export async function POST(req) {
  try {
    await connectToDB();
    const { subject, messages } = await req.json();

    if (!subject || !messages) {
      return NextResponse.json(
        { error: "Subject and messages are required" },
        { status: 400 }
      );
    }

    // Find existing chat or create new one
    let chat = await Chat.findOne({ subject });

    if (!chat) {
      chat = new Chat({ subject, messages });
    } else {
      // Update messages while preserving existing ones
      const existingMessageIds = new Set(
        chat.messages.map((msg) => msg._id.toString())
      );
      const newMessages = messages.filter(
        (msg) => !existingMessageIds.has(msg._id?.toString())
      );

      if (newMessages.length > 0) {
        chat.messages = [...chat.messages, ...newMessages];
      }
    }

    await chat.save();

    return NextResponse.json({
      success: true,
      chat: {
        subject: chat.subject,
        messages: chat.messages,
        updatedAt: chat.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error saving chat:", error);
    return NextResponse.json(
      { error: "Failed to save chat", details: error.message },
      { status: 500 }
    );
  }
}
