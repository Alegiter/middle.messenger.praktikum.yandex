import { HeaderPartial } from '../../markup/partials/header/header.partial.type';
import { FormPartial } from '../../markup/partials/form/form.partial.type';
import { ProfileImagePartial } from './markup/partials/profile-image/profile-image.partial.type';

export type ProfileTemplate = {
    header: HeaderPartial;
    profileImage: ProfileImagePartial;
    fullName: string;
    form: FormPartial;
};
