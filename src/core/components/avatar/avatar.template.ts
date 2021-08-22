export default `
    {{#if href}}
        <img class="avatar__image" src="{{href}}" alt="">
    {{else}}
        {{initials}}
    {{/if}}
    `;
