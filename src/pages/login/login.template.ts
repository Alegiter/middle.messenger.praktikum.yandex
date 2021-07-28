export default `
    <div class="card">
        {{#> header header}}
            {{title.value}}
        {{/header}}
        {{> form form}}
        <button class="button">
            <a class="linkless" href="{{signIn.href}}">
                {{signIn.title}}
            </a>
        </button>
        <div class="card__footer">
            <a class="link link_small" href="{{needAccount.href}}">
                {{needAccount.title}}
            </a>
        </div>
    </div>
`;
