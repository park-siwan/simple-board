import { Controller, Get, Logger, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger();

  @Get()
  getHello(@Ip() ip: string): string {
    console.log(this.configService.get('ENVIRONMENT'));
    this.logger.log(ip);
    // console.log('ip:', ip);
    return this.appService.getHello();
    // throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
  }

  @Get('name')
  getName(@Query('name') name: string): string {
    return `${name} hello`;
  }
}
