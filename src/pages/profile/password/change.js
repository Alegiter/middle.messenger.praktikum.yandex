import { Handlebars } from '../../../utils/handlebars';
import { template } from './change.template.js';
import '../../../markup/partials/form/form.partial';
import '../../../markup/partials/header/header.partial';

function render(element, context) {
    element.innerHTML = template(Handlebars, context);
}

const context = {
    header: {
        stick: {
            top: true
        },
        title: {
            centered: true,
            value: 'Смена пароля'
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

const element = document.body.children[0]

render(element, context);

