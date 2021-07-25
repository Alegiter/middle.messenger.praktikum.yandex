const Handlebars = require('handlebars/dist/handlebars')
import { template } from './change.template.js'
import { form } from '../../../markup/partials/form/form.partial'
import { formItem } from '../../../markup/partials/form/form-item/form-item.partial'

Handlebars.registerPartial('formItem', formItem);
Handlebars.registerPartial('form', form);

function render(element, context) {
    element.innerHTML = template(Handlebars, context)
}

const context = {
    backHref: "../profile.html",
    profileItems: [
        ["Старый пароль", ""],
        ["Новый пароль", ""],
        ["Новый пароль (ещё раз)", ""],
    ].map(entry => (
        {
            title: entry[0],
        }
    ))
}

render(document.body, context)
