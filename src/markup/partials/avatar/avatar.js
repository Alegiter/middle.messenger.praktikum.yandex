export const avatar = `
    <div class="avatar">
        {{#if img.href}}
            <img src="{{img.href}}" alt="">
        {{else}}
            <div class="avatar__initials">
                {{initials}}
            </div>
        {{/if}}
    </div>
`;
