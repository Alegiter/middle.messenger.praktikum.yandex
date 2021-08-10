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
                </div>
                <div class="profile__form"></div>
            </div>
        </div>
    </div>
`;
