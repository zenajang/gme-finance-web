import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { COUNTRY_EMAILS, NATIONALITIES } from "@/constants/countries";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, nationality, email, message } = body;

    // 유효성 검사
    if (!firstName || !lastName || !nationality || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // 국가별 담당자 이메일 가져오기
    const toEmail = COUNTRY_EMAILS[nationality];
    if (!toEmail) {
      return NextResponse.json(
        { error: "Invalid nationality" },
        { status: 400 }
      );
    }

    // 국가 이름 가져오기
    const countryName = NATIONALITIES.find(n => n.code === nationality)?.name || nationality;

    // 이메일 전송
    const { data, error } = await resend.emails.send({
      from: "GME Finance <noreply@gmefinance.com>",
      to: toEmail,
      subject: `[Loan Consultation] New inquiry from ${firstName} ${lastName}`,
      html: `
        <h2>New Loan Consultation Request</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5; font-weight: bold;">Name</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5; font-weight: bold;">Nationality</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${countryName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5; font-weight: bold;">Email</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5; font-weight: bold;">Message</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${message}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #666;">Please contact the customer as soon as possible.</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
