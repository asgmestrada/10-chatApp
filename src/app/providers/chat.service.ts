import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Mensaje } from '../inteface/mensaje.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

// tener map importado
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  usuario: any = {};
  authGoogle = "google";
  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth)
  {
   this.afAuth.authState.subscribe(usuario =>
     {
      console.log("Estado del Usuario", usuario);


     if(!usuario)
     {
       return;
     }
     this.usuario.nombre = usuario.displayName;
     this.usuario.uid = usuario.uid;
    });
  }

  login(proveedor: string)
   {
     if(proveedor===this.authGoogle)
      {
       this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      }
      else
      {
          this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
      }
      {

      }

   }

     logout()
     {
       this.usuario = {};
       this.afAuth.auth.signOut();
     }


  cargarMensajes()
  {
   this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc')
                                                                          .limit(5));

   return this.itemsCollection.valueChanges()
                              .pipe(
                               map((response: Mensaje[]) =>
                               {
                               console.log(response);
                               this.chats = [];
                               for (let mensaje of response)
                               {
                                 this.chats.unshift(mensaje);
                               }
                               return this.chats;
                               })
 )}

 agregarMensaje(texto: string)
 {
   let mensaje: Mensaje =
   {
     nombre: this.usuario.nombre,
     mensaje: texto,
     fecha: new Date().getTime(),
     uid: this.usuario.uid
   }
   return this.itemsCollection.add(mensaje);
 }

}
