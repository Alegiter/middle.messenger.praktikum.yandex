type QuerySelectAppenderOptions = {
    index?: number;
    insertAdjacentPosition?: InsertPosition;
};

export class QuerySelectAppender {
    constructor(private readonly queryFrom: HTMLElement = document.body) {
        return this;
    }

    private query(
        query: string,
        options: QuerySelectAppenderOptions = {}
    ): Element | null {
        const { index } = options;
        if (index) {
            const elements = this.queryFrom.querySelectorAll(query);
            return elements.item(index);
        }
        return this.queryFrom.querySelector(query);
    }

    private append(
        parent: Element | null,
        child: Element,
        options: QuerySelectAppenderOptions = {}
    ): void {
        const { insertAdjacentPosition } = options;
        if (parent) {
            if (insertAdjacentPosition) {
                parent.insertAdjacentElement(insertAdjacentPosition, child);
            } else {
                parent.appendChild(child);
            }
        }
    }

    queryAndAppend(
        query: string,
        element: HTMLElement,
        options: QuerySelectAppenderOptions = {}
    ): this {
        const parentElement: Element | null = this.query(query, options);
        this.append(parentElement, element, options);

        return this;
    }

    queryAndReplace(
        query: string,
        element: HTMLElement,
        options: QuerySelectAppenderOptions = {}
    ): this {
        const parentElement: Element | null = this.query(query, options);
        if (parentElement) {
            parentElement.innerHTML = '';
        }
        this.append(parentElement, element, options);

        return this;
    }
}
