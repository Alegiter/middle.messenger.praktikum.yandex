import template from './profile.template';
import { ProfileTemplate } from './profile.template.type';
import Component, { ComponentProperties } from '../../core/components/component';
import { Handlebars } from '../../core/utils/handlebars';
import FormItem from '../../core/components/form/item/form-item';
import Input from '../../core/components/input/input';
import Form from '../../core/components/form/form';
import { ProfileController } from './profile.controller';
import { QuerySelectAppender } from '../../core/utils/query-select-appender';
import Button from '../../core/components/button/button';
import { AppRouter } from '../../core/utils/routing/router';
import { Routes } from '../../core/utils/routing/routes';
import Header from '../../core/components/header/header';
import Avatar from '../../core/components/avatar/avatar';
import EditableAvatar from './components/editable-avatar/editable-avatar';
import { initialsFromUser } from '../../core/utils/user-untils';
import { User } from '../../core/api/types/user';
import { apiResourcesUrl } from '../../core/utils/constants';

type ProfileProperties = ComponentProperties & ProfileTemplate;

export class Profile extends Component<ProfileProperties> {
    private readonly profileController = new ProfileController();

    constructor() {
        super('div', {
            header: new Header({
                stick: {
                    top: true
                },
                back: {
                    click: () => {
                        AppRouter.go(Routes.MESSENGER);
                    }
                },
                title: {
                    centered: true,
                    value: 'Профиль'
                },
                exit: {
                    click: () => {
                        this.profileController.logout();
                    }
                }
            }),
            profileImage: new EditableAvatar({
                avatar: new Avatar({
                    initials: ''
                }),
                events: {
                    change: (event) => {
                        this.updateAvatarFromInput(event.target as HTMLInputElement);
                    }
                }
            }),
            fullName: 'Владимир Ситник',
            form: new Form({
                items: [
                    {
                        title: 'Почта',
                        name: 'email'
                    },
                    {
                        title: 'Логин',
                        name: 'login'
                    },
                    {
                        title: 'Имя',
                        name: 'first_name'
                    },
                    {
                        title: 'Фамилия',
                        name: 'second_name'
                    },
                    {
                        title: 'Имя в чате',
                        name: 'display_name'
                    },
                    {
                        title: 'Телефон',
                        name: 'phone'
                    }
                ].map(
                    (item) =>
                        new FormItem({
                            title: item.title,
                            input: new Input({
                                html: {
                                    name: item.name,
                                    disabled: true
                                }
                            })
                        })
                )
            }),
            edit: new Button({
                text: 'Изменить данные',
                events: {
                    click: () => {
                        AppRouter.go(Routes.SETTINGS_EDIT);
                    }
                }
            }),
            changePassword: new Button({
                text: 'Изменить пароль',
                events: {
                    click: () => {
                        AppRouter.go(Routes.SETTINGS_PASSWORD_CHANGE);
                    }
                }
            })
        });

        this.setUserToForm();
    }

    onRender(): string {
        return Handlebars.compile(template)(this.properties);
    }

    onComponentDidRender(): void {
        const { header, profileImage, form, edit, changePassword } = this.properties;
        new QuerySelectAppender(this.element)
            .queryAndAppend('.card__header', header.element)
            .queryAndAppend('.profile__image', profileImage.element)
            .queryAndAppend('.profile__form', form.element)
            .queryAndAppend('.profile__footer-item', edit.element, { index: 0 })
            .queryAndAppend('.profile__footer-item', changePassword.element, {
                index: 1
            });
    }

    setUserToForm(): void {
        this.profileController.getUser().then((user) => {
            this.properties.fullName = `${user.first_name} ${user.second_name}`;

            this.properties.form.value = {
                email: user.email,
                login: user.login,
                first_name: user.first_name,
                second_name: user.second_name,
                display_name: user.display_name,
                phone: user.phone
            };

            this.properties.profileImage.properties.avatar.properties.initials =
                initialsFromUser(user);
            this.setUserAvatar(user);
        });
    }

    updateAvatarFromInput(input: HTMLInputElement): void {
        this.profileController.updateAvatarFromInput(input).then((user) => {
            this.setUserAvatar(user);
        });
    }

    setUserAvatar(user: User): void {
        this.properties.profileImage.properties.avatar.properties.href = `${apiResourcesUrl}/${user.avatar}`;
    }
}
