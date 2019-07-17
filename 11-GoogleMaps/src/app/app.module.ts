import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Anglar Material module
import { MaterialModule } from './material.module';
// MAP API
import { AgmCoreModule } from '@agm/core';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MapaComponent } from './components/mapa/mapa.component';
import { MapaEditComponent } from './components/mapa/mapa-edit.component';

@NgModule({
  entryComponents: [
    MapaEditComponent
  ],
  declarations: [
    AppComponent,
    MapaComponent,
    MapaEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: environment.MapApiKey
    }),
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
