import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("BuilPC API")
    .setDescription("API buildpc, connected with PostgreSQL - AWS")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: false, forbidNonWhitelisted: true })
  );

  const port = process.env.DB_PORT || 3000;
  await app.listen(port, () => {
    console.log("Server Nest On: ", port);
  });
}
bootstrap();
