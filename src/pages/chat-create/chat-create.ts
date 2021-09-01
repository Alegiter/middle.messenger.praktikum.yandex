import Component, {
    ComponentChild,
    ComponentProperties
} from '../../core/components/component';
import { ChatCreateController } from './chat-create.controller';
import Card from '../../core/components/card/card';
import { ChatCreateTemplate } from './chat-create.template.type';
import Form from '../../core/components/form/form';
import FormItem from '../../core/components/form/item/form-item';
import Input from '../../core/components/input/input';
import RequireValidator from '../../core/utils/validators/required-validator';
import Button from '../../core/components/button/button';
import Header from '../../core/components/header/header';
import { AppStorage } from '../../core/storage/storage';
import { AppRouter } from '../../core/utils/routing/router';
import { Routes } from '../../core/utils/routing/routes';

type ChatCreateProperties = ComponentProperties & ChatCreateTemplate;

export class ChatCreate extends Component<ChatCreateProperties> {
    private readonly controller = new ChatCreateController();

    constructor() {
        super('div', {
            header: new Header({
                back: {
                    click: () => {
                        AppStorage.store('chat.creation.users', []);
                        AppRouter.go(Routes.MESSENGER_CHAT_ADD_USERS);
                    }
                },
                title: {
                    value: 'Добавить название',
                    centered: true
                }
            }),
            formWithName: new Form({
                items: [
                    new FormItem({
                        title: 'Название чата',
                        input: new Input(),
                        validation: {
                            validateOn: 'blur',
                            validators: [new RequireValidator()]
                        }
                    })
                ],
                submit: new Button({
                    text: 'Создать'
                }),
                events: {
                    submit: () => {
                        this.createChat();
                    }
                }
            })
        });
    }

    onRender(): ComponentChild {
        const { header, formWithName } = this.properties;
        return new Card({
            header,
            body: formWithName
        }).element;
    }

    private createChat() {
        const { formWithName } = this.properties;
        this.controller.createChat(formWithName.value[0]).then(() => {
            AppRouter.go(Routes.MESSENGER);
        });
    }
}
