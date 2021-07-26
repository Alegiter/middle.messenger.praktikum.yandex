import { Handlebars } from '../../utils/handlebars';
import '../../markup/partials/avatar/avatar.partial';
import '../../markup/partials/chat/chat.partial';
import { template } from './chats.template';

function render(element) {
    element.innerHTML = template(Handlebars);
}

render(document.body);
