import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { IUser } from 'src/app/models/user.interface';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public registerForm: FormGroup;
  public user: IUser;
  public isSubmitted = false;
  remember = false;

  constructor( private formBuilder: FormBuilder,
               private ls: LoginService,
               private router: Router ) { }

  ngOnInit() {
    const userEmail = localStorage.getItem('userEmail') || '';
    const userName = localStorage.getItem('userName') || '';
    if ( userEmail ) { this.remember = true; }
    this.registerForm = this.formBuilder.group({
      email: [ userEmail, [ Validators.required, Validators.email ] ],
      name: [ userName, [ Validators.required, Validators.minLength( 2 ) ]],
      password: ['', [
                        Validators.required,
                        Validators.pattern('^[a-zA-Z0-9_.+-]+$'),
                        Validators.minLength( 6 )
                      ]
                ]
    });
  }

  get formControls() { return this.registerForm.controls; }

  onSubmit() {
    this.isSubmitted = true;
    if ( this.registerForm.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor.'
    });
    Swal.showLoading();

    this.ls.register( this.registerForm.value )
      .subscribe(
        res => {
          Swal.close();

          if ( this.remember ) {
            localStorage.setItem('userEmail', this.registerForm.value.email );
            localStorage.setItem('userName', this.registerForm.value.name );
          } else {
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
          }

          this.router.navigateByUrl('/home');
        },
        (err) => {
          Swal.fire({
            type: 'error',
            title: 'Error al registrarse',
            text: err.error.error.message
          });
        }
      );
  }

}
