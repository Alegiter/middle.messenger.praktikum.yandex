import template from './profile.template.js';
import '../../markup/partials/form/form.partial';
import '../../markup/partials/avatar/avatar.partial';
import '../../markup/partials/header/header.partial';
import './markup/partials/profile-image/profile-image.partial';
import { renderer } from '../../utils/renderer';

const context = {
    header: {
        stick: {
            top: true
        },
        back: {
            href:'../chats/chats.html'
        },
        title: {
            centered: true,
            value: 'Профиль'
        },
        exit: {
            href: '../login/login.html'
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
                disabled: true,
                value: entry[1]
            }
        }
    ))
};

renderer(template, context)

