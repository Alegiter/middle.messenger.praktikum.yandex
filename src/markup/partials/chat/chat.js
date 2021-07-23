export const chat = `
    <div class="chat">
        <div class="chat__icon">
            {{> avatar avatar}}
        </div>
        <div class="chat__body">
            <div class="chat__name">
                {{name}}
            </div>
            <div class="chat__last-message">
                {{lastMessage.text}}
            </div>
        </div>
        <div class="chat__quick-info">
            <div class="chat__time">
                {{lastMessage.time}}
            </div>
            <div class="chat__unread-messages">
                {{unreadMessages}}
            </div>
        </div>
    </div>
`
