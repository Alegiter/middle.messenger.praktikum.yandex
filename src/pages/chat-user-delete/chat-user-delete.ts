import Component, {
    ComponentChild,
    ComponentProperties
} from '../../core/components/component';
import Header from '../../core/components/header/header';
import { AppRouter } from '../../core/utils/routing/router';
import { Routes } from '../../core/utils/routing/routes';
import Card from '../../core/components/card/card';
import Input from '../../core/components/input/input';
import Form from '../../core/components/form/form';
import FormItem from '../../core/components/form/item/form-item';
import Button from '../../core/components/button/button';
import RequireValidator from '../../core/utils/validators/required-validator';
import { UserList } from '../../core/components/user-list/user-list';
import { User } from '../../core/api/types/user';
import { ChatUserDeleteTemplate } from './chat-user-delete.template.type';
import { ChatUserDeleteController } from './chat-user-delete.controller';

type ChatUserProperties = ComponentProperties & ChatUserDeleteTemplate;

export class ChatUserDelete extends Component<ChatUserProperties> {
    private controller = new ChatUserDeleteController();

    constructor() {
        super('div', {
            header: new Header({
                back: {
                    click: () => {
                        AppRouter.go(Routes.MESSENGER);
                    }
                },
                title: {
                    value: 'Удалить пользователей',
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
                        this.deleteCheckUsersAndBackToMessenger();
                    }
                }
            })
        });

        this.getChatUsers();
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
        const login = search.value[0];
        if (login) {
            userList.clearList();
            this.controller.getChatUsers().then((users: User[]) => {
                userList.setUsers(users.filter((u) => u.login.includes(login)));
            });
        } else {
            this.controller.getChatUsers().then((users: User[]) => {
                userList.setUsers(users);
            });
        }
    }

    private deleteCheckUsersAndBackToMessenger() {
        const { userList } = this.properties;
        this.controller.deleteUsersFromChat(userList.getSelected());
        AppRouter.go(Routes.MESSENGER);
    }

    private getChatUsers() {
        this.controller.getChatUsers().then((users: User[]) => {
            const { userList } = this.properties;
            userList.setUsers(users);
        });
    }
}
