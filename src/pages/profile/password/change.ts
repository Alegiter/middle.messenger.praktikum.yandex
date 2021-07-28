import template from './change.template';
import '../../../markup/partials/form/form.partial';
import '../../../markup/partials/header/header.partial';
import renderer from '../../../core/utils/renderer';
import { ProfilePasswordChangeTemplate } from './change.template.type';
import { FormItemPartial } from '../../../markup/partials/form/form-item/form-item.partial.type';

const context: ProfilePasswordChangeTemplate = {
    header: {
        stick: {
            top: true
        },
        title: {
            centered: true,
            value: 'Смена пароля'
        },
        back: {
            href: '../profile.html'
        }
    },
    form: {
        items: [
            ['Старый пароль', ''],
            ['Новый пароль', ''],
            ['Новый пароль (ещё раз)', '']
        ].map<FormItemPartial>((entry) => ({
            title: entry[0]
        }))
    }
};

renderer(template, context);
