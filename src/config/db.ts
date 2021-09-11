import { initializeApp } from 'firebase/app';
import { getFirestore, doc } from 'firebase/firestore/lite';
import { firebaseConfig } from '../keys/firebace';

const app = initializeApp(firebaseConfig);
const db = getFirestore( app );

const getUserColection = ( id:string ) => {
  return doc( db, 'users', id );
}

export {db, getUserColection};
