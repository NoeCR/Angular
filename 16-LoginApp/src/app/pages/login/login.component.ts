import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/user.interface';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public user: IUser;
  public isSubmitted = false;
  remember = false;

  constructor(  private formBuilder: FormBuilder,
                private ls: LoginService,
                private router: Router ) { }

  ngOnInit() {
    const userEmail = localStorage.getItem('userEmail') || '';
    if ( userEmail ) { this.remember = true; }
    this.loginForm = this.formBuilder.group({
      email: [ userEmail, [ Validators.required, Validators.email ] ],
      password: ['', [
                        Validators.required,
                        Validators.pattern('^[a-zA-Z0-9_.+-]+$'),
                        Validators.minLength( 6 )
                      ]
                ]
    });
  }

  get formControls() { return this.loginForm.controls; }

  onSubmit() {
    this.isSubmitted = true;
    if ( this.loginForm.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor.'
    });
    Swal.showLoading();

    this.ls.login(this.loginForm.value)
      .subscribe(
        res => {
          Swal.close();

          if ( this.remember ) {
            localStorage.setItem('userEmail', this.loginForm.value.email );
          } else {
            localStorage.removeItem('userEmail');
          }

          this.router.navigateByUrl('/home');
        },
        (err) => {
          Swal.fire({
            type: 'error',
            title: 'Error al autenticar',
            text: err.error.error.message
          });
        }
      );
  }
}
