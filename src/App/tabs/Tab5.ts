export { Tab5 };

import { InputTextField } from "../fields/InputTextField";

class Tab5 {

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
        
    }
}