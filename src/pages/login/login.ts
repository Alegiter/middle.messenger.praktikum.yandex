import '../../markup/partials/header/header.partial';
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

type LoginProperties = ComponentProperties & LoginTemplate;

export class Login extends Component<LoginProperties> {
    private readonly controller = new LoginController();

    constructor() {
        super('div', {
            header: {
                title: {
                    centered: true,
                    value: 'Авторизация'
                }
            },
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
        console.log('Login after super');
        this.controller.isUserAuthorized().then((authorized) => {
            if (authorized) {
                Router.go(Routes.MESSENGER);
            }
        });
    }

    onRender(): string {
        return Handlebars.compile(template)(this.properties);
    }

    onComponentDidRender(): void {
        const cardBody = this.element.querySelector('.card__body');
        if (cardBody) {
            cardBody.appendChild(this.properties.form.element);
        }
        const cardFooter = this.element.querySelector('.card__footer');
        if (cardFooter) {
            cardFooter.appendChild(this.properties.needAccount.element);
        }
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
                        console.log('Redirect to chats');
                    }
                })
                .catch((error) => {
                    console.log('Show error notification', error);
                });
        }
    }
}
