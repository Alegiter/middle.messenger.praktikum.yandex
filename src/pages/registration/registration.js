import { template } from './registration.template';
import { Handlebars } from '../../utils/handlebars';
import { form } from '../../markup/partials/form/form.partial';
import { formItem } from '../../markup/partials/form/form-item/form-item.partial';

Handlebars.registerPartial('formItem', formItem)
Handlebars.registerPartial('form', form)


function render(element, context) {
    element.innerHTML = template(Handlebars, context);
}

const context = {
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

render(document.body, context);
