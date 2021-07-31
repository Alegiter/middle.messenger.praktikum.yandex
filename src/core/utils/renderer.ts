import { appElementId } from './constants';
import { Handlebars } from './handlebars';
import Component from '../components/component';

// todo [sitnik] заменить element на query (строку)
export default function renderer(
    template: string,
    context: Record<string, unknown>,
    element?: HTMLElement | null
): void {
    const rendererElement = element || document.getElementById(appElementId);

    if (rendererElement) {
        rendererElement.innerHTML = Handlebars.compile(template)(context || {});
    }
}

export function renderer2(
    component: Component<any>,
    // context: Record<string, unknown>,
    query?: string
): void {
    let rendererElement: HTMLElement | null;
    if (query) {
        rendererElement = document.querySelector(query);
    } else {
        rendererElement = document.getElementById(appElementId);
    }

    if (rendererElement) {
        // rendererElement.innerHTML = Handlebars.compile(template)(context || {});
        rendererElement.appendChild(component.element);
    }
}
