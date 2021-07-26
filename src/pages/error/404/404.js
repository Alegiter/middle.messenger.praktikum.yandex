import '../../../markup/helpers/if-equals.helper';
import '../../../markup/partials/error/error.partial';
import template from '../error.template';
import { renderer } from '../../../utils/renderer';

const context = {
    error: {
        code: '404',
        backHref: '../chats/chats.html'
    }
}

renderer(template, context)
