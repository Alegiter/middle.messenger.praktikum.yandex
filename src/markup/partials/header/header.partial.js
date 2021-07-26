import { Handlebars } from '../../../utils/handlebars';

const header = `
    <header class="header {{#if stick.top}} header_top-stick {{/if}}">
        {{#if back}}
            <div>
                <button class="button button_rounded button_ghost">
                    <a class="material-icons linkless" href="{{back.href}}">arrow_back</a>
                </button>      
            </div>
        {{/if}}
        <div class="header__title {{#if title.centered}} header__title_centered {{/if}}">
            {{> @partial-block }}  
        </div>
        {{#if exit}}
            <div>
                <button class="button button_rounded button_ghost">
                    <a class="material-icons linkless" href="{{exit.href}}">logout</a>  
                </button>     
            </div>
        {{/if}}
    </header>
`;

Handlebars.registerPartial('header', header);
