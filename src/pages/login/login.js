import template from './login.template';
import '../../markup/partials/form/form.partial';
import '../../markup/partials/header/header.partial';
import { renderer } from '../../utils/renderer';

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

renderer(template, context)
