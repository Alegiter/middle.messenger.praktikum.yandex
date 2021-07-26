import { Handlebars } from '../../utils/handlebars';
import '../../markup/helpers/if-equals.helper';
import '../../markup/partials/error/error.partial';
import { template } from './404.template.js';

function render(element, context) {
    element.innerHTML = template(Handlebars, context);
}

const element = document.body.children[0]

render(element);
