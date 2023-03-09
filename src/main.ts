import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MailSenderService } from "./EmailConfirmation/MailSenderService";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const mailSender = new MailSenderService();
  mailSender.sendMail();

  // const options = new DocumentBuilder()
  //   .addBearerAuth()
  //   .setTitle("JS Code Api")
  //   .setDescription("JS Code Video Tutorial endpoints")
  //   .setVersion("1.0")
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
