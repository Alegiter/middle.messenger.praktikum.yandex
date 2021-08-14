import { HeaderPartial } from '../../markup/partials/header/header.partial.type';
import Form from '../../core/components/form/form';
import Button from '../../core/components/button/button';

export type RegistrationTemplate = {
    header: HeaderPartial;
    form: Form;
    hasAccount: Button;
};
