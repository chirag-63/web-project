import { NextResponse } from "next/server";
import connectToDB from "@/lib/db";
import Chat from "@/models/chatSchema";
import Bot from "@/models/botSchema";
import { v4 as uuidv4 } from "uuid";
// import { auth } from "@clerk/nextjs/server";
import User from "@/models/userSchema";

export async function POST(req) {
  const body = await req.json();
  const { subject } = body;
  // const { clerkUserId } = auth();

  try {
    if (!subject) {
      return NextResponse.json(
        { success: false, message: "Missing subject" },
        { status: 400 }
      );
    }

    await connectToDB();

    const bot = await Bot.findOne({ subject });
    if (!bot) {
      return NextResponse.json(
        { success: false, message: "Bot not found" },
        { status: 404 }
      );
    }

    // console.log(clerkUserId)
    // const user = await User.findOne({ clerkUserId });
    // if (!user) {
    //   return NextResponse.json(
    //     { success: false, message: "User not found" },
    //     { status: 404 }
    //   );
    // }

    const newChat = await Chat.create({
      _id: uuidv4(),
      userId: '67a6163931d6df357ff05451',
      expert: bot._id,
      title: "New Chat",
      messages: [],
    });

    return NextResponse.json({ success: true, chat: newChat });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
