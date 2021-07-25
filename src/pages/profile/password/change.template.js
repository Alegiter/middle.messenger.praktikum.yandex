export function template(Handlebars, context) {
    const template = Handlebars.compile(`
        <div class="full-page">
            <div class="profile">
                {{#> header header}}
                    Смена пароля
                {{/header}}
                {{> form profileItems}}
                <div class="profile__footer">
                    <div>
                        <a href="../profile.html">Сменить</a>
                    </div>     
                </div>      
            </div>
        </div>
    `);
    return template(context);
}
