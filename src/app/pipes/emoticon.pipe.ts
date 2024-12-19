import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emoticon'
})
export class EmoticonPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
