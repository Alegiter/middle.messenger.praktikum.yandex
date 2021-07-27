import { Handlebars } from '../../../core/utils/handlebars';

const error = `
    <div class="error">
        <div class="error-code">
            {{code}}
        </div>
        <div class="error-description">
            {{#ifEquals code '404'}}
                <div class="error-text">Упс!</div>
                <div class="error-text-description">Страница не найдена</div>
            {{else}}
                <div class="error-text">Что-то пошло не так!</div>
                <div class="error-text-description">Мы уже пытаемся починить</div>
            {{/ifEquals}}
        </div>
        <div>
            <a class="link link_small" href="{{backHref}}">Вернуться к чатам</a>
        </div>
    </div>
`;

Handlebars.registerPartial('error', error);
