import { Handlebars } from '../../utils/handlebars';
import { ifEquals } from '../../markup/helpers/if-equals.helper';
import { error } from '../../markup/partials/error/error.partial';
import { template } from './404.template.js';

Handlebars.registerHelper('ifEquals', ifEquals);
Handlebars.registerPartial('error', error);

function render(element, context) {
    element.innerHTML = template(Handlebars, context);
}

const context = {
    error: {
        code: '404',
        backHref: '../chats/chats.html'
    }
};

render(document.body, context);
