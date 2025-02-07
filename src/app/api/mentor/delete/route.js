import { deleteMentorSchema } from "@/models/zod";
import { NextResponse } from "next/server";
import Bot from "@/models/botSchema";
import { fromZodError } from "zod-validation-error";
import connectToDB from "@/lib/db";

export async function DELETE(req) {
  try {
    const { subject } = await req.json();

    const parsedData = deleteMentorSchema.safeParse({
      subject,
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

    if (!existingMentor) {
      return NextResponse.json(
        {
          errorName: "Mentor Not found",
        },
        { status: 404 }
      );
    }

    const deletedMentor = await Bot.deleteOne({
      subject: parsedData.data.subject,
    });

    return NextResponse.json(
      { message: `${subject} mentor deleted.` },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
