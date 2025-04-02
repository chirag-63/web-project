import { NextResponse } from "next/server";
import connectToDB from "@/lib/db";
import Chat from "@/models/Chat";

export async function GET(req) {
  try {
    // Connect to database
    await connectToDB();

    // Get subject from query parameters
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject");

    if (!subject) {
      return NextResponse.json(
        { error: "Subject is required" },
        { status: 400 }
      );
    }

    console.log(`Loading chat for subject: ${subject}`);

    // Find chat in database
    const chat = await Chat.findOne({ subject });

    if (!chat) {
      console.log(`No chat found for subject: ${subject}`);
      return NextResponse.json({ messages: [] });
    }

    console.log(`Found chat with ${chat.messages.length} messages`);
    return NextResponse.json({ messages: chat.messages });
  } catch (error) {
    console.error("Error in chat load route:", error);
    return NextResponse.json(
      {
        error: "Failed to load chat",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
