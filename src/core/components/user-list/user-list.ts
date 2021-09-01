import Component, { ComponentProperties } from '../component';
import { User } from '../../api/types/user';
import { SelectableUser } from '../selectable-user/selectable-user';

function mapUsersToSelectableUses(users: User[]): SelectableUser[] {
    return users.map((user) => new SelectableUser(user));
}

type UserListProperties = ComponentProperties & {
    selectableUsers: SelectableUser[];
};

export class UserList extends Component<UserListProperties> {
    constructor(users: User[]) {
        super('div', {
            selectableUsers: mapUsersToSelectableUses(users),
            classList: ['user-list']
        });
    }

    onRender(): HTMLElement[] {
        const { selectableUsers } = this.properties;
        return selectableUsers.map((c) => c.element);
    }

    clearList(): void {
        this.properties.children = [];
    }

    setUsers(users: User[]): void {
        this.properties.selectableUsers = mapUsersToSelectableUses(users);
    }

    getSelected(): User[] {
        const { selectableUsers } = this.properties;
        return selectableUsers.filter((sU) => sU.isSelected()).map((sU) => sU.getUser());
    }

    getAll(): User[] {
        return this.properties.selectableUsers.map((sU) => sU.getUser());
    }
}
