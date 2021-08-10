import { Handlebars } from '../../../core/utils/handlebars';

const avatar = `
    <div class="avatar {{#if big}} avatar_big {{/if}}">
        {{#if img.href}}
            <img src="{{img.href}}" alt="">
        {{else}}
            <div class="avatar__initials  {{#if big}} avatar__initials_big {{/if}}">
                {{initials}}
            </div>
        {{/if}}
    </div>
`;

Handlebars.registerPartial('avatar', avatar);
