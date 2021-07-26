export default `
    <div class="card">
        <div class="profile">
            {{#> header header}}
                Редактирование профиля
            {{/header}}
            <div class="profile__image">
                {{> profileImage profileImage}}
            </div>
            {{> form profileItems}}
            <div class="profile__footer">
                <div class="profile__footer-item">
                    <button class="button">
                        <a class="linkless" href="../../../static/profile.html">Сохранить</a>
                    </button>     
                </div>
            </div>
        </div>
    </div>
`
