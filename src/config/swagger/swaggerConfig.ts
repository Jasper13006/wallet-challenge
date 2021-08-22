import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export function createdocument(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('Advertisement Service')
    .setDescription('Advertisement Service')
    .setVersion('1.0')
    .addServer(`http://localhost:${process.env.SERVER_PORT}`, 'Local Enviroment')
    // .addServer(``, 'Beta')
    // .addServer(`http://`, 'Prod')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  return document;
}
