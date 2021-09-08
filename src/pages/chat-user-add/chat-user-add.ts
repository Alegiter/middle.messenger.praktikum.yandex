import Component, {
    ComponentChild,
    ComponentProperties
} from '../../core/components/component';
import Header from '../../core/components/header/header';
import { AppRouter } from '../../core/utils/routing/router';
import { Routes } from '../../core/utils/routing/routes';
import Card from '../../core/components/card/card';
import Input from '../../core/components/input/input';
import { ChatUserAddTemplate } from './chat-user-add.template.type';
import Form from '../../core/components/form/form';
import FormItem from '../../core/components/form/item/form-item';
import Button from '../../core/components/button/button';
import { ChatUserAddController } from './chat-user-add.controller';
import RequireValidator from '../../core/utils/validators/required-validator';
import { UserList } from '../../core/components/user-list/user-list';
import { AppStorage } from '../../core/storage/storage';

type UserListProperties = ComponentProperties & ChatUserAddTemplate;

export class ChatUserAdd extends Component<UserListProperties> {
    private controller = new ChatUserAddController();

    constructor() {
        super('div', {
            header: new Header({
                back: {
                    click: () => {
                        AppRouter.go(Routes.MESSENGER);
                    }
                },
                title: {
                    value: 'Добавьте пользователей',
                    centered: true
                }
            }),
            search: new Form({
                items: [
                    new FormItem({
                        title: 'Логин пользователя',
                        input: new Input(),
                        validation: {
                            validateOn: 'blur',
                            validators: [new RequireValidator()]
                        }
                    })
                ],
                events: {
                    submit: () => {
                        this.searchUser();
                    }
                }
            }),
            userList: new UserList([]),
            submit: new Button({
                text: 'Далее',
                events: {
                    click: () => {
                        this.saveCheckedUserAndContinue();
                    }
                }
            })
        });
    }

    onRender(): ComponentChild {
        const { header, search, userList, submit } = this.properties;
        return new Card({
            header,
            body: new Component('div', {
                children: [search.element, userList.element, submit.element]
            })
        }).element;
    }

    private searchUser() {
        const { search, userList } = this.properties;
        this.controller.searchUserByLogin(search.value[0]).then((users) => {
            if (users.length === 0) {
                userList.clearList();
                return;
            }

            userList.setUsers(users);
        });
    }

    private saveCheckedUserAndContinue() {
        const { userList } = this.properties;
        AppStorage.store('chat.creation.users', userList.getSelected());
        AppRouter.go(Routes.MESSENGER_CHAT_CREATE);
    }
}
