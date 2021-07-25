export const formItem = `
    <div class="form__item">
        <div class="form__item-title">
            {{title}}:
        </div>
        <div class="form__item-input">
            <input class="input" 
                {{#if input.disabled}} disabled {{/if}} 
                value="{{input.value}}"
                />
        </div>
    </div>
`;
