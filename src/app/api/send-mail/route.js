import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });

    await transporter.verify();

    const mailOptions = {
      from: `"CS Mastery Contact Form" <${process.env.EMAIL_USER}>`,
      replyTo: `${name} <${email}>`,
      to: process.env.SITE_MAIL_RECEIVER,
      subject: `[Contact Form] ${subject}`,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: 1px solid #ddd; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent successfully:', info.messageId);

    return NextResponse.json({ 
      success: true, 
      message: "Email sent successfully!",
      messageId: info.messageId
    });

  } catch (error) {
    console.error("Email sending error:", error);
    
    let errorMessage = "Failed to send email";
    if (error.code === 'EAUTH') {
      errorMessage = "Authentication failed. Please check your email credentials.";
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = "Could not connect to email server. Please check your configuration.";
    }

    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    );
  }
}