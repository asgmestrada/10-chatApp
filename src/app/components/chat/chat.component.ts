import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ],
})
export class ChatComponent implements OnInit {

  mensaje: string ="";
  elemento: any;

  constructor(public chatService: ChatService)
  {
    this.chatService.cargarMensajes().subscribe(()=>
  {
    setTimeout( ()=>
  {

    this.elemento.scrollTop = this.elemento.scrollHeight;
  },20);
  });
  }

  ngOnInit(): void
  {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje()
  {
  console.log(this.mensaje);

  if(this.mensaje.length ===0 )
  {
    return null;
  }

  this.chatService.agregarMensaje(this.mensaje)
                   .then( ()=>console.log("Mensaje Enviado") )
                   .catch((error)=>console.error("Error al enviar", error));
  }

}
