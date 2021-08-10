import template from './edit.template';
import '../../../markup/partials/avatar/avatar.partial';
import '../../../markup/partials/header/header.partial';
import '../markup/partials/profile-image/profile-image.partial';
import { renderer2 } from '../../../core/utils/renderer';
import { ProfileTemplate } from '../profile.template.type';
import Component, { ComponentProperties } from '../../../core/components/component';
import { Handlebars } from '../../../core/utils/handlebars';
import Form from '../../../core/components/form/form';
import FormItem from '../../../core/components/form/item/form-item';
import Input from '../../../core/components/input/input';
import MailValidator from '../../../core/utils/validators/mail-validator';
import PatternValidator from '../../../core/utils/validators/pattern-validator';
import { loginRegexp, namesRegexp, phoneRegexp } from '../../../core/utils/constants';
import RequireValidator from '../../../core/utils/validators/required-validator';
import Button from '../../../core/components/button/button';

type ProfileEditProperties = ComponentProperties & ProfileTemplate;

class ProfileEdit extends Component<ProfileEditProperties> {
    constructor() {
        super('div', {
            header: {
                stick: {
                    top: true
                },
                title: {
                    value: 'Редактирование профиля'
                },
                back: {
                    href: '../profile.html'
                }
            },
            profileImage: {
                avatar: {
                    initials: 'ВС',
                    big: true
                }
            },
            fullName: 'Владимир Ситник',
            // todo [sitnik] Можно вынести в отдльный компонет для переиспользования
            form: new Form({
                events: {
                    submit: (event) => {
                        event.preventDefault();
                        if (this.properties.form.valid) {
                            // eslint-disable-next-line no-console
                            console.log(this.properties.form.value);
                            // Router.navigate('chats.html');
                        }
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
    }

    onRender(): string {
        return Handlebars.compile(template)(this.properties);
    }

    onComponentDidRender() {
        const cardBody = this.element.querySelector('.profile__form');
        if (cardBody) {
            cardBody.appendChild(this.properties.form.element);
        }
    }
}

renderer2(new ProfileEdit().element);
