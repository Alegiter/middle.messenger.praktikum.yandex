export function template(Handlebars, context) {
    const template = Handlebars.compile(`
            <div>
                {{> form formItems}}
                <div>
                    <a href="{{signIn.href}}" class="button">
                        {{signIn.title}}
                    </a>
                </div>
                <div>
                    <a href="{{needAccount.href}}">
                        {{needAccount.title}}
                    </a>
                </div>
            </div>
    `);
    return template(context);
}
