import template from './change.template';
import '../../../markup/partials/header/header.partial';
import { renderer2 } from '../../../core/utils/renderer';
import { ProfilePasswordChangeTemplate } from './change.template.type';
import Component, { ComponentProperties } from '../../../core/components/component';
import Form from '../../../core/components/form/form';
import FormItem from '../../../core/components/form/item/form-item';
import RequireValidator from '../../../core/utils/validators/required-validator';
import Input from '../../../core/components/input/input';
import Button from '../../../core/components/button/button';
import { Handlebars } from '../../../core/utils/handlebars';

type ProfilePasswordChangeProperties = ComponentProperties &
    ProfilePasswordChangeTemplate;

class ProfilePasswordChange extends Component<ProfilePasswordChangeProperties> {
    constructor() {
        super('div', {
            header: {
                stick: {
                    top: true
                },
                title: {
                    centered: true,
                    value: 'Смена пароля'
                },
                back: {
                    href: '../../profile.html'
                }
            },
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
                        title: 'Старый пароль',
                        name: 'oldPassword'
                    },
                    {
                        title: 'Новый пароль',
                        name: 'newPassword'
                    },
                    {
                        title: 'Новый пароль (ещё раз)',
                        name: 'newPasswordAgain'
                    }
                ].map(
                    (item) =>
                        new FormItem({
                            title: item.title,
                            validation: {
                                validateOn: 'blur',
                                validators: [new RequireValidator()]
                            },
                            input: new Input({
                                html: {
                                    maxLength: 50,
                                    required: true,
                                    name: item.name
                                }
                            })
                        })
                ),
                submit: new Button({
                    text: 'Сменить пароль'
                })
            })
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
}

renderer2(new ProfilePasswordChange().element);
