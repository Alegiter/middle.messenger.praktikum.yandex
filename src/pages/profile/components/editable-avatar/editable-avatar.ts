import Component, {
    ComponentChild,
    ComponentProperties
} from '../../../../core/components/component';
import Avatar from '../../../../core/components/avatar/avatar';
import Input from '../../../../core/components/input/input';
import Icon from '../../../../core/components/icon/icon';

type EditableAvatarProperties = ComponentProperties & {
    avatar: Avatar;
};

export default class EditableAvatar extends Component<EditableAvatarProperties> {
    constructor(properties?: EditableAvatarProperties) {
        super('div', properties);
    }

    onComponentDidMount(): void {
        this.element.classList.add('editable-avatar');
    }

    onRender(): ComponentChild[] {
        this.properties.avatar.properties.size = 'large';
        const fileInput = new Input({
            html: {
                type: 'file',
                accept: 'image/png'
            },
            classList: ['hidden']
        });
        const changeImgBtn = new Component('div', {
            children: [new Icon({ name: 'add_a_photo' }).element],
            classList: ['editable-avatar__change-img-button'],
            events: {
                click: () => {
                    fileInput.element.click();
                }
            }
        });
        return [this.properties.avatar.element, fileInput.element, changeImgBtn.element];
    }
}
