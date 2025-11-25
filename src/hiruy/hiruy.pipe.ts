import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { log } from 'console';

@Injectable()
export class HiruyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    console.log(metadata);
    
    
    return value;
  }
}
