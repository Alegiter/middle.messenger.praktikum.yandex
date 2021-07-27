import template from './login.template';
import '../../markup/partials/form/form.partial';
import '../../markup/partials/header/header.partial';
import { renderer } from '../../core/utils/renderer';
import { LoginTemplate } from './login.template.type';
import { FormItemPartial } from '../../markup/partials/form/form-item/form-item.partial.type';

const context: LoginTemplate = {
  header: {
    title: {
      centered: true,
      value: 'Авторизация'
    }
  },
  form: {
    items: [
      ['Логин', ''],
      ['Пароль', '']
    ].map<FormItemPartial>((entry: string[]) => (
        {
          title: entry[0]
        }
    ))
  },
  signIn: {
    title: 'Войти',
    href: '../chats/chats.html'
  },
  needAccount: {
    title: 'Создать аккаунт',
    href: '../registration/registration.html'
  }
};

renderer(template, context);
