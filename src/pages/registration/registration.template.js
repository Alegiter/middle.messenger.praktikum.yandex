export function template(context) {
    const Handlebars = require('handlebars/dist/handlebars');
    const template = Handlebars.compile(`
            <div class="form">
                <div class="form__item">
                    <div class="form__item-placeholder">
                        {{mail.title}}
                    </div>
                    <div class="form__item-input-wrapper">
                        <input class="input form__item-input" pattern="{{mail.pattern}}"/>
                        <div class="for__item-validation">
                            {{mail.validation}}
                        </div>
                    </div>
                </div>
                <div class="form__item">
                    <div class="form__item-placeholder">
                        {{login.title}}
                    </div>
                    <div class="form__item-input-wrapper">
                        <input class="input form__item-input"/>
                    </div>
                </div>
                <div class="form__item">
                    <div class="form__item-placeholder">
                        {{name.title}}
                    </div>
                    <div class="form__item-input-wrapper">
                        <input class="input form__item-input"/>
                    </div>
                </div>
                <div class="form__item">
                    <div class="form__item-placeholder">
                        {{surname.title}}
                    </div>
                    <div class="form__item-input-wrapper">
                        <input class="input form__item-input"/>
                    </div>
                </div>
                <div class="form__item">
                    <div class="form__item-placeholder">
                        {{mobile.title}}
                    </div>
                    <div class="form__item-input-wrapper">
                        <input class="input form__item-input" pattern="{{mobile.pattern}}"/>
                    </div>
                </div>
                <div class="form__item">
                    <div class="form__item-placeholder">
                        {{password.title}}
                    </div>
                    <div class="form__item-input-wrapper">
                        <input class="input form__item-input"/>
                        <div class="form__item-validation">
                            {{password.validation}}
                        </div>
                    </div>
                </div>
                <div class="form__item">
                    <div class="form__item-placeholder">
                        {{passwordAgain.title}}
                    </div>
                    <div class="form__item-input-wrapper">
                        <input class="input form__item-input"/>
                        <div class="form__item-validation">
                            {{passwordAgain.validation}}
                        </div>
                    </div>
                </div>
                <div class="form__actions">
                    <button class="button login-button">
                        {{signUp.title}}
                    </button>
                </div>
                <div class="form__suffix">
                    <a class="link" href="{{hasAccount.href}}">
                        {{hasAccount.title}}
                    </a>
                </div>
            </div>
    `);
    return template(context || {
        mail: {
            title: 'Mail',
            // todo [sitnik] Вставить паттерн почты
            pattern: '',
            validation: 'Mail format incorrect'
        },
        login: {
            title: 'Login'
        },
        name: {
            title: 'Name'
        },
        surname: {
            title: 'Surname'
        },
        mobile: {
            title: 'Mobile',
            // todo [sitnik] Вставить паттерн телефона
            pattern: ''
        },
        password: {
            title: 'Password',
            // todo [sitnik] Написать валидацию для пароля
            validation: ''
        },
        passwordAgain: {
            title: 'Password (again)',
            validation: 'Password mismatch'
        },
        signUp: {
            title: 'Sign up'
        },
        hasAccount: {
            title: 'I have account',
            href: '../login/login.html'
        }
    });
}
