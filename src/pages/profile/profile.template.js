export function template(Handlebars, context) {
    const template = Handlebars.compile(`
        <div class="full-page">
            <div class="profile">
                {{#> header header}}
                    Профиль
                {{/header}}
                <div class="profile__image">
                    <div class="image">
                        {{> avatar avatar}}
                        <!--todo [sitnik] добавить элемент смены аватара -->      
                    </div>
                    <div class="profile__name">   
                        {{fullName}}                  
                    </div>
                </div>
                {{> form profileItems}}
                <div class="profile__footer">
                    <div>
                        <a href="edit/edit.html">Изменить данные</a>
                    </div>     
                    <div>     
                        <a href="password/change.html">Изменить пароль</a>
                    </div>
                    <div>   
                        <a href="../login/login.html">Выйти</a>
                    </div>       
                </div>
            </div>
        </div>
    `);

    return template(context);
}
