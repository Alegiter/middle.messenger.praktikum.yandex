import { User } from '../../api/types/user';
import Component, { ComponentProperties } from '../component';
import { Handlebars } from '../../utils/handlebars';
import template from './selectable-user.template';
import { SelectableUserTemplate } from './selectable-user.template.type';
import Avatar from '../avatar/avatar';
import { apiResourcesUrl } from '../../utils/constants';
import { initialsFromUser } from '../../utils/user-untils';
import { QuerySelectAppender } from '../../utils/query-select-appender';

type SelectableUserProperties = ComponentProperties & SelectableUserTemplate;

export class SelectableUser extends Component<SelectableUserProperties> {
    private selected = false;
    constructor(private user: User) {
        super('div', {
            user,
            avatar: new Avatar({
                ...(user.avatar && { href: `${apiResourcesUrl}/${user.avatar}` }),
                initials: initialsFromUser(user)
            }),
            events: {
                change: (event) => {
                    const input = event.target as HTMLInputElement;
                    this.selected = input.checked;
                }
            }
        });
    }

    onRender(): string {
        const { user } = this.properties;
        return Handlebars.compile(template)(user);
    }

    onComponentDidRender(): void {
        const { avatar } = this.properties;
        new QuerySelectAppender(this.element).queryAndAppend(
            '.selectable-user__avatar',
            avatar.element
        );
    }

    isSelected(): boolean {
        return this.selected;
    }

    getUser(): User {
        return this.user;
    }
}
