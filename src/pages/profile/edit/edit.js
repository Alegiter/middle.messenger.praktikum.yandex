const Handlebars = require('handlebars/dist/handlebars')
import { template } from './edit.template.js'
import { form } from '../../../markup/partials/form/form.partial'
import { formItem } from '../../../markup/partials/form/form-item/form-item.partial'
import { avatar } from '../../../markup/partials/avatar/avatar'

Handlebars.registerPartial('formItem', formItem);
Handlebars.registerPartial('form', form);
Handlebars.registerPartial('avatar', avatar);
function render(element, context) {
    element.innerHTML = template(Handlebars, context)
}

const context = {
    backHref: "../profile.html",
    avatar: {
        initials: "ВС"
    },
    fullName: "Владимир Ситник",
    profileItems: [
        ["Почта", "some@mail.ru"],
        ["Логин", "sitnikvladimir"],
        ["Имя", "Владимир"],
        ["Фамилия", "Ситник"],
        ["Имя в чате", "Владимир"],
        ["Телефон", "+7 (999) 999 99 99"],
    ].map(entry => (
        {
            title: entry[0],
            input: {
                disabled: false,
                value: entry[1]
            }
        }
    ))
}

render(document.body, context)
