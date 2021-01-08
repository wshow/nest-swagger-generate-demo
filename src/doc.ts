import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs-extra';
import { resolve } from 'path';
// import { version } from '../package.json';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    deepScanRoutes: true,
  });
  // SwaggerModule.setup('api', app, document);
  writeFileSync(
    resolve(__dirname, '../api.json'),
    JSON.stringify(document, null, 2),
    {
      encoding: 'utf-8',
    },
  );
  process.exit(0);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
