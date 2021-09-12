import { initializeApp } from 'firebase/app';
import { getFirestore, doc } from 'firebase/firestore/lite';
import { firebaseConfig } from '../keys/firebase';

// Inicializar la base de datos de Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore( app );

// Buscar documentos en las colecciones de usuario
const getUserColection = ( id:string ) => {
  return doc( db, 'users', id );
}

export {db, getUserColection};