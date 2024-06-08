export { BaseField, Field, FieldParams };

/*
 * Propiedades y métodos para la clase base
 */
interface Field {
	fieldId: string;              // Identificador único para el campo
	wrapper: HTMLElement|null;    // Etiqueta html más externa que abarca todo el campo y sus componentes (label, messages, ...)
	field: HTMLInputElement|null; // Elemento html input de tipo text
	label: HTMLLabelElement|null; // Elemento html que contine el label del campo
	show: Function;								// Muestra el campo
	hide: Function;								// Oculta el campo
	getId: Function;							// Obtiene el id del campo
	getValue: Function;						// Obtiene el valor del campo
	setValue: Function;						// Establece el valor del campo
	pass: boolean;								// Determina si el valor del campo pasa la validación
}

/*
 * Parámetros que se le deben pasar al constructor de un campo para inicializarlo
 * y a la clase Base
 */
interface FieldParams {
	fieldId: string,  				// Identificador único para el campo
	field_label_title: string,		// Texto que muestra el label
	placeHolder?: string|null,   	// Texto placeholder
	help_message?: string|null,		// Texto de ayuda
  	info_message?: string|null, 	// Texto información adicional
	error_message: string,     		// Texto del mensaje de error
	validate_message: string,		// Texto de validación del campo
	bad_characters_message: string,  // Texto mensaje carácteres no válidos
	required?: boolean|null,  		//si el campo es o no obligatorio
}

/*
 * Parámetros que se le deben pasar al constructor de un campo para reinicializarlo
 */
interface FieldParamsReset {
	field_label_title: string,		// Texto que muestra el label
	placeHolder?: string|null,   	// Texto placeholder
	help_message?: string|null,		// Texto de ayuda
	info_message?: string|null, 	// Texto información adicional
	error_message: string,     		// Texto del mensaje de error,
	validate_message: string,		// Texto de validación del campo
	bad_characters_message: string,  // Texto mensaje carácteres no válidos
	required?: boolean|null,  		//si el campo es o no obligatorio
}

class BaseField implements Field {

	fieldId: string;
	wrapper: HTMLElement|null;
	field: HTMLInputElement|null;
	label: HTMLLabelElement|null;
	helpMessage: HTMLSpanElement|null;
	infoMessage: HTMLSpanElement|null;
	errorMessage: string;
	validateMessage: string;
	badCharactersMessage: string;
	placeHolder = "" as string|null;
	required: boolean|null;
	pass = false as boolean;

	constructor(params: FieldParams){
		this.fieldId = params.fieldId;
		this.wrapper = document.querySelector('[data-name="'+params.fieldId+'"]');
		this.field = this.wrapper?.querySelector('input[name="'+params.fieldId+'"]') as HTMLInputElement;
		this.label = this.wrapper?.querySelector('label.title') as HTMLLabelElement;
		this.label.innerText = params.field_label_title;
		this.helpMessage = this.wrapper?.querySelector('.flex-row.interrogacion .input__description-message') as HTMLDivElement;
		this.infoMessage = this.wrapper?.querySelector('[data-type="field-wrapper"] .input__description-message') as HTMLDivElement;
		this.required = (params.required !== undefined && params.required !== null) ? params.required : true;
		this.errorMessage = params.error_message;
		this.validateMessage = params.validate_message;
		this.badCharactersMessage = params.bad_characters_message;
		this.initField(params);

	}

	initField(params: FieldParamsReset) {

		this.setValid(false);

		// Establece el placeholder del campo si se ha definido en los parámetros
		if(params.placeHolder === "" || params.placeHolder === undefined || params.placeHolder === null){
			this.placeHolder = null;
		} else {
			this.placeHolder = params.placeHolder;
			if(this.field) {
				this.field.placeholder = (this.placeHolder) ? this.placeHolder : "";
			}
		}

		// Establece el mensaje de ayuda del campo si se ha definido en los parámetros
		if(params.help_message === "" || params.help_message === undefined || params.help_message === null){
			this.hideHelp();	
		} else {
			const helpMessageText = this.helpMessage?.querySelector('span') as HTMLSpanElement
			helpMessageText.innerHTML = params.help_message;
		}

		// Establece el mensaje de información del campo si se ha definido en los parámetros
		if(params.info_message === "" || params.info_message === undefined || params.info_message === null){
			this.hideInfo();			
		} else {
			//this.showInfo(params.info_message);	
			const infoMessageText = this.infoMessage?.querySelector('span') as HTMLSpanElement
			infoMessageText.innerHTML = params.info_message;
		}
	}

	/*
     * Muestra el mensaje de error en el campo
     */
	error(input: HTMLElement, message: string) {
		input.classList.remove('success');
		input.classList.add('error');
		const element = this.wrapper as HTMLElement;
		element.querySelector('[data-type="field-wrapper"]')?.classList.add("form__error", "has-value");
		const error = this.wrapper?.querySelector('.fielderror') as HTMLSpanElement;
		error.style.display = "block";
		error.innerText = message;
		return false;
	}

	/*
     * Elimina el mensaje de error del campo
     */
	success(input: HTMLElement) {
		input.classList.remove('error');
		input.classList.add('success');
		const element = input.parentNode as HTMLElement;
		element.classList?.remove("form__error", "has-value");
		const error = this.wrapper?.querySelector('.fielderror') as HTMLSpanElement;
		error.style.display = "none";
		error.innerText = "";
		if(input.getAttribute('data-name') == "producto"){
			const errorElement = input.querySelector('[data-type="field-wrapper"]') as HTMLDivElement;
			if(errorElement){
				errorElement.classList?.remove("form__error", "has-value");
			}
		}
	  	return true;
	}

	/*
	 * Muestra el campo completo
	 */
	show(): void {
		if (this.wrapper) {
			this.wrapper.style.display = "block";
		}
	}

	/*
	* Oculta el campo completo
	*/
	hide(): void {
		if (this.wrapper) {
			this.wrapper.style.display = "none";
		}
	}

	/*
	 * Show info message
	 */
	showInfo(infoMessage: string): void {
		if(this.infoMessage) {
			this.infoMessage.style.display = "block";
			const infoMessageText = this.infoMessage.querySelector('span') as HTMLSpanElement
			infoMessageText.innerHTML = infoMessage;
		}
	}

	/*
	 * Hide info message
	 */
	hideInfo(): void {
		if(this.infoMessage) {
			this.infoMessage.style.display = "none";
			const infoMessageText = this.infoMessage.querySelector('span') as HTMLSpanElement
			infoMessageText.innerHTML = "";
		}
	}

	/*
	 * Show help message
	 */
	showHelp(helpMessage: string) {
		if(this.helpMessage) {
			this.helpMessage.style.display = "block";
			const helpMessageText = this.helpMessage.querySelector('span') as HTMLSpanElement
			helpMessageText.innerHTML = helpMessage;
		}
	}

	/*
	 * Hide help message
	 */
	hideHelp(): void {
		if(this.helpMessage) {
			this.helpMessage.style.display = "none";
			const helpMessageText = this.helpMessage.querySelector('span') as HTMLSpanElement
			helpMessageText.innerHTML = "";
		}
	}

	/*
	 * Get field Id
	 */
	getId(): string {
		return this.fieldId;
	}

	/*
	 * Get field value
	 */
	getValue(): any {
		return this.field?.value;
	}

	/*
	 * Set field value
	 */
	setValue(value: string): void {
		if(this.field) {
			this.field.value = value;
		}
	}

	/*
	 * get if field if validate
	 */
	getValid(): boolean {
		return this.pass;	
	}

	/*
	 * Establece que el campo no ha sido validado
	 */
	setValid(value: boolean): void {
		this.pass = value;
	}

	/*
	 * Restaura las opciones del campo
	 */
	resetField(params: FieldParamsReset): void {
		this.initField(params);
	}
}