import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message, phoneNumber } = await req.json();

    // Honeypot check
    if (phoneNumber) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Send email
    await resend.emails.send({
      from: "GovFeeds <onboarding@resend.dev>",
      to: "wallscreet@proton.me",
      subject: `New message from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
