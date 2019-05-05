import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html'
})
export class ClassesComponent implements OnInit {

  alerta: string = "alert-danger";

  propiedades: Object = {
    danger: false
  }

  loading: boolean = false;
  calculate: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ejecutar() {
    this.loading = true;

    setTimeout(() => this.loading = false, 3000);
  }

  calcular() {
    this.calculate = true;

    setTimeout(() => {
      this.calculate = false;
    }, 5000);

    setInterval(function () {
      const WAIT = document.getElementById("waiting");
      if (WAIT.innerHTML.length > 5) {
        WAIT.innerHTML = '';
      } else {
        WAIT.innerHTML += '.';
      }
    }, 500);

    // Set Dots until waiting 
    // var dots = setInterval(function () {
    //   var wait = document.getElementById("waiting");
    //   if (wait.innerHTML.length > 5) {
    //     wait.innerHTML = "";
    //   } else {
    //     wait.innerHTML += ".";
    //   }
    // set and remove dots
    // if (this.calculate) {
    //   wait.innerHTML += ".";
    // } else {
    //   wait.innerHTML = wait.innerHTML.substring(1, wait.innerHTML.length);
    //   if (wait.innerHTML === '') {
    //     this.calculate = true;
    //   }
    // }
    // if (wait.innerHTML.length > 9) {
    //   this.calculate = false;
    // }

    // }, 500);
  }

}
