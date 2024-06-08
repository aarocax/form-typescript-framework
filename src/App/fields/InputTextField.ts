export { InputTextField };

import { BaseField, Field, FieldParams } from "./BaseField";

class InputTextField extends BaseField {

    constructor(params: FieldParams) {
        super(params);

        this.field?.addEventListener('change', (ev) => {
			const field = ev.target as HTMLInputElement
			this.validate();
		});
    }

    validate() {
        console.log("validate: " + this.getId());
        const field = this.field as HTMLInputElement;
		const invalidChars = /[!@#%^*()$_+\=\[\]{};:"\\|<>\/?~]/;
		var validChars = false;
		var validlength = false;
        this.pass = false;

        if(field.value.trim() !== "") { //tiene contenido
            validlength = field.value.trim().length < 2 ? this.error(field as HTMLElement, this.validateMessage) : this.success(field as HTMLElement);
			if(validlength) {
				validChars = (invalidChars.test(field.value.trim()) === true) ? this.error(field as HTMLElement, this.badCharactersMessage) : this.success(field as HTMLElement);
			}
			this.pass = (validChars && validlength) ? true : false;
        } else {
            if (this.required) { // es obligatorio
				validlength = field.value.trim().length < 2 ? this.error(field as HTMLElement, this.errorMessage) : this.success(field as HTMLElement);
				this.pass = validlength;
			} else { // no es obligatorio
				this.success(field as HTMLElement)
				this.pass = true;
			}
        }

        return this.pass;
    }
}