import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-style',
  template: `
    <p [ngStyle]="{ 'font-size': fontSize + 'px'}" [style.color]="'blue'" [style.margin.px]="50">
      Primera etiqueta 'p'
    </p>

    <button class="btn btn-primary" (click)="fontSize = fontSize + 5">
      <i class="fa fa-plus"></i>
    </button>

    <button class="btn btn-primary" (click)="fontSize = fontSize - 5">
      <i class="fa fa-minus"></i>
    </button>
  `,
  styles: []
})
export class NgStyleComponent implements OnInit {

  fontSize: number = 20;
  constructor() { }

  ngOnInit() {
  }

}
