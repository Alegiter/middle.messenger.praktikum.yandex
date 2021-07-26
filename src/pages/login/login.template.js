export function template(Handlebars, context) {
    const template = Handlebars.compile(`
            <div class="card">
                {{#> header header}}
                    {{title.value}}
                {{/header}}
                {{> form formItems}}
                <button class="button">
                    <a class="linkless" href="{{signIn.href}}">
                        {{signIn.title}}
                    </a>
                </button>
                <div class="card__footer">
                    <a class="link link_small" href="{{needAccount.href}}">
                        {{needAccount.title}}
                    </a>
                </div>
            </div>
    `);
    return template(context);
}
