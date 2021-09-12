import { User } from '../Interfaces/user';
import { Validate } from '../Interfaces/validate';

// Modelo para Usuarios

export class UserNode {

  id: string = "";
  data: User = {
    name: "",
    datetime: "",
    tell: 0,
    emails: [],
    no_emails: 0
  }

  // Validación para el formulario de usuarios, retorna objeto con con propiedades ok y message
  // Recibe datos: data:User ---> data del registro del usuario
  static validate( data:User ): Validate {
    
    // Si la propiedad name está vacía, retorna mensaje de error
    if( data.name == "" ) {
      return {
        ok: false,
        model: "name",
        message: "* Nombre obligatorio"
      }
    }

    // Si la propiedad datetime está vacía, retorna mensaje de error
    if( data.datetime == "") {
      return {
        ok: false,
        model: "datetime",
        message: "* Fecha obligatoria"
      }
    } 

    // Si la propiedad tell es 0, retorna mensaje de error
    if( data.tell == 0 ) {
      return {
        ok: false,
        model: "tell",
        message: "* Telefono obligatorio"
      }
    }

    // Si hay menos de un email, retorna mensaje de error
    if( data.emails.length < 1 ) {
      return {
        ok: false,
        model: "emails",
        message: "* Agregar por lo menos un email"
      }
    } 
    
    return { ok: true }

  }

}
