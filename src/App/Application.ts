import { stateMachine } from "./stateMachine/StateMachine"
import { translator as t, setTranslations } from './languages/Translator';
import { Tab0 } from "./tabs/Tab0";
import { Tab1 } from "./tabs/Tab1";
import { Tab2 } from "./tabs/Tab2";
import { Tab3 } from "./tabs/Tab3";
import { Tab4 } from "./tabs/Tab4";
import { Tab5 } from "./tabs/Tab5";
import { Tab6 } from "./tabs/Tab6";


class Application {

	tabsFields: Array<any>;
	language: string;
	
	form = document.querySelector('#form-spark') as HTMLFormElement; 
	controls = this.form?.querySelector('section[data-type="form-controls"]');
	nextButton = this.controls?.querySelector('#next') as HTMLButtonElement;
  	previousButton = this.controls?.querySelector('#previous') as HTMLButtonElement;
	submitButton = this.controls?.querySelector('#send-form') as HTMLButtonElement;

	tabs: NodeListOf<HTMLElement> = document.querySelectorAll('[data-type="tab"]');

	translationURL: string;
	
	
	constructor() {
		this.tabsFields = new Array;
		this.language = "es";
        stateMachine.setTabs(this.tabs);
		stateMachine.setControlButtons(this.nextButton, this.previousButton, this.submitButton);

        // this.nextButton.style.display = "block";
        // this.previousButton.style.display = "block";

		this.translationURL = (window.location.hostname !== "localhost") ? "/wp-content/bbva_spark_form_2022/translations/translations.json" : "translations/translations.json";

		fetch(this.translationURL)
			.then(response => response.json())
			.then((todo: any) => {
				console.log(typeof todo[0]);
				console.log(todo[0]);
				setTranslations(todo[0]);
				this.setEvents();
				this.setUpFields();

				stateMachine.transition('start');
				console.log(stateMachine.getCurrentStateName());

			})
			.catch(error => {
				console.error(error);
			});

	}

	private setEvents() {
        this.nextButton.addEventListener('click', (e) => {
          this.showTab('next');
        });
    
        this.previousButton.addEventListener('click', (e) => {
          this.showTab('previous');
        });
    }

	private showTab(direction: string) {
        if ("next" === direction) {
            stateMachine.transition('next');
            console.log(stateMachine.getCurrentStateName());
        }

        if ("previous" === direction) {
            stateMachine.transition('previous');
            console.log(stateMachine.getCurrentStateName());
        }
    }

	private setUpFields() {
		this.tabsFields.push(new Tab0(this.language));
		this.tabsFields.push(new Tab1(this.language));
		this.tabsFields.push(new Tab2(this.language));
		this.tabsFields.push(new Tab3(this.language));
		this.tabsFields.push(new Tab4(this.language));
		this.tabsFields.push(new Tab5(this.language));
		this.tabsFields.push(new Tab6(this.language));
	}

	

}

new Application();