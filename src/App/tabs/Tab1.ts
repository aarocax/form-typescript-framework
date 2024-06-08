export { Tab1 };

import { InputTextField } from "../fields/InputTextField";

class Tab1 {

    language: string;
    fields: any;
    pass: boolean;  // si todos los campos estan validados

    constructor(language: string){
        this.language = language;
        this.fields = new Array();
        this.pass = false;
        this.setTabTexts();
        this.setFields();
    }

    /*
     * Comprueba si todos los campos del tab tiene los datos completado y correctos
     **/
    validate() {
        var valid = true;
        Object.entries(this.fields).forEach((e: any, i:number, a: any)=>{
        if(e[1].validate() === false) {
            valid = false;
        }
        });
        this.pass = valid;
        return this.pass;
    }

    setTabTexts() {

    }

    setFields() {
        const direccion = new InputTextField({
            fieldId: "direccion",
            field_label_title: "Dirección de la empresa",
            placeHolder: "Ej. Avd. del mar, 5",
            help_message: "Debe poner solo la dirección",
            info_message: "solo texto",
            error_message: "El campo no puede estar vacío",
            validate_message: "El valor debe ser mayor de 2 caracteres",
            bad_characters_message: "Carácteres, no permitidos",
            required: true
        });
        this.fields["nombre_contacto"] = direccion;

        const nombre_comercial = new InputTextField({
            fieldId: "nombre_comercial",
            field_label_title: "Nombre comercial de la empresa",
            placeHolder: "Ej. Coca Cola",
            help_message: "Debe poner solo el nombre comercial de la empresa",
            info_message: "solo texto",
            error_message: "El campo no puede estar vacío",
            validate_message: "El valor debe ser mayor de 2 caracteres",
            bad_characters_message: "Carácteres, no permitidos",
            required: true
        });
        this.fields["nombre_empresa"] = nombre_comercial;
    }
}