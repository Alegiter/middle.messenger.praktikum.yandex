import template from './registration.template';
import '../../markup/partials/form/form.partial';
import '../../markup/partials/header/header.partial';
import { renderer } from '../../utils/renderer';

const context = {
    header: {
        title: {
            centered: true,
            value: 'Регистрация'
        }
    },
    formItems: [
        ['Почта', ''],
        ['Логин', ''],
        ['Имя', ''],
        ['Фамилия', ''],
        ['Имя в чате', ''],
        ['Телефон', '+7']
    ].map(entry => (
        {
            title: entry[0],
            input: {
                disabled: false,
                value: entry[1]
            }
        }
    )),
    signUp: {
        title: 'Зарегистрироваться'
    },
    hasAccount: {
        title: 'У меня есть аккаунт',
        href: '../login/login.html'
    }
}

renderer(template, context)
