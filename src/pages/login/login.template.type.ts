import { HeaderPartial } from '../../markup/partials/header/header.partial.type';
import Form from '../../core/components/form/form';
import Button from '../../core/components/button/button';

export type LoginTemplate = {
    header: HeaderPartial;
    form: Form;
    needAccount: Button;
};
