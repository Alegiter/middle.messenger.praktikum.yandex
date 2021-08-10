import { appElementId } from './constants';
import { Handlebars } from './handlebars';

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
    element: HTMLElement,
    options: { query?: string; deleteElement?: boolean } = {}
): void {
    console.log('renderer2');
    const { query, deleteElement } = options;
    let rendererElement: HTMLElement | null;
    if (query) {
        rendererElement = document.querySelector(query);
    } else {
        rendererElement = document.getElementById(appElementId);
    }

    if (rendererElement) {
        if (deleteElement) {
            rendererElement.removeChild(element);
        } else {
            rendererElement.appendChild(element);
        }
    }
}
