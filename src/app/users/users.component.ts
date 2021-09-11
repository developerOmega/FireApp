import { Component, OnInit } from '@angular/core';
import { collection, getDocs, setDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore/lite';
import * as firebase from '../../config/db';

import { User } from '../Model/user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  user: User = this.defaultUser();
  users: User[] = <User[]> [];
  email: string = "";
  id: string = "";
  isNew: boolean = true;

  constructor() {}

  private defaultUser(): User {
    return {
      name: "",
      datetime: "",
      tell: 0,
      emails: [],
      no_emails: 0
    }
  }
  
  async ngOnInit() {

    try {
      const userCol = collection( firebase.db, 'users');
      const userSnapshot = await getDocs( userCol )
      
      this.users = userSnapshot.docs.map( doc => {
        return {
          name: doc.data().name,
          datetime: doc.data().datetime,
          tell: doc.data().tell,
          emails: doc.data().emails,
          no_emails: doc.data().no_emails
        }
      } );

      console.log( this.users )

    } catch (error) {
      console.error(error);
    }
  }

  addUser() {
    
    this.users.unshift( this.user );

    const userCol = firebase.getUserColection( this.user.name )
    setDoc( userCol, this.user );
  }

  addEmail() {
    this.user.emails.unshift( this.email );
    this.user.no_emails = this.user.emails.length;
    this.email = "";
  }

  selectUser( data:User ) {
    this.isNew = false;
    this.user = data;
    this.id = data.name;
  }
  
  cleanUser() {
    this.user = this.defaultUser();
    this.id = "";
    this.isNew = true;
  }


  async updateUser() {
    try {
      const userCol = firebase.getUserColection( this.id );
      await updateDoc( userCol, <any> this.user );

      this.id = "";
      this.isNew = true;

    } catch (error) {
      console.error(error)
    }
  }

  async deleteUser( data:User ) {
    try {
      
      const userCol = firebase.getUserColection( data.name );
      await deleteDoc( userCol );

      const index = this.users.indexOf( data );
      this.users.splice( index, 1 );

    } catch (error) {
      console.error(error);
    }
  }

}
