import { appElementId } from './constants';
import { Handlebars } from './handlebars';

export function renderer(template, context, element) {
    element = element ? element : document.getElementById(appElementId)

    if (element) {
        element.innerHTML = Handlebars.compile(template)(context || {})
    }
}
