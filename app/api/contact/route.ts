import { Resend } from "resend";
import { NextResponse } from "next/server";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable");
  }
  return new Resend(apiKey);
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let division = "Commercial";
    let name = "";
    let companyOrHomeowner = "";
    let email = "";
    let phone = "";
    let location = "";
    let budget = "";
    let description = "";
    const attachments: { filename: string; content: Buffer }[] = [];

    if (
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      const formData = await request.formData();
      division = formData.get("division")?.toString() || "Commercial";
      name = formData.get("name")?.toString() || "";
      companyOrHomeowner = formData.get("companyOrHomeowner")?.toString() || "";
      email = formData.get("email")?.toString() || "";
      phone = formData.get("phone")?.toString() || "";
      location = formData.get("location")?.toString() || "";
      budget = formData.get("budget")?.toString() || "";
      description = formData.get("description")?.toString() || "";

      const file = formData.get("file") as File | null;
      if (file && typeof file === "object" && "arrayBuffer" in file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        attachments.push({
          filename: file.name,
          content: buffer,
        });
      }
    } else {
      const payload = await request.json();
      division = payload.division || "Commercial";
      name = payload.name || "";
      companyOrHomeowner = payload.companyOrHomeowner || "";
      email = payload.email || "";
      phone = payload.phone || "";
      location = payload.location || "";
      budget = payload.budget || "";
      description = payload.description || "";
    }

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required fields." },
        { status: 400 }
      );
    }

    const htmlEmail = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f5f7; }
          .container { width: 100%; max-width: 620px; margin: 30px auto; background-color: #ffffff; border: 1px solid #d4d8de; }
          .header { background-color: #1e2229; padding: 24px 32px; border-top: 4px solid #8b4513; }
          .header-title { margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
          .header-subtitle { margin: 4px 0 0; color: #bfc5ce; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
          .division-badge { display: inline-block; background-color: #8b4513; color: #ffffff; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-top: 12px; }
          .content { padding: 32px; }
          .lead-intro { font-size: 15px; color: #5e6671; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #e8ebef; }
          .data-table { width: 100%; border-collapse: collapse; }
          .data-table td { padding: 12px 0; border-bottom: 1px solid #e8ebef; vertical-align: top; font-size: 14px; }
          .label { font-weight: 600; color: #5e6671; width: 170px; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }
          .value { color: #0f172a; }
          .value a { color: #8b4513; text-decoration: none; font-weight: 500; }
          .section-heading { font-size: 12px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin: 24px 0 8px; }
          .message-box { background-color: #f8f9fa; border-left: 3px solid #8b4513; padding: 16px; font-size: 14px; color: #0f172a; white-space: pre-wrap; }
          .attachment-box { background-color: #fff4ed; border: 1px solid #8b4513; padding: 12px 16px; font-size: 13px; color: #8b4513; font-weight: 600; margin-top: 16px; }
          .footer { background-color: #f4f5f7; padding: 20px 32px; font-size: 12px; color: #5e6671; border-top: 1px solid #e8ebef; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="header-title">New Estimate Request</h1>
            <p class="header-subtitle">SP10 Construction Inquiry System</p>
            <span class="division-badge">${division}</span>
          </div>

          <div class="content">
            <p class="lead-intro">A new project estimate inquiry has been submitted via <strong>sp10construction.com</strong>.</p>
            
            <table class="data-table">
              <tr>
                <td class="label">Full Name</td>
                <td class="value"><strong>${name}</strong></td>
              </tr>
              <tr>
                <td class="label">Company / Owner</td>
                <td class="value">${companyOrHomeowner || "Not specified"}</td>
              </tr>
              <tr>
                <td class="label">Email Address</td>
                <td class="value"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td class="label">Phone Number</td>
                <td class="value"><a href="tel:${phone}">${phone || "Not provided"}</a></td>
              </tr>
              <tr>
                <td class="label">Project Location</td>
                <td class="value">${location || "Not specified"}</td>
              </tr>
              <tr>
                <td class="label">Estimated Budget</td>
                <td class="value">${budget || "Not yet established"}</td>
              </tr>
            </table>

            <div class="section-heading">Project Scope & Description</div>
            <div class="message-box">${description || "No additional description provided."}</div>

            ${
              attachments.length > 0
                ? `<div class="attachment-box">&#128206; Attached File: ${attachments[0].filename}</div>`
                : ""
            }
          </div>

          <div class="footer">
            Sent via SP10 Construction notification relay from notifications@indevasa.com.<br/>
            Recipient: info@sp10construction.com
          </div>
        </div>
      </body>
      </html>
    `;

    const resend = getResendClient();

    const result = await resend.emails.send({
      from: "SP10 Construction <notifications@indevasa.com>",
      to: ["info@sp10construction.com"],
      replyTo: email,
      subject: `New Estimate Request: ${name} (${division.toUpperCase()})`,
      html: htmlEmail,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (result.error) {
      console.error("Resend API error:", result.error);
      return NextResponse.json(
        { success: false, error: result.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: result.data?.id });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
