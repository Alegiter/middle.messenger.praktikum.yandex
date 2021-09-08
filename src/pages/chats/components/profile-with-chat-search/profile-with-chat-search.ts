import Component, { ComponentProperties } from '../../../../core/components/component';
import Avatar from '../../../../core/components/avatar/avatar';

type ProfileWithChatSearchProperties = ComponentProperties & {
    profileAvatar: Avatar;
};

export class ProfileWithChatSearch extends Component<ProfileWithChatSearchProperties> {
    constructor() {
        super('div', {
            profileAvatar: new Avatar()
        });
    }
}
