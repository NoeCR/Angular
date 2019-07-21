import { Directive,
        EventEmitter,
        ElementRef,
        HostListener,
        Input,
        Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  // private const _validFileExtensions = ['.jpg', '.jpeg', '.bmp', '.gif', '.png'];

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any ) {
    this.mouseSobre.emit( true );
    this._prevenirDetener( event );
  }

  @HostListener('dragleave', ['$event'])
    public onDragLeave( event: any ) {
      this.mouseSobre.emit( false );
    }

  @HostListener('drop', ['$event'])
    public onDrop( event: any ) {
      const transferencia = this._getTransferencia( event );
      if ( !transferencia ) {
        return;
      }
      this._extraerArchivos( transferencia.files );
      this._prevenirDetener( event );
      this.mouseSobre.emit( false );
    }

  private _getTransferencia( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos( archivosLista: FileList ) {
    console.log( archivosLista );
    // tslint:disable-next-line: forin
    for ( const propiedad in Object.getOwnPropertyNames( archivosLista ) ) {
      const archivoTemporal = archivosLista[propiedad];

      if ( this._arvhicoPuedeSercargado( archivoTemporal ) ) {
        const nuevoArchivo = new FileItem( archivoTemporal );
        this.archivos.push( nuevoArchivo );
      }
    }
    console.log(this.archivos);
  }
  // Validaciones
  private _arvhicoPuedeSercargado( archivo: File ): boolean {
    if ( !this._archivoRepetido( archivo.name ) && this._esImagen( archivo.type ) ) {
      return true;
    } else {
      return false;
    }
  }

  private _prevenirDetener( event: Event ) {
    event.preventDefault();
    event.stopPropagation();
    event.returnValue = false;
  }

  private _archivoRepetido( nombrearchivo: string): boolean {
    for ( const archivo of this.archivos ) {
      if ( archivo.nombreArchivo === nombrearchivo ) {
        console.log(`El archivo ${nombrearchivo} ya esta agregado`);
        return true;
      }
    }
    return false;
  }

  private _esImagen( tipoArchivo: string ): boolean {
    console.log( tipoArchivo );
    return ( tipoArchivo === '' || tipoArchivo === undefined ) ? false : tipoArchivo.startsWith('image');
    // Leeremos el Doctype y si el tipoArchivo contiene un formato de imagen valido devolvera un numero positivo
    // o '-1 = false' si no encuentra ninguno. Otra forma de validarlo
    // this._validFileExtensions.indexOf( tipoArchivo ) !== -1
  }

}
