/* IMPORTACIONES DE ESTRUCTURAS */


export class DataBase{
    constructor(){
        /* ACÁ SE INSTANCIARAN TODAS LAS ESTRUCTURAS A UTILIZAR */
        this.nombre = "harry"
    }
    
    /* FUNCIONES PARA MANEJO DE INFORMACION */
    nombre(){
        console.log(this.nombre)
    }
}

export const DB = DataBase()
export default DB
