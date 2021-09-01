import template from './edit.template';
import { ProfileTemplate } from '../profile.template.type';
import Component, { ComponentProperties } from '../../../core/components/component';
import { Handlebars } from '../../../core/utils/handlebars';
import Form from '../../../core/components/form/form';
import FormItem from '../../../core/components/form/item/form-item';
import Input from '../../../core/components/input/input';
import MailValidator from '../../../core/utils/validators/mail-validator';
import PatternValidator from '../../../core/utils/validators/pattern-validator';
import {
    apiResourcesUrl,
    loginRegexp,
    namesRegexp,
    phoneRegexp
} from '../../../core/utils/constants';
import RequireValidator from '../../../core/utils/validators/required-validator';
import Button from '../../../core/components/button/button';
import Header from '../../../core/components/header/header';
import { AppRouter } from '../../../core/utils/routing/router';
import { Routes } from '../../../core/utils/routing/routes';
import { QuerySelectAppender } from '../../../core/utils/query-select-appender';
import { ProfileEditController } from './edit.controller';
import { UserUpdateRequest } from '../../../core/api/types/user-update-request';
import { initialsFromUser } from '../../../core/utils/user-untils';
import { User } from '../../../core/api/types/user';
import EditableAvatar from '../components/editable-avatar/editable-avatar';
import Avatar from '../../../core/components/avatar/avatar';

type ProfileEditProperties = ComponentProperties &
    Omit<ProfileTemplate, 'edit' | 'changePassword'>;

export class ProfileEdit extends Component<ProfileEditProperties> {
    private readonly controller = new ProfileEditController();

    constructor() {
        super('div', {
            header: new Header({
                stick: {
                    top: true
                },
                title: {
                    value: 'Редактирование профиля'
                },
                back: {
                    click: () => {
                        AppRouter.go(Routes.SETTINGS);
                    }
                }
            }),
            profileImage: new EditableAvatar({
                avatar: new Avatar({ initials: '' }),
                events: {
                    change: (event) => {
                        this.updateAvatarFromInput(event.target as HTMLInputElement);
                    }
                }
            }),
            fullName: 'Владимир Ситник',
            // todo [sitnik] Можно вынести в отдльный компонет для переиспользования
            form: new Form({
                events: {
                    submit: (event) => {
                        event.preventDefault();
                        this.save();
                    }
                },
                items: [
                    {
                        title: 'Почта',
                        name: 'email',
                        value: 'some@mail.ru',
                        validators: [new MailValidator()]
                    },
                    {
                        title: 'Логин',
                        name: 'login',
                        value: 'sitnikvladimir',
                        validators: [new PatternValidator(loginRegexp)],
                        autocomplete: 'username'
                    },
                    {
                        title: 'Имя',
                        name: 'first_name',
                        value: 'Владимир',
                        validators: [new PatternValidator(namesRegexp)]
                    },
                    {
                        title: 'Фамилия',
                        name: 'second_name',
                        value: 'Ситник',
                        validators: [new PatternValidator(namesRegexp)]
                    },
                    {
                        title: 'Имя в чате',
                        name: 'display_name',
                        value: 'Владимир',
                        validators: [new PatternValidator(namesRegexp)]
                    },
                    {
                        title: 'Телефон',
                        name: 'phone',
                        value: '+79999999999',
                        validators: [new PatternValidator(phoneRegexp)],
                        type: 'phone'
                    }
                ].map(
                    (item) =>
                        new FormItem({
                            title: item.title,
                            validation: {
                                validateOn: 'blur',
                                validators: [new RequireValidator(), ...item.validators]
                            },
                            input: new Input({
                                html: {
                                    maxLength: 50,
                                    required: true,
                                    name: item.name,
                                    value: item.value
                                }
                            })
                        })
                ),
                submit: new Button({
                    text: 'Сохранить изменения'
                })
            })
        });

        this.setUserToForm();
    }

    onRender(): string {
        return Handlebars.compile(template)(this.properties);
    }

    onComponentDidRender(): void {
        const { header, profileImage, form } = this.properties;
        new QuerySelectAppender(this.element)
            .queryAndAppend('.card__header', header.element)
            .queryAndAppend('.profile__image', profileImage.element)
            .queryAndAppend('.profile__form', form.element);
    }

    save(): void {
        if (this.properties.form.valid) {
            this.controller
                .update(this.properties.form.value as UserUpdateRequest)
                .then(() => {
                    // todo [sitnik] success notify
                    AppRouter.go(Routes.SETTINGS);
                })
                .catch(() => {
                    // todo [sitnik] error handle
                    console.error('Не сохранилось');
                });
        }
    }

    // todo [sitnik] далее всё дублируется из profile, позже сделаю нормально
    setUserToForm(): void {
        this.controller.getUser().then((user) => {
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
        this.controller.updateAvatarFromInput(input).then((user) => {
            this.setUserAvatar(user);
        });
    }

    setUserAvatar(user: User): void {
        this.properties.profileImage.properties.avatar.properties.href = `${apiResourcesUrl}/${user.avatar}`;
    }
}
