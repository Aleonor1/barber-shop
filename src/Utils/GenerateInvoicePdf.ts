import { Appointment } from "@/Entities/Appointments/Appointment";
import { Client } from "@/Entities/Client";
import { HairdresserService } from "@/Entities/HairdresserService";
import * as puppeteer from "puppeteer";

interface Invoice {
  invoiceNumber: string;
  date: string;
  clientName: string;
  totalAmount: number;
  services: HairdresserService[];
}

class InvoiceService {
  private browser: puppeteer.Browser;

  constructor() {
    this.browser = null;
  }

  async init(): Promise<void> {
    if (!this.browser) {
      this.browser = await puppeteer.launch({ headless: true });
    }
  }

  async generateInvoicePdf(
    invoice: Invoice,
    appointment: Appointment
  ): Promise<Buffer> {
    if (!this.browser) {
      await this.init();
    }

    const page = await this.browser.newPage();

    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 2,
    });

    let services = "";
    invoice.services.forEach((service) => {
      services += ` <tr>
      <td style="padding: 10px;">${service.string}</td> 
      <td style="padding: 10px; text-align: right;">${service.price}</td>
    </tr>`;
    });

    const htmlContent = `
    <div style="font-family: Arial, sans-serif; font-size: 14px;">
    <h1 style="text-align: center; margin-bottom: 30px;">Invoice #${
      invoice.invoiceNumber
    }</h1>
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <div style="flex: 1;">
        <p><strong>Date:</strong> ${invoice.date}</p>
        <p><strong>Client name:</strong> ${
          appointment.client.firstName + " " + appointment.client.lastName
        }</p>
      </div>
      <div style="flex: 1; text-align: right;">
        <img src="https://dummyimage.com/600x400/000/fff.png&text=barber-shop" alt="Logo" style="width: 100px; height: 100px;">
      </div>
    </div>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th style="padding: 10px; text-align: left;">Description</th>
          <th style="padding: 10px; text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
      ${services}
        <tr>
          <td style="padding: 10px; text-align: right;"><strong>Total:</strong></td>
          <td style="padding: 10px; text-align: right;"><strong>$${appointment.price.toFixed(
            2
          )}</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
    `;

    await page.setContent(htmlContent);

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "30px",
        bottom: "30px",
        left: "30px",
        right: "30px",
      },
    });

    await page.close();

    return pdfBuffer;
  }

  async destroy(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

const invoiceService = new InvoiceService();

export default invoiceService;
