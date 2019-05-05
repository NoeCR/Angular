import {
  Component,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy
} from "@angular/core";

@Component({
  selector: "app-home",
  template: `
    <!--Estilos en linea mediante ngStyle o [style.tag]-->
    <app-ng-style></app-ng-style>
    <hr />
    <!-- Scope de estilos en componentes -->
    <app-css></app-css>
    <br />
    <app-classes></app-classes>
    <hr />

    <p [appResaltado]="'#adf65e'">
      Hola
    </p>
    <hr />

    <app-ng-switch></app-ng-switch>
    <hr />
  `,
  styles: []
})
export class HomeComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy {
  constructor() {
    console.log("Constructor");
  }

  ngOnInit() {
    console.log("OnInit");
  }

  ngOnChanges() {
    console.log("OnChanges");
  }
  ngDoCheck() {
    console.log("DoCheck");
  }
  ngAfterContentInit() {
    console.log("AfterContentInit");
  }
  ngAfterContentChecked() {
    console.log("AfterContentChecked");
  }
  ngAfterViewInit() {
    console.log("AfterViewInit");
  }
  ngAfterViewChecked() {
    console.log("AfterViewChecked");
  }
  ngOnDestroy() {
    console.log("OnDestroy");
  }
}
