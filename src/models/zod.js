import { z } from "zod";

export const createMentorSchema = z.object({
  subject: z
    .string({
      required_error: "Subject is required",
      invalid_type_error: "Subject must be a string",
    })
    .trim()
    .min(1, { message: "Subject cannot be an empty" })
    .max(50, {
      message: "Subject must be less than or equal to 50 char",
    }),

  description: z
    .string({
      required_error: "description is required",
      invalid_type_error: "description must be a string",
    })
    .trim()
    .min(1, { message: "description cannot be an empty" })
    .max(300, {
      message: "description must be less than or equal to 300 char",
    }),
});

export const deleteMentorSchema = z.object({
  subject: z
    .string({
      required_error: "Subject is required",
      invalid_type_error: "Subject must be a string",
    })
    .trim()
    .min(1, { message: "Subject cannot be an empty" })
    .max(50, {
      message: "Subject must be less than or equal to 50 char",
    }),
});
