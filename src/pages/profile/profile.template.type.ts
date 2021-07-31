import { HeaderPartial } from '../../markup/partials/header/header.partial.type';
import { ProfileImagePartial } from './markup/partials/profile-image/profile-image.partial.type';
import Form from '../../core/components/form/form';

export type ProfileTemplate = {
    header: HeaderPartial;
    profileImage: ProfileImagePartial;
    fullName: string;
    form: Form;
};
