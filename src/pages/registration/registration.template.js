export function template(Handlebars, context) {
    const template = Handlebars.compile(`
            <div>
                {{> form formItems}}
                <div>
                    <a href="../chats/chats.html">
                        {{signUp.title}}
                    </a>
                </div>
                <div>
                    <a href="{{hasAccount.href}}">
                        {{hasAccount.title}}
                    </a>
                </div>
            </div>
    `);
    return template(context);
}
