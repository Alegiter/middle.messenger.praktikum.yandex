export const formItem = `
    <div class="form__item">
        <div class="form__item-title">
            {{title}}
        </div>
        <div class="form__item-input-wrapper">
            <input class="form__item-input" 
                {{#if input.disabled}} disabled {{/if}} 
                value="{{input.value}}"
                />
        </div>
    </div>
`;
