import { template } from './change.template.js';
import { form } from '../../../markup/partials/form/form.partial';
import { formItem } from '../../../markup/partials/form/form-item/form-item.partial';
import { header } from '../../../markup/partials/header/header.partial';

const Handlebars = require('handlebars/dist/handlebars');


Handlebars.registerPartial('formItem', formItem);
Handlebars.registerPartial('form', form);
Handlebars.registerPartial('header', header);


function render(element, context) {
    element.innerHTML = template(Handlebars, context);
}

const context = {
    header: {
        stick: {
            top: true
        },
        back: {
            href:'../profile.html'
        }
    },
    profileItems: [
        ['Старый пароль', ''],
        ['Новый пароль', ''],
        ['Новый пароль (ещё раз)', '']
    ].map(entry => (
        {
            title: entry[0]
        }
    ))
};

render(document.body, context);
