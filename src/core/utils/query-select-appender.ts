type QuerySelectAppenderOptions = {
    index?: number;
    insertAdjacentPosition?: InsertPosition;
};

export class QuerySelectAppender {
    constructor(private readonly queryFrom: HTMLElement = document.body) {
        return this;
    }

    queryAndAppend(
        query: string,
        element: HTMLElement,
        options: QuerySelectAppenderOptions = {}
    ): this {
        const { index, insertAdjacentPosition } = options;

        const append = (parent: Element | null, child: Element) => {
            if (parent) {
                if (insertAdjacentPosition) {
                    parent.insertAdjacentElement(insertAdjacentPosition, child);
                } else {
                    parent.appendChild(child);
                }
            }
        };

        let parentElement: Element | null;

        if (index) {
            const elements = this.queryFrom.querySelectorAll(query);
            parentElement = elements.item(index);
        } else {
            parentElement = this.queryFrom.querySelector(query);
        }

        append(parentElement, element);

        return this;
    }
}
