import template from './registration.template';
import '../../markup/partials/header/header.partial';
import { RegistrationTemplate } from './registration.template.type';
import Component, { ComponentProperties } from '../../core/components/component';
import Form from '../../core/components/form/form';
import Button from '../../core/components/button/button';
import { Handlebars } from '../../core/utils/handlebars';
import FormItem from '../../core/components/form/item/form-item';
import RequireValidator from '../../core/utils/validators/required-validator';
import PatternValidator from '../../core/utils/validators/pattern-validator';
import { loginRegexp, namesRegexp, phoneRegexp } from '../../core/utils/constants';
import Input from '../../core/components/input/input';
import MailValidator from '../../core/utils/validators/mail-validator';

type RegistrationProperties = ComponentProperties & RegistrationTemplate;

export class Registration extends Component<RegistrationProperties> {
    constructor() {
        super('div', {
            header: {
                title: {
                    centered: true,
                    value: 'Регистрация'
                }
            },
            // todo [sitnik] Можно вынести в отдльный компонет для переиспользования
            form: new Form({
                events: {
                    submit: (event) => {
                        event.preventDefault();
                        if (this.valid) {
                            // eslint-disable-next-line no-console
                            console.log(this.properties.form.value);
                            // Router.navigate('chats.html');
                        }
                    }
                },
                items: [
                    { title: 'Почта', name: 'email', validators: [new MailValidator()] },
                    {
                        title: 'Логин',
                        name: 'login',
                        validators: [new PatternValidator(loginRegexp)],
                        autocomplete: 'username'
                    },
                    {
                        title: 'Имя',
                        name: 'first_name',
                        validators: [new PatternValidator(namesRegexp)]
                    },
                    {
                        title: 'Фамилия',
                        name: 'second_name',
                        validators: [new PatternValidator(namesRegexp)]
                    },
                    {
                        title: 'Телефон',
                        name: 'phone',
                        validators: [new PatternValidator(phoneRegexp)],
                        type: 'phone'
                    },
                    // todo [sitnik] сделать валидацию паролей
                    {
                        title: 'Пароль',
                        name: 'password',
                        type: 'password',
                        autocomplete: 'new-password',
                        validators: []
                    },
                    {
                        title: 'Пароль (ещё раз)',
                        name: 'password',
                        type: 'password',
                        autocomplete: 'new-password',
                        validators: []
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
                                    type: item.type || 'text',
                                    ...(item.autocomplete && {
                                        autocomplete: item.autocomplete
                                    })
                                }
                            })
                        })
                ),
                submit: new Button({
                    text: 'Зарегистрироваться'
                })
            }),
            hasAccount: {
                title: 'У меня есть аккаунт',
                href: 'login.html'
            }
        });
    }

    onRender(): string {
        return Handlebars.compile(template)(this.properties);
    }

    onComponentDidRender() {
        const cardBody = this.element.querySelector('.card__body');
        if (cardBody) {
            cardBody.appendChild(this.properties.form.element);
        }
    }

    private get valid(): boolean {
        return this.properties.form.valid;
    }
}
