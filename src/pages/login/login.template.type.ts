import { HeaderPartial } from '../../markup/partials/header/header.partial.type';
import { FormPartial } from '../../markup/partials/form/form.partial.type';
import { LinkTemplate } from '../../core/types/link-template';

export type LoginTemplate = {
    header: HeaderPartial,
    form: FormPartial,
    signIn: LinkTemplate,
    needAccount: LinkTemplate
};
