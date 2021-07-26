export function template(Handlebars, context) {
    const template = Handlebars.compile(`
        <div class="card">
            <div class="profile">
                {{#> header header}}
                    {{title.value}}
                {{/header}}
                <div class="profile__image">
                    {{> profileImage profileImage}}
                    <div class="profile__name">   
                        {{fullName}}                  
                    </div>
                </div>
                {{> form profileItems}}
                <div class="profile__footer">
                    <div class="profile__footer-item">
                        <button class="button">
                            <a class="linkless" href="edit/edit.html">Изменить данные</a>
                        </button>     
                    </div>
                    <div class="profile__footer-item">
                        <button class="button">     
                            <a class="linkless" href="password/change.html">Изменить пароль</a>
                        </button>     
                    </div>
                </div>
            </div>
        </div>
    `);

    return template(context);
}
