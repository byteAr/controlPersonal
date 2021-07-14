
import { Component } from '@angular/core';
import {MessageService} from 'primeng/api';
import * as XLSX from 'xlsx';
import { Personal } from './interfaces/personal.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {

  title= '';
  carga=true;
  disabled:boolean = true;  
  dni='';
  personal:any;

  constructor(private messageService: MessageService) {}

  auth() {
    const dni = parseInt(this.dni);
    const personaEncontrada = this.personal.find((persona:Personal) => {
      return dni == persona.DNI
    })
 
    switch(personaEncontrada) {
      case undefined:
        this.messageService.add({severity:'error', summary:'ACCESO DENEGADO', detail:'El DNI proporcionado no corresponde a una persona autorizada a Ingresar'});
        break;
      case '':
        this.messageService.add({severity:'error', summary:'', detail:'Debe ingresar un número de DNI'});
        break;
      case personaEncontrada:
        this.messageService.add({severity:'success', summary:'INGRESO AUTORIZADO', detail:`${personaEncontrada.NOMBRE} ${personaEncontrada.APELLIDO} - ${personaEncontrada.DESTINO}`});
        break;
      default:
        this.messageService.add({severity:'success', summary:'', detail:`Por favor ingrese un dni válido`});
    }    
    
  }

  cargar(event:any) {
    this.carga = false;
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event:any) => {
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, {type:'binary'});
      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        this.personal = data;
      })

    }
  }


}
