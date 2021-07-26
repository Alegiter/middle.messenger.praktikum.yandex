export function template(Handlebars, context) {
    const template = Handlebars.compile(`
        <div class="card">
            <div class="profile">
                {{#> header header}}
                    {{title.value}}
                {{/header}}
                {{> form profileItems}}
                <div class="profile__footer">
                    <div class="profile__footer-item">
                        <button class="button">
                            <a class="linkless" href="../profile.html">Сменить</a>
                        </button>     
                    </div>
                </div>      
            </div>
        </div>
    `);
    return template(context);
}
