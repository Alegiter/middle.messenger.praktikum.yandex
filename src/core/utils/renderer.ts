import { appElementId } from './constants';
import { Handlebars } from './handlebars';

export function renderer(template: string, context: Record<string, unknown>, element?: HTMLElement | null) {
    element = element ? element : document.getElementById(appElementId)

    if (element) {
        element.innerHTML = Handlebars.compile(template)(context || {})
    }
}
