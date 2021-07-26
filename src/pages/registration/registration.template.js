export function template(Handlebars, context) {
    const template = Handlebars.compile(`
            <div class="card">
                {{#> header header}}
                    {{title.value}}
                {{/header}}
                {{> form formItems}}
                <button class="button">
                    <a class="linkless" href="../../static/chats.html">
                        {{signUp.title}}
                    </a>
                </button>
                <div class="card__footer">
                    <a class="link link_small" href="{{hasAccount.href}}">
                        {{hasAccount.title}}
                    </a>
                </div>
            </div>
    `);
    return template(context);
}
