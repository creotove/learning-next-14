import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import UserModel from "@/models/userModel";

type Mailer = {
  email: string;
  emailType: string;
  userId: string;
};
export default async function sendEmail({ email, emailType, userId }: Mailer) {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await UserModel.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await UserModel.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_ADDRESS,
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
      html: `<p><a href='${
        process.env.DOMAIN
      }/verifyEmail?token=${hashedToken}'>Click here to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</a></p>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
