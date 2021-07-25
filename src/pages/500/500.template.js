export function template(Handlebars, context) {
    const template = Handlebars.compile(`
        <div class="full-page">
            {{> error this}}
        </div>
    `);
    return template(context || {
        error: {
            code: '404',
            backHref: '../chats/chats.html'
        }
    });
}
