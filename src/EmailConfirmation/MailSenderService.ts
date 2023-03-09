import { Injectable } from "nestjs-injectable";
import nodemailer from "nodemailer";
import { getMaxListeners } from "process";
import { Client } from "src/Entities/Client";

@Injectable()
export class MailSenderService {
  constructor() {}

  public async sendMail(): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true, // use SSL
      auth: { user: "test@test.com", pass: "test" },
    });

    const mailOptions = {
      from: "aleonorbarbershop@zohomail.eu",
      to: "aleonornyikita@gmail.com",
      subject: "Email confirmation",
      text: " Press here to send email",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
    });
  }
}
