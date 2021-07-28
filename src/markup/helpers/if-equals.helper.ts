import { Handlebars } from '../../core/utils/handlebars';

function ifEquals(
    arg1: unknown,
    arg2: unknown,
    options: Handlebars.HelperOptions
): string {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
}

Handlebars.registerHelper('ifEquals', ifEquals);
