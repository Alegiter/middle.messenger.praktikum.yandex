export default `
    <div class="card">
        <div class="card__header">
            {{#> header header}}
                {{title.value}}
            {{/header}}
        </div>
        <div class="card__body">
            <div class="profile">
                <div class="profile__image">
                    {{> profileImage profileImage}}
                    <div class="profile__name">   
                        {{fullName}}                  
                    </div>
                </div>
                <div class="profile__form"></div>
                <div class="profile__footer">
                    <div class="profile__footer-item">
                        <button class="button">
                            <a class="linkless" href="profile/edit.html">Изменить данные</a>
                        </button>     
                    </div>
                    <div class="profile__footer-item">
                        <button class="button">     
                            <a class="linkless" href="profile/password/change.html">Изменить пароль</a>
                        </button>     
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
