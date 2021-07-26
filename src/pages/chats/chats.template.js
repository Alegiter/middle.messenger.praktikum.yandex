export default `
        <div class="chats">
            <div class="chat-list-wrapper">
                <div class="header header_top-stick">
                    <a href="../../static/profile.html">
                        {{> avatar avatar}}            
                    </a>
                    <div class="chat-list-wrapper__search-input">
                        <input class="input"/>
                    </div>
                </div>
                <div class="chat-list">
                    {{#each chats}}
                        {{> chat this}}
                    {{/each}}
                </div>
            </div>
            <div class="messages-holder">
                <div class="header header_top-stick"></div>
            </div>
        </div>
`
