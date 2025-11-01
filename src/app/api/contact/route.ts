import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, project, message } = await req.json();

    const safeName = name?.trim() || "Website Contact";
    const safeEmail = email?.trim() || process.env.MY_EMAIL!;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      // ✅ use your authenticated address as 'from'
      from: `"${safeName}" <${process.env.MY_EMAIL}>`,
      // ✅ put the visitor’s address here so you can reply
      replyTo: safeEmail,

      to: process.env.MY_EMAIL,
      subject: `New contact from ${safeName}`,
      text: `From: ${safeName} <${safeEmail}>\nProject: ${project || "-"}\n\n${
        message || "-"
      }`,
      html: `
        <p><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
        <p><strong>Project:</strong> ${project || "-"}</p>
        <p><strong>Message:</strong></p>
        <p>${(message || "").replace(/\n/g, "<br/>")}</p>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}
