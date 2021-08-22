import Component, { ComponentProperties } from '../../../../core/components/component';
import { ChatTemplate } from './chat.template.type';
import template from './chat.template';
import { QuerySelectAppender } from '../../../../core/utils/query-select-appender';
import { Handlebars } from '../../../../core/utils/handlebars';
import { getTodayRelativelyDateStringFromISOString } from '../../../../core/utils/date-utils';

type ChatProperties = ComponentProperties & ChatTemplate;

export class Chat extends Component<ChatProperties> {
    constructor(properties?: ChatProperties) {
        super('div', properties);
    }

    onRender(): string {
        this.convertLastMessageTime();
        this.shortLastMessageContent();
        return Handlebars.compile(template)(this.properties);
    }

    onComponentDidRender(): void {
        new QuerySelectAppender(this.element).queryAndAppend(
            '.chat__avatar',
            this.properties.avatar.element
        );
    }

    private convertLastMessageTime(): void {
        const { last_message } = this.properties;
        2;
        if (last_message) {
            last_message.time = getTodayRelativelyDateStringFromISOString(
                last_message.time
            );
        }
    }

    private shortLastMessageContent(): void {
        const { last_message } = this.properties;
        if (last_message) {
            const { length } = last_message.content;
            if (length > 25) {
                last_message.content = `${last_message.content.substr(0, 25).trim()}...`;
            }
        }
    }

    select(toggle = true): void {
        this.properties.selected = toggle;
    }
}
