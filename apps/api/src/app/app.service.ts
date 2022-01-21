import { Injectable } from '@nestjs/common';
import { Message } from '@repo20220121/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
