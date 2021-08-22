export default `
    {{#if href}}
        <img class="avatar__image" src="{{href}}" alt="">
    {{else if initials}}
        {{initials}}
    {{else}}
        <i class="material-icons">help_outline</i>
    {{/if}}
    `;
