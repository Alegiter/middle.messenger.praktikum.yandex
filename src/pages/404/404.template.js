export function template(Handlebars, context) {
    const template = Handlebars.compile(`{{> error this}}`);
    return template(context || {
        error: {
            code: '404',
            backHref: '../chats/chats.html'
        }
    });
}
