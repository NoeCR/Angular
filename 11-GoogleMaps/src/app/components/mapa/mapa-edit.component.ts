import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormGroup } from '@angular/forms';

export interface IdialogData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-mapa-edit',
  templateUrl: './mapa-edit.component.html',
  styleUrls: ['./mapa-edit.component.css']
})
export class MapaEditComponent implements OnInit {

  forma: FormGroup;

  constructor(public dialogRef: MatDialogRef<MapaEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IdialogData,
              public fb: FormBuilder) {
    this.forma = fb.group({
      'title': data.title,
      'description': data.description
    });
  }

  ngOnInit() { }

  guardarCambios(){
    console.log(this.forma.value);
    this.dialogRef.close(this.forma.value);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
