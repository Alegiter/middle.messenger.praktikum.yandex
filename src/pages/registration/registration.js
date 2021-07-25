import { template } from './registration.template';

function render(element) {
    element.innerHTML = template();
}

render(document.body);
