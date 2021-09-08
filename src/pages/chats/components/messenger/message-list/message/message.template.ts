export default `
    {{#ifEquals side 'left'}}
    <div class="message__avatar"></div>
    {{/ifEquals}}
    <div class="message__body">
        <div class="message__text">{{message.text}}</div>
        <div class="message__time">{{message.time}}</div>
    </div>
    {{#ifEquals side 'right'}}
    <div class="message__avatar"></div>
    {{/ifEquals}}
`;
