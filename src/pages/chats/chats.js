const Handlebars = require('handlebars/dist/handlebars')
import { avatar } from "../../markup/partials/avatar/avatar";
import { chat } from "../../markup/partials/chat/chat";
import { template } from './chats.template'

Handlebars.registerPartial('avatar', avatar);
Handlebars.registerPartial('chat', chat);

function render(element) {
    element.innerHTML = template(Handlebars)
}

render(document.body)
