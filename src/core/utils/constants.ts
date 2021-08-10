// eslint-disable-next-line import/prefer-default-export
export const appElementId = 'app';

export const loginRegexp = new RegExp('^[a-zA-z\\d-_]+$');
export const emailRegexp = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
);
export const namesRegexp = new RegExp('^[a-zA-Zа-яА-Я-]+$');
export const phoneRegexp = new RegExp('^\\+7(\\d{3}){2}(\\d{2}){2}$');
