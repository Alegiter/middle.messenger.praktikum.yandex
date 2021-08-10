import Component, { ComponentProperties } from '../component';

type InputProperties = ComponentProperties<HTMLInputElement>;

export default class Input extends Component<InputProperties> {
    constructor(properties?: InputProperties) {
        super('input', properties);
    }

    get element(): HTMLInputElement {
        return super.element as HTMLInputElement;
    }

    onComponentDidMount(): void {
        this.addStyles();
    }

    private addStyles() {
        this.element.classList.add('input');
    }
}
