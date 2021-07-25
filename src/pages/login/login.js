import {Handlebars} from '../../utils/handlebars';
import { template } from './login.template';
import { form } from '../../markup/partials/form/form.partial';
import { formItem } from '../../markup/partials/form/form-item/form-item.partial';

Handlebars.registerPartial('formItem', formItem)
Handlebars.registerPartial('form', form)

function render(element, context) {
    element.innerHTML = template(Handlebars, context);
}

const context = {
    formItems: [
        ['Логин', ''],
        ['Пароль', ''],
    ].map(entry => (
        {
            title: entry[0]
        }
    )),
    signIn: {
        title: 'Войти',
        href: '../chats/chats.html'
    },
    needAccount: {
        title: 'Создать аккаунт',
        href: '../registration/registration.html'
    }
}

render(document.body, context);
