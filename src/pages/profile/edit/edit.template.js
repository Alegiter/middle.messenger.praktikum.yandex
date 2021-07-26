export function template(Handlebars, context) {
    const template = Handlebars.compile(`
        <div class="card">
            <div class="profile">
                {{#> header header}}
                    Редактирование профиля
                {{/header}}
                <div class="profile__image">
                    <div class="image">
                        {{> avatar avatar}}
                        <!--todo [sitnik] добавить элемент смены аватара -->      
                    </div>
                </div>
                {{> form profileItems}}
                <div class="profile__footer">
                    <div class="profile__footer-item">
                        <button class="button">
                            <a class="linkless" href="../profile.html">Сохранить</a>
                        </button>     
                    </div>
                </div>
            </div>
        </div>
    `);
    return template(context);
}
