export default `
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
            {{> form form}}
            <div class="profile__footer">
                <div class="profile__footer-item">
                    <button class="button">
                        <a class="linkless" href="../../static/profile/edit.html">Изменить данные</a>
                    </button>     
                </div>
                <div class="profile__footer-item">
                    <button class="button">     
                        <a class="linkless" href="../../static/profile/password/change.html">Изменить пароль</a>
                    </button>     
                </div>
            </div>
        </div>
    </div>
`
