import Component, { ComponentProperties } from '../component';

type IconProperties = ComponentProperties & {
    name: string;
};

export default class Icon extends Component<IconProperties> {
    constructor(properties?: IconProperties) {
        super('i', properties);
    }

    onComponentDidMount(): void {
        this.element.classList.add('material-icons');
    }

    onRender(): string {
        return this.properties.name;
    }
}
