import template from './registration.template';
import '../../markup/partials/form/form.partial';
import '../../markup/partials/header/header.partial';
import { renderer } from '../../core/utils/renderer';
import { RegistrationTemplate } from './registration.template.type';

const context: RegistrationTemplate = {
    header: {
        title: {
            centered: true,
            value: 'Регистрация'
        }
    },
    form: {
        items: [
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
        ))
    },
    signUp: {
        title: 'Зарегистрироваться',
        href: '../login/login.html'
    },
    hasAccount: {
        title: 'У меня есть аккаунт',
        href: '../login/login.html'
    }
};

renderer(template, context);
