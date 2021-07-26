import { Handlebars } from '../../utils/handlebars';

function ifEquals(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
}

Handlebars.registerHelper('ifEquals', ifEquals);
