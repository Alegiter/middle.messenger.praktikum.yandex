export const form = `
    <form class="form">
        {{#each this}}
            {{> formItem this}}
        {{/each}}
    </form>
`;
