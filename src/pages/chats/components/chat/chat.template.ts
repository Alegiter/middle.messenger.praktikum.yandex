export default `
    <div class="chat {{#if selected}}chat_selected{{/if}}">
        <div class="chat__avatar"></div>
        <div class="chat__body">
            <div class="chat__body-title">
                <div class="chat__title">
                    {{title}}
                </div>
                <div class="chat__time">
                    {{last_message.time}}
                </div>
            </div>
            <div class="chat__body-subtitle">
                <div class="chat__last-message">
                    {{last_message.content}}
                </div>
                {{#if unread_count}}
                <div class="chat__unread-count">
                    {{unread_count}}
                </div>
                {{/if}}
            </div>
        </div>
        <div class="chat__click-container" id="{{id}}"></div>
    </div>
`;
