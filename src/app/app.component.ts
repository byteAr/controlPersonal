
import { Component } from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {

  dni=''

  constructor(private messageService: MessageService) {}

  auth() {
    if(this.dni === '') {
      this.messageService.add({severity:'error', summary:'', detail:'Debe ingresar un número de DNI'});
      return
    }
    console.log(this.dni);
    this.messageService.add({severity:'success', summary:'', detail:'Esta persona se encuentra autorizada a ingresar'});
  }
}
