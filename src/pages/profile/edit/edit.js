import { Handlebars } from '../../../utils/handlebars';
import { template } from './edit.template.js';
import { form } from '../../../markup/partials/form/form.partial';
import { formItem } from '../../../markup/partials/form/form-item/form-item.partial';
import { avatar } from '../../../markup/partials/avatar/avatar';
import { header } from '../../../markup/partials/header/header.partial';
import { profileImage } from '../markup/partials/profile-image/profile-image.partial';

Handlebars.registerPartial('formItem', formItem);
Handlebars.registerPartial('form', form);
Handlebars.registerPartial('avatar', avatar);
Handlebars.registerPartial('header', header);
Handlebars.registerPartial('profileImage', profileImage);

function render(element, context) {
    element.innerHTML = template(Handlebars, context);
}

const context = {
    header: {
        stick: {
            top: true
        },
        back: {
            href:'../profile.html'
        }
    },
    profileImage: {
        avatar: {
            initials: 'ВС',
            big: true
        }
    },
    fullName: 'Владимир Ситник',
    profileItems: [
        ['Почта', 'some@mail.ru'],
        ['Логин', 'sitnikvladimir'],
        ['Имя', 'Владимир'],
        ['Фамилия', 'Ситник'],
        ['Имя в чате', 'Владимир'],
        ['Телефон', '+7 (999) 999 99 99']
    ].map(entry => (
        {
            title: entry[0],
            input: {
                disabled: false,
                value: entry[1]
            }
        }
    ))
};

const element = document.body.children[0]

render(element, context);
