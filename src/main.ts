import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { createdocument } from './config/swagger/swaggerConfig';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from './common/validation/validation.exception';
import {covertErrorToObject} from './common/convertErrortoObject'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get('PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        return new ValidationException(covertErrorToObject(errors));
      },
    }),
  );

  if (configService.get('ENVIRONMENT') === 'DEVELOPMENT') {
    SwaggerModule.setup('docs', app, createdocument(app));
  }
  await app.listen(port, '0.0.0.0');
}
bootstrap();
