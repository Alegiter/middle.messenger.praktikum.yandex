export const error = `
    <div class="error-code">
        {{error.code}}
    </div>
    <div class="error-description">
        {{#ifEquals error.code 404}}
            <div class="error-text">Whoops!</div>
            <div class="error-text-description">Page Not Found</div>
        {{else}}
            <div class="error-text">Something wrong happened!</div>
            <div class="error-description">We are working already to fix problem</div>
        {{/ifEquals}}
    </div>
    <div>
        <a href="{{error.backHref}}">Back to chats</a>
    </div>
`;
