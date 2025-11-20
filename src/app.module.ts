import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import Joi, * as joi from "joi"
import appCinfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // validationSchema: Joi.object({
      //   APP_KEY= Joi.string().default("sth")
      // }),
      load: [appCinfig],

    }

    ),
    HelloModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
