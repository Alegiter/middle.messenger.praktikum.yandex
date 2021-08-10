export default `
    <div class="card">
        <div class="card__header">
            {{#> header header}}
                {{title.value}}
            {{/header}}
        </div>
        <div class="card__body"></div>
        <div class="card__footer">
            <a class="link link_small" href="{{hasAccount.href}}">
                {{hasAccount.title}}
            </a>
        </div>
    </div>
`;
