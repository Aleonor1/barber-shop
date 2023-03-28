import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MailSenderService } from "./EmailConfirmation/MailSenderService";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // const options = new DocumentBuilder()
  //   .addBearerAuth()
  //   .setTitle("JS Code Api")
  //   .setDescription("JS Code Video Tutorial endpoints")
  //   .setVersion("1.0")
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup("api", app, document);

  const options = new DocumentBuilder()
    .setTitle("Barber API")
    .setDescription("API for managing barbers")
    .setVersion("1.0")
    .addTag("barbers")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api-docs", app, document);

  await app.listen(3000);
}
bootstrap();
