import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contrasena'
})
export class ContrasenaPipe implements PipeTransform {

  transform( value: any, activar: boolean = true ): any {
    console.log(value);
    console.log(activar);
    const activ = activar;
    if ( activ ) {
      return  value.replace(/./gi, '*');
    }
    return value;
  }

}
