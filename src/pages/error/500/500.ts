import '../../../markup/helpers/if-equals.helper';
import '../../../markup/partials/error/error.partial';
import template from '../error.template';
import renderer from '../../../core/utils/renderer';
import { ErrorPartial } from '../../../markup/partials/error/error.partial.type';

const context: ErrorPartial = {
    code: '505',
    backHref: '../chats/chats.html'
};

renderer(template, context);
