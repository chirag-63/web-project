import connectToDB from "@/lib/db";
import Bot from "@/models/botSchema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const mentors = await Bot.find();
    return NextResponse.json(mentors, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
