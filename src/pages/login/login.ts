import { LoginTemplate } from './login.template.type';
import Button from '../../core/components/button/button';
import Component, { ComponentProperties } from '../../core/components/component';
import { Handlebars } from '../../core/utils/handlebars';
import Form from '../../core/components/form/form';
import Input from '../../core/components/input/input';
import FormItem from '../../core/components/form/item/form-item';
import RequireValidator from '../../core/utils/validators/required-validator';
import PatternValidator from '../../core/utils/validators/pattern-validator';
import template from './login.template';
import { loginRegexp } from '../../core/utils/constants';
import { Router } from '../../core/utils/routing/router';
import { Routes } from '../../core/utils/routing/routes';
import { LoginController } from './login.controller';
import { SignInRequest } from '../../core/api/types/sign-in-request';
import Header from '../../core/components/header/header';
import { QuerySelectAppender } from '../../core/utils/query-select-appender';

type LoginProperties = ComponentProperties & LoginTemplate;

export class Login extends Component<LoginProperties> {
    private readonly controller = new LoginController();

    constructor() {
        super('div', {
            header: new Header({
                title: {
                    centered: true,
                    value: 'Авторизация'
                }
            }),
            form: new Form({
                events: {
                    submit: (event) => {
                        event.preventDefault();
                        this.signIn();
                    }
                },
                items: [
                    new FormItem({
                        title: 'Логин',
                        validation: {
                            validateOn: 'blur',
                            validators: [
                                new RequireValidator(),
                                new PatternValidator(loginRegexp)
                            ]
                        },
                        input: new Input({
                            html: {
                                maxLength: 50,
                                required: true,
                                name: 'login',
                                autocomplete: 'username'
                            }
                        })
                    }),
                    new FormItem({
                        title: 'Пароль',
                        validation: {
                            validateOn: 'blur',
                            validators: [new RequireValidator()]
                        },
                        input: new Input({
                            html: {
                                maxLength: 50,
                                required: true,
                                name: 'password',
                                type: 'password',
                                autocomplete: 'current-password'
                            }
                        })
                    })
                ],
                submit: new Button({
                    text: 'Войти'
                })
            }),
            needAccount: new Button({
                text: 'Создать аккаунт',
                type: 'link',
                events: {
                    click: () => {
                        Router.go(Routes.SIGNUP);
                    }
                }
            })
        });
    }

    onRender(): string {
        return Handlebars.compile(template)(this.properties);
    }

    onComponentDidRender(): void {
        const { header, form, needAccount } = this.properties;
        new QuerySelectAppender(this.element)
            .queryAndAppend('.card__header', header.element)
            .queryAndAppend('.card__body', form.element)
            .queryAndAppend('.card__footer', needAccount.element);
    }

    private get valid(): boolean {
        return this.properties.form.valid;
    }

    private signIn(): void {
        if (this.valid) {
            this.controller
                .signIn(this.properties.form.value as SignInRequest)
                .then((ok) => {
                    if (ok) {
                        Router.go(Routes.MESSENGER);
                    }
                })
                .catch((error) => {
                    // todo [sitnik] notification
                    void error;
                });
        }
    }
}
