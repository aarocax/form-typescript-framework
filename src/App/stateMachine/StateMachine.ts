export { stateMachine };

interface State {
    handleInput(input: string, tabs: any, control: Map<string, any>): void;
    name: string;
}

class StateMachine {
    private currentState: State;
	private tabs: NodeListOf<HTMLElement>|null;
	private nextButton = null as HTMLButtonElement|null;
  	private previousButton = null as HTMLButtonElement|null;
	private submitButton = null as HTMLButtonElement|null;
	private control = new Map();

    constructor(private states: Map<string, State>, private initalState: State) {
        this.currentState = this.initalState;
		this.tabs = null;
    }

    public transition(input: string): void {
        this.currentState.handleInput(input, this.tabs, this.control);
    }

	public setTabs(tabs: NodeListOf<HTMLElement>): void {
		this.tabs = tabs;
	}

	public setControlButtons(next: HTMLButtonElement, previous: HTMLButtonElement, submit: HTMLButtonElement): void {
		this.control.set("next", next);
		this.control.set("previous", previous);
		this.control.set("submit", submit);
	}

    public setState(stateName: string): void {
        const state = this.states.get(stateName);
        if (!state) {
          throw new Error(`State '${stateName}' does not exist.`);
        }
        this.currentState = state;
    }

    public getCurrentStateName(): string {
        return this.currentState.name;
    }

}

class InitialState implements State {
	public name = 'INITIAL_STATE';

	public handleInput(input: string, tabs: any, control: Map<string, any>): void {
		if (input === 'start') {
			tabs[0].style.display = "block";
			control.get("next").style.display = "block";
			control.get("previous").style.display = "none";
			control.get("submit").style.display = "none";
			stateMachine.setState('INITIAL_STATE');
		}

		if (input === 'next') {
			tabs[0].style.display = "none";
			tabs[1].style.display = "block";
			control.get("previous").style.display = "block";
			stateMachine.setState('TAB1_STATE');
		}
	}
}

class Tab1State implements State {
	public name = "TAB1_STATE";
	public handleInput(input: string, tabs: any, control: Map<string, any>): void {
		console.log("State1: " + input);
		if (input === 'next') {
			tabs[1].style.display = "none";
			tabs[2].style.display = "block";
			stateMachine.setState('TAB2_STATE');
		}
		if (input === 'previous') {
			tabs[1].style.display = "none";
			tabs[0].style.display = "block";
			stateMachine.setState('INITIAL_STATE');
		}
	}
}

class Tab2State implements State {
	public name = "TAB2_STATE";
	public handleInput(input: string, tabs: any, control: Map<string, any>): void {
		if (input === 'next') {
			tabs[2].style.display = "none";
			tabs[3].style.display = "block";
			stateMachine.setState('TAB3_STATE');
		}
		if (input === 'previous') {
			tabs[2].style.display = "none";
			tabs[1].style.display = "block";
			stateMachine.setState('TAB1_STATE');
		}
	}
}

class Tab3State implements State {
	public name = "TAB3_STATE";
	public handleInput(input: string, tabs: any, control: Map<string, any>): void {
		if (input === 'next') {
			tabs[3].style.display = "none";
			tabs[4].style.display = "block";
			stateMachine.setState('TAB4_STATE');
		}
		if (input === 'previous') {
			tabs[3].style.display = "none";
			tabs[2].style.display = "block";
			stateMachine.setState('TAB2_STATE');
		}
	}
}

class Tab4State implements State {
	public name = "TAB4_STATE";
	public handleInput(input: string, tabs: any, control: Map<string, any>): void {
		if (input === 'next') {
			tabs[4].style.display = "none";
			tabs[5].style.display = "block";
			stateMachine.setState('TAB5_STATE');
		}
		if (input === 'previous') {
			tabs[4].style.display = "none";
			tabs[3].style.display = "block";
			stateMachine.setState('TAB3_STATE');
		}
	}
}

class Tab5State implements State {
	public name = "TAB5_STATE";
	public handleInput(input: string, tabs: any, control: Map<string, any>): void {
		if (input === 'next') {
			tabs[5].style.display = "none";
			tabs[6].style.display = "block";
			control.get("next").style.display = "none";
			control.get("previous").style.display = "none";
			stateMachine.setState('FINAL_STATE');
		}
		if (input === 'previous') {
			tabs[5].style.display = "none";
			tabs[4].style.display = "block";
			stateMachine.setState('TAB4_STATE');
		}
	}
}

class FinalState implements State {
	public name = "FINAL_STATE";
	public handleInput(input: string, tabs: any, control: Map<string, any>): void {
		if (input === 'next') {
			
		}
		if (input === 'previous') {
			control.get("previous").style.display = "block";
			control.get("next").style.display = "block";
			stateMachine.setState('TAB5_STATE');
		}
	}
}

const initialState = new InitialState();
const tab1State = new Tab1State();
const tab2State = new Tab2State();
const tab3State = new Tab3State();
const tab4State = new Tab4State();
const tab5State = new Tab5State();
const finalState = new FinalState();

const states = new Map<string, State>([
	[initialState.name, initialState],
	[tab1State.name, tab1State],
	[tab2State.name, tab2State],
	[tab3State.name, tab3State],
	[tab4State.name, tab4State],
	[tab5State.name, tab5State],
	[finalState.name, finalState]
]);

const stateMachine = new StateMachine(states, initialState);

