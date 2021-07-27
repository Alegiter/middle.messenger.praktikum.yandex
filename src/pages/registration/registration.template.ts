export default `
    <div class="card">
        {{#> header header}}
            {{title.value}}
        {{/header}}
        {{> form form}}
        <button class="button">
            <a class="linkless" href="../../static/chats.html">
                {{signUp.title}}
            </a>
        </button>
        <div class="card__footer">
            <a class="link link_small" href="{{hasAccount.href}}">
                {{hasAccount.title}}
            </a>
        </div>
    </div>
`;
