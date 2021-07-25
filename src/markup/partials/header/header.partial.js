export const header = `
    <header class="header {{#if stick.top}} header_top-stick {{/if}}">
        {{#if back}}
            <a class="material-icons" href="{{back.href}}">arrow_back</a>
        {{/if}}
        <div class="header__title">
            {{> @partial-block }}  
        </div>
        {{#if exit}}
            <a class="material-icons" href="{{exit.href}}">logout</a>
        {{/if}}
    </header>
`;
