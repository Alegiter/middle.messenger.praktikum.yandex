import Component, { ComponentProperties } from '../component';
import { Handlebars } from '../../utils/handlebars';
import template from './avatar.template';

type AvatarProperties = ComponentProperties & {
    size?: 'small' | 'default' | 'large';
    href?: string;
    initials?: string;
};

export default class Avatar extends Component<AvatarProperties> {
    constructor(properties?: AvatarProperties) {
        super('div', properties);
    }

    onComponentDidMount(): void {
        this.addStyles();
    }

    onRender(): string {
        this.manageSize();
        return Handlebars.compile(template)(this.properties);
    }

    private addStyles() {
        this.element.classList.add('avatar');
    }

    private manageSize() {
        this.element.classList.remove('avatar_small', 'avatar_large');
        const { size } = this.properties;
        if (size === 'small') {
            this.element.classList.add('avatar_small');
        }
        if (size === 'large') {
            this.element.classList.add('avatar_large');
        }
    }
}
