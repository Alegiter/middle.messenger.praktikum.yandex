import { Handlebars } from '../../../core/utils/handlebars';
import './form-item/form-item.partial';

const form = `
    <form class="form">
        {{#each items}}
            {{> formItem this}}
        {{/each}}
        <!--todo [sitnik] Поместить сюда submit-->
    </form>
`;

Handlebars.registerPartial('form', form);
