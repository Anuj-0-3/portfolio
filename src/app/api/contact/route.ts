import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const rateLimitMap = new Map<string, number>(); // key: IP, value: last request timestamp

// Simple email regex for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeInput(input: string) {
  // Basic HTML escape for email body to prevent injection
  return input.replace(/[&<>"']/g, (match) => {
    const escapeMap: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return escapeMap[match];
  });
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('remote-addr') || 'unknown';

    // Rate limiting per IP
    const now = Date.now();
    const lastRequest = rateLimitMap.get(ip);
    if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW) {
      return NextResponse.json(
        { message: 'Please wait 1 minute before sending another message.' },
        { status: 429 }
      );
    }
    rateLimitMap.set(ip, now);

    const { name, email, query } = await req.json();

    // Basic validation & anti-spam
    if (
      !name || typeof name !== 'string' || name.trim().length < 2 ||
      !email || typeof email !== 'string' || !emailRegex.test(email.trim()) ||
      !query || typeof query !== 'string' || query.trim().length < 10
    ) {
      return NextResponse.json(
        { message: 'Invalid input data. Please check your name, email, and message.' },
        { status: 400 }
      );
    }

    // Check env variables
    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;
    if (!smtpEmail || !smtpPassword) {
      console.error('SMTP credentials missing');
      return NextResponse.json(
        { message: 'Server configuration error. Please try again later.' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpEmail,
        pass: smtpPassword,
      },
    });

    // Sanitize inputs for HTML email
    const safeName = sanitizeInput(name.trim());
    const safeEmail = sanitizeInput(email.trim());
    const safeQuery = sanitizeInput(query.trim());

    // Compose email
    const mailOptions = {
      from: `"Portfolio Contact" <${smtpEmail}>`,
      to: smtpEmail,
      subject: '📩 New Portfolio Contact Request',
      html: `
        <div style="font-family:sans-serif; color:#333;">
          <h2>📬 New Contact Submission</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-line;">${safeQuery}</p>
          <hr style="margin-top:20px;"/>
          <p style="font-size:12px; color:#999;">Sent from your portfolio contact form</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Your message has been sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Email sending failed:', error);
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { message: 'Something went wrong while sending your message.', error: errorMessage },
      { status: 500 }
    );
  }
}
