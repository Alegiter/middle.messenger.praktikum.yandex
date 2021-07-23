export function template(context) {
    const Handlebars = require('handlebars/dist/handlebars')
    const template = Handlebars.compile(`
            <div class="form login-form">
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
                        {{password.title}}
                    </div>
                    <div class="form__item-input-wrapper">
                        <input class="input form__item-input"/>
                    </div>
                </div>
                <div class="form__actions">
                    <a href="{{signIn.href}}" class="button login-button">
                        {{signIn.title}}
                    </a>
                </div>
                <div class="form__suffix">
                    <a class="link" href="{{needAccount.href}}">
                        {{needAccount.title}}
                    </a>
                </div>
            </div>
    `)
    return template(context || {
        login: {
            title: "Login"
        },
        password: {
            title: "Password"
        },
        signIn: {
            title: "Sign in",
            href: "../chats/chats.html"
        },
        needAccount: {
            title: "Create account",
            href: "../registration/registration.html"
        }
    })
}
