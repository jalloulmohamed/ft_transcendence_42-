/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { WebSocketAdapter } from './gateway/gateway.adapter';

// import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(passport.initialize());
	// app.use(passport.session());
	app.use(cookieParser());

  app.use(passport.initialize());
  // app.use(passport.session());
  app.use(cookieParser());
  const adapter = new WebSocketAdapter(app);
  app.useWebSocketAdapter(adapter);
  
  const config = new DocumentBuilder()
    .setTitle('ft_transcendence')
    .setDescription('multiplayer pong web project V')
    .setVersion('1.0')
    .addTag('web')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); 
  app.use(passport.initialize());
  app.use(cookieParser());

  app.enableCors({ origin : ['http://localhost:3000'], credentials: true})
  await app.listen(8000);
}
bootstrap();
