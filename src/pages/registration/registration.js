import { template } from './registration.template';
import { Handlebars } from '../../utils/handlebars';
import '../../markup/partials/form/form.partial';
import '../../markup/partials/header/header.partial';

function render(element, context) {
    element.innerHTML = template(Handlebars, context);
}

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

const element = document.body.children[0]

render(element, context);
