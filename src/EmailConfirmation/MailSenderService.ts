import { Injectable } from "nestjs-injectable";
import nodemailer from "nodemailer";
import { getMaxListeners } from "process";
import { Appointment } from "src/Entities/Appointments/Appointment";
import { Client } from "src/Entities/Client";

@Injectable()
export class MailSenderService {
  private static instance: MailSenderService;
  private constructor() {}

  public static getInstance(): MailSenderService {
    if (!MailSenderService.instance) {
      MailSenderService.instance = new MailSenderService();
    }
    return MailSenderService.instance;
  }

  public async sendMailAppointmentToBarber(
    mail: string,
    email: string,
    appointment: Appointment,
    barberId: string
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true, // use SSL
      auth: { user: "aleonorbarbershop@zohomail.eu", pass: "ParolaGrea1" },
    });

    const mailOptions = {
      from: "aleonorbarbershop@zohomail.eu",
      to: mail,
      subject: "Email confirmation",
      text: `New Appointment ${JSON.stringify(
        appointment
      )}. Confirm appointment accesing this link: http://localhost:3000/barber/verifyAppointment/${barberId}/${
        appointment.id
      }`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
      }
    });
  }

  public async sendMailToClientAppointmentConfirmed(
    mail: string,
    email: string,
    appointment: Appointment,
    barberId: string
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true, // use SSL
      auth: { user: "aleonorbarbershop@zohomail.eu", pass: "ParolaGrea1" },
    });

    const mailOptions = {
      from: "aleonorbarbershop@zohomail.eu",
      to: mail,
      subject: "Email confirmation",
      text: `Your Appointment ${JSON.stringify(
        appointment
      )}. Is now confirmed!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
      }
    });
  }

  public async sendMail(
    mail: string,
    token: string,
    id: string
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true, // use SSL
      auth: { user: "test@test.com", pass: "test" },
    });

    const mailOptions = {
      from: "aleonorbarbershop@zohomail.eu",
      to: mail,
      subject: "Email confirmation",
      text: `Click on the following link to activate your account: http://localhost:3000/clients/verify/${id}/${token}}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
      }
    });
  }
}
