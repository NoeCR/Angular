import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  forma: FormGroup;

  usuario: Object = {
    nombreCompleto: {
      nombre: 'Noé',
      apellido: 'CR'
    },
    email: 'ncr@gmail.com',
    pasatiempos: [null]
    // pasatiempos: ['correr', 'dormir', 'comer']
  }

  constructor() {
    this.forma = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre': new FormControl('', [ Validators.required, Validators.minLength(3) ]),
        'apellido': new FormControl('', [
                                        Validators.required,
                                        this.noHerrera
                                        ]),
      }),
      'email': new FormControl('', [
                                      Validators.required,
                                      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
                                    ]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      'username': new FormControl('', Validators.required, this.existeUsuario),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl(),
    });

    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind( this.forma )
    ]);
    // this.forma.setValue(this.usuario);
    // console.log(this.usuario);

    // Observa cualquier cambio en el formulario
    // this.forma.valueChanges
    //   .subscribe( data => {
    //     console.log(data);
    //   })

    // Observa solo los cambios en un elemento del formulario
    this.forma.controls['username'].valueChanges
      .subscribe( data => {
        console.log(data);
      })
    this.forma.controls['username'].statusChanges
    .subscribe( data => {
      console.log(data);
    })
  }

  ngOnInit() {
  }

  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  noHerrera( control: FormControl): { [s:string]: boolean } {

    if (control.value === 'herrera') {
      return {
        noherrera: true
      };
    }
    return null;
  }

  existeUsuario( control: FormControl ): Promise<any>|Observable<any> {
    const promesa = new Promise(
      ( resolve, reject ) => {
        setTimeout( () => {
          if ( control.value === 'strider') {
            resolve( { existe: true } );
          } else {
            resolve( null );
          }
        }, 3000 );
      }
    );
    return promesa;
  }

  noIgual( control: FormControl): { [s:string]: boolean } {

    let forma: any = this;
    if ( control.value !== forma.controls['password1'].value ) {
      return {
        noiguales: true
      };
    }
    return null;

  }
  // Otra forma de construir el metodo para que el contexto sea el mismo del componente y poder usar el this sin necesidad del bind()
  // noIgual = (control: FormControl):{ [s:string]:boolean } => {
  //   if ( control.value !== this.forma.controls['password1'].value ) {
  //     return{
  //       noigual:true
  //     }
  //   }
  //   return null
  // }
  guardarCambios() {
    console.log(this.forma);
    console.log(this.forma.value);
    // this.forma.reset();
  }

}
