export function template(Handlebars, context) {
    const template = Handlebars.compile(`
        <div class="full-page">
            <div class="profile">
            <header class="header header_top-stick">
                <a href="{{backHref}}">Назад</a>
                <span>Смена пароля</span>
            </header>
            {{> form profileItems}}
            <div class="profile__footer">
                <div>
                    <a href="../profile.html">Сменить</a>
                </div>     
            </div>      
            </div>
        </div>
    `)
    return template(context)
}
