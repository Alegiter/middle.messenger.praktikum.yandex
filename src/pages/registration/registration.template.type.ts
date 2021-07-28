import { HeaderPartial } from '../../markup/partials/header/header.partial.type';
import { FormPartial } from '../../markup/partials/form/form.partial.type';
import { LinkTemplate } from '../../core/types/link-template';

export type RegistrationTemplate = {
    header: HeaderPartial;
    form: FormPartial;
    signUp: LinkTemplate;
    hasAccount: LinkTemplate;
};
