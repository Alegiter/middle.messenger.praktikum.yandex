export const form = `
    <form class="form">
        {{#each this}}
            {{> formItem this}}
        {{/each}}
        <!--todo [sitnik] Поместить сюда submit-->
    </form>
`;
