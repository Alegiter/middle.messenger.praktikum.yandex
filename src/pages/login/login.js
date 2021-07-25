import { template } from './login.template';

function render(element) {
    element.innerHTML = template();
}

render(document.body);
