import Component, { ComponentProperties } from '../component';
import { Handlebars } from '../../utils/handlebars';
import template from '../../../pages/login/login.template';
import { QuerySelectAppender } from '../../utils/query-select-appender';
import { CardTemplate } from './card.template.type';

type CardProperties = ComponentProperties & CardTemplate;

export default class Card extends Component<CardProperties> {
    constructor(properties?: CardProperties) {
        super('div', properties);
    }

    onRender(): string {
        return Handlebars.compile(template)();
    }

    onComponentDidRender(): void {
        const { header, body, footer } = this.properties;
        const appender = new QuerySelectAppender(this.element);

        if (header) {
            appender.queryAndAppend('.card__header', header.element);
        }
        if (body) {
            appender.queryAndAppend('.card__body', body.element);
        }
        if (footer) {
            appender.queryAndAppend('.card__footer', footer.element);
        }
    }
}
