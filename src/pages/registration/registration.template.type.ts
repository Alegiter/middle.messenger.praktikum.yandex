import { HeaderPartial } from '../../markup/partials/header/header.partial.type';
import { LinkTemplate } from '../../core/types/link-template';
import Form from '../../core/components/form/form';

export type RegistrationTemplate = {
    header: HeaderPartial;
    form: Form;
    hasAccount: LinkTemplate;
};
