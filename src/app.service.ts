import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(private readonly configService : ConfigService){}
  getHello(): string {

    const ID = this.configService.get<string>("appNAme")
    return `Hello ${ID}`;
  }
}
