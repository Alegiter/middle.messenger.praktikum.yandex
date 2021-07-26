import { Handlebars } from '../../utils/handlebars';
import { template } from './login.template';
import '../../markup/partials/form/form.partial';
import '../../markup/partials/header/header.partial';

function render(element, context) {
    element.innerHTML = template(Handlebars, context);
}

const context = {
    header: {
        title: {
            centered: true,
            value: 'Авторизация'
        }
    },
    formItems: [
        ['Логин', ''],
        ['Пароль', '']
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
};

const element = document.body.children[0];

render(element, context);
