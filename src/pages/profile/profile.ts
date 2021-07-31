import template from './profile.template';
import '../../markup/partials/avatar/avatar.partial';
import '../../markup/partials/header/header.partial';
import './markup/partials/profile-image/profile-image.partial';
import { renderer2 } from '../../core/utils/renderer';
import { ProfileTemplate } from './profile.template.type';
import Component, { ComponentProperties } from '../../core/components/component';
import { Handlebars } from '../../core/utils/handlebars';
import FormItem from '../../core/components/form/item/form-item';
import Input from '../../core/components/input/input';
import Form from '../../core/components/form/form';

type ProfileProperties = ComponentProperties & ProfileTemplate;

class Profile extends Component<ProfileProperties> {
    constructor() {
        super('div', {
            header: {
                stick: {
                    top: true
                },
                back: {
                    href: '../chats.html'
                },
                title: {
                    centered: true,
                    value: 'Профиль'
                },
                exit: {
                    href: '../login.html'
                }
            },
            profileImage: {
                avatar: {
                    initials: 'ВС',
                    big: true
                }
            },
            fullName: 'Владимир Ситник',
            form: new Form({
                items: [
                    { title: 'Почта', name: 'email', value: 'some@mail.ru' },
                    {
                        title: 'Логин',
                        name: 'login',
                        value: 'sitnikvladimir'
                    },
                    {
                        title: 'Имя',
                        name: 'first_name',
                        value: 'Владимир'
                    },
                    {
                        title: 'Фамилия',
                        name: 'second_name',
                        value: 'Ситник'
                    },
                    {
                        title: 'Имя в чате',
                        name: 'display_name',
                        value: 'Владимир'
                    },
                    {
                        title: 'Телефон',
                        name: 'phone',
                        value: '+79999999999'
                    }
                ].map(
                    (item) =>
                        new FormItem({
                            title: item.title,
                            input: new Input({
                                html: {
                                    name: item.name,
                                    disabled: true,
                                    value: item.value
                                }
                            })
                        })
                )
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

renderer2(new Profile().element);
