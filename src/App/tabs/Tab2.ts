export { Tab2 };

import { InputTextField } from "../fields/InputTextField";

class Tab2 {

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
        const telefono = new InputTextField({
            fieldId: "telefono",
            field_label_title: "Teléfono de la empresa",
            placeHolder: "Ej. 666 666 666",
            help_message: "Debe poner solo el teléfono",
            info_message: "solo números",
            error_message: "El campo no puede estar vacío",
            validate_message: "El valor debe ser mayor de 2 caracteres",
            bad_characters_message: "Carácteres, no permitidos",
            required: true
        });
        this.fields["telefono"] = telefono;

        const provincia = new InputTextField({
            fieldId: "provincia",
            field_label_title: "Provincia de la empresa",
            placeHolder: "Ej. Valencia",
            help_message: "Debe poner solo la provincia de la empresa",
            info_message: "solo texto",
            error_message: "El campo no puede estar vacío",
            validate_message: "El valor debe ser mayor de 2 caracteres",
            bad_characters_message: "Carácteres, no permitidos",
            required: true
        });
        this.fields["provincia"] = provincia;
    }
}