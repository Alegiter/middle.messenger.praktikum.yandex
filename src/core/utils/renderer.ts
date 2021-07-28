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
