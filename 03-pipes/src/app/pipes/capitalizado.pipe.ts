import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'capitalizado'})
export class CapitalizadoPipe implements PipeTransform {
    transform(value: string, ...args: any[]): any { // '...' operador rest
        console.log(value);
        console.log(args[0]);
        const todas = args[0] || false;
        console.log(todas);
        value = value.toLowerCase();
        const words = value.split(' ');

        if (todas) {
            // tslint:disable-next-line: forin
            for ( const i in words ) {
                words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            }
        } else {
            words[0] = words[0][0].toUpperCase() + words[0].substr(1);
        }
        return words.join(' ');
    }
}