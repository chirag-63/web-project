import { createMentorSchema } from "@/models/zod";
import { fromZodError } from "zod-validation-error";
import { NextResponse } from "next/server";
import connectToDB from "@/lib/db";
import Bot from "@/models/botSchema";

export async function POST(req, res) {
  try {
    const { subject, description } = await req.json();

    const parsedData = createMentorSchema.safeParse({
      subject,
      description,
    });

    if (!parsedData.success) {
      const validationError = fromZodError(parsedData.error);
      return NextResponse.json({
        errorName: validationError.name,
        errorDetails: validationError.details,
      });
    }

    await connectToDB();
    const existingMentor = await Bot.findOne({
      subject: parsedData.data.subject,
    });

    if (existingMentor) {
      return NextResponse.json(
        {
          errorName: "Mentor already exists",
        },
        { status: 411 }
      );
    }

    const mentor = await Bot.create({
      subject: parsedData.data.subject,
      description: parsedData.data.description,
    });

    return NextResponse.json(mentor, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
