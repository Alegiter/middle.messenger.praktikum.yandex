import '../../markup/partials/header/header.partial';
import { renderer2 } from '../../core/utils/renderer';
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
// import Router from '../../core/utils/router';

type LoginProperties = ComponentProperties & LoginTemplate;

class Login extends Component<LoginProperties> {
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
                        if (this.valid) {
                            console.log(this.properties.form.value);
                            // Router.navigate('chats.html');
                        }
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
            needAccount: {
                title: 'Создать аккаунт',
                href: 'registration.html'
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

renderer2(new Login());
