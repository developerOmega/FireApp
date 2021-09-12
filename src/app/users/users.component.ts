import { Component, OnInit } from '@angular/core';
import { collection, getDocs, setDoc, updateDoc, deleteDoc } from 'firebase/firestore/lite';
import * as firebase from '../../config/db';

import { UserNode } from '../Model/user-node';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  // Propiedad de usuario ( propiedad data es el modelo de formularios
  user: UserNode = new UserNode;

  // Propiedad lista de usuarios
  users: UserNode[] = [];

  // modelo para email
  email: string = "";

  // Propiedad que valida si el formulario es nuevo
  isNew: boolean = true;

  constructor() {}
  
  async ngOnInit() {

    try {

      // Obtener lista de documentos de firebase.
      const userCol = collection( firebase.db, 'users');
      const userSnapshot = await getDocs( userCol )
      
      // Documentos de colección agregar en propiedad de usuarios
      this.users = userSnapshot.docs.map( doc => {
        
        return {
          id: doc.id,
          data: {
            id: doc.id,
            name: doc.data().name,
            datetime: doc.data().datetime,
            tell: doc.data().tell,
            emails: doc.data().emails,
            no_emails: doc.data().no_emails
          }
        }

      });

    } catch (error) {
      console.error(error);
    }
  }



  // ================== Método para controlar la db de Firestore =======================

  // Método para agregar usuarios a base de datos de Firestore
  async addUser() {

    // Constante que valida el formulario
    const validate = UserNode.validate( this.user.data ); 

    // Si hay un espacio vacío en el formulario, Mostrar mensaje de error
    if ( validate.ok == false ) {  
      console.log( validate );
      return;
    }

    try {
      
      // El id del documento es el nombre del usuario
      this.user.id = this.user.data.name;
      
      // Apilar objeto a propiedad de users
      this.users.unshift( this.user );
      
      // Agregar data a base de datos de Firestore
      const userCol = firebase.getUserColection( this.user.data.name )
      await setDoc( userCol, this.user.data );

    } catch (error) {
      console.error(error); 
    }
  }

  // Actualizar usuario de la base de datos de Firestore
  async updateUser() {
    try { 
      const userCol = firebase.getUserColection( this.user.id );
      await updateDoc( userCol, <any> this.user.data );
      this.isNew = true;

    } catch (error) {
      console.error(error)
    }
  }

  // Eliminar usuario de la base de datos de Firestore
  async deleteUser( data:UserNode ) {
    try {
      
      const userCol = firebase.getUserColection( data.id );
      await deleteDoc( userCol );

      // Quitar usuario de la lista de usuarios
      const index = this.users.indexOf( data );
      this.users.splice( index, 1 );

    } catch (error) {
      console.error(error);
    }
  }

  

  // =============== Métodos para controlar información de formulario ====================

  // Método que selecciona el usuario de una lista al momento de presionar el botón de editar.
  selectUser( data:UserNode ) {
    this.isNew = false;
    this.user = data;
  }
  
  // Limpiar la data del formulario
  cleanUser() {
    this.user = new UserNode;
    this.isNew = true;
  }



  // ============================ Métodos para email =================================

  // Método para agregar(apilar) email a propiedad emails de data de usuario
  addEmail() {
    this.user.data.emails.unshift( this.email );

    // Propiedad no_emails de data de usuario es igual al contador de emails
    this.user.data.no_emails = this.user.data.emails.length;
    this.email = "";
  }

  // Método para quitar email de propiedad emails
  dropEmail(email:string) {
    const index = this.user.data.emails.indexOf( email );
    this.user.data.emails.splice( index, 1 );
  }

}
