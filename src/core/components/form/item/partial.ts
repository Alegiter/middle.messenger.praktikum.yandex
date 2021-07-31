import { Handlebars } from '../../../utils/handlebars';

const formItem = `
    <div class="form__item">
        <div class="form__item-title">
            {{title}}
        </div>
        <div class="form__item-input-wrapper"></div>
        <div class="form__item-validation">
            {{validationMessage}}  
        </div>
    </div>
`;

Handlebars.registerPartial('formItem', formItem);
