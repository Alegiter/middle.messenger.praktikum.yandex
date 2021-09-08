import template from './registration.template';
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
import { Routes } from '../../core/utils/routing/routes';
import { AppRouter } from '../../core/utils/routing/router';
import { RegistrationController } from './registration.controller';
import { SignUpRequest } from '../../core/api/types/sign-up-request';
import Header from '../../core/components/header/header';
import { QuerySelectAppender } from '../../core/utils/query-select-appender';

type RegistrationProperties = ComponentProperties & RegistrationTemplate;

export class Registration extends Component<RegistrationProperties> {
    private readonly controller = new RegistrationController();

    constructor() {
        super('div', {
            header: new Header({
                title: {
                    centered: true,
                    value: 'Регистрация'
                }
            }),
            form: new Form({
                events: {
                    submit: (event) => {
                        event.preventDefault();
                        this.signUp();
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
                        name: 'password_again',
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
            hasAccount: new Button({
                text: 'У меня есть аккаунт',
                type: 'link',
                events: {
                    click: () => AppRouter.go(Routes.LOGIN)
                }
            })
        });
    }

    onRender(): string {
        return Handlebars.compile(template)(this.properties);
    }

    onComponentDidRender(): void {
        const { header, form, hasAccount } = this.properties;
        new QuerySelectAppender(this.element)
            .queryAndAppend('.card__header', header.element)
            .queryAndAppend('.card__body', form.element)
            .queryAndAppend('.card__footer', hasAccount.element);
    }

    private get valid(): boolean {
        return this.properties.form.valid;
    }

    private signUp(): void {
        if (this.valid) {
            this.controller
                .signUp(this.properties.form.value as SignUpRequest)
                .then((ok) => {
                    if (ok) {
                        AppRouter.go(Routes.LOGIN);
                    }
                })
                .catch((error) => {
                    // todo [sitnik] error notification
                    void error;
                });
        }
    }
}
