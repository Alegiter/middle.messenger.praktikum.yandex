import { Handlebars } from '../../utils/handlebars';
import { ifEquals } from '../../markup/helpers/if-equals.helper';
import { error } from '../../markup/partials/error/error.partial';
import { template } from './500.template.js';

Handlebars.registerHelper('ifEquals', ifEquals);
Handlebars.registerPartial('error', error);

function render(element, context) {
    element.innerHTML = template(Handlebars, context);
}

const element = document.body.children[0];

render(element);
