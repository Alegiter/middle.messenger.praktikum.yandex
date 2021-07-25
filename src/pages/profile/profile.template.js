export function template(Handlebars, context) {
    const template = Handlebars.compile(`
        <div class="full-page">
            <div class="profile">
                <header class="header header_top-stick">
                    <a href="{{backHref}}">Назад</a>
                    <span style="flex: 1 1 0%">Профиль</span>
                    <a href="../login/login.html">Выйти</a>
                </header>
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

    return template(context)
}
