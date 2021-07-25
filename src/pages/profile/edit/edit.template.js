export function template(Handlebars, context) {
    const template = Handlebars.compile(`
        <div class="full-page">
            <div class="profile">
                <header class="header header_top-stick">
                    <a href="{{backHref}}">Назад</a>
                    <span>Редактирование профиля</span>
                </header>
                <div class="profile__image">
                    <div class="image">
                        {{> avatar avatar}}
                        <!--todo [sitnik] добавить элемент смены аватара -->      
                    </div>
                </div>
                {{> form profileItems}}
                <div class="profile__footer">
                    <div>
                        <a href="../profile.html">Сохранить</a>
                    </div>     
                </div>
            </div>
        </div>
    `)
    return template(context)
}
