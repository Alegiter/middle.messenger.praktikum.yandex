import EventBus from '../utils/event-bus';

export type ComponentProperties<SomeHTMLElement extends HTMLElement = HTMLDivElement> = {
    [key: string]: unknown;
    // todo [sitnik] Exclude не удалил функции, придумать что-то ещё
    // eslint-disable-next-line @typescript-eslint/ban-types
    html?: Partial<Exclude<SomeHTMLElement, () => void>>;
    events?: Partial<
        { [key in keyof HTMLElementEventMap]: (event: HTMLElementEventMap[key]) => void }
    >;
};

export default class Component<PropertiesType extends ComponentProperties> {
    private static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
        FLOW_CDR: 'flow:component-did-render'
    };

    private _element!: HTMLElement;
    private readonly meta: { tagName: string; properties: PropertiesType };
    private lifeCycle = new EventBus();

    protected constructor(tagName = 'div', properties?: PropertiesType) {
        this.meta = {
            tagName,
            properties: this.makePropsProxy(properties)
        };

        this.registerEvents();
        this.init();
    }

    private registerEvents() {
        // this.eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
        this.lifeCycle.on(Component.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
        this.lifeCycle.on(Component.EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
        this.lifeCycle.on(Component.EVENTS.FLOW_RENDER, this.render.bind(this));
        this.lifeCycle.on(Component.EVENTS.FLOW_CDR, this.componentDidRender.bind(this));
    }

    private createResources(): void {
        const { tagName } = this.meta;
        this._element = this.createDocumentElement(tagName);
    }

    private init() {
        this.createResources();
        this.lifeCycle.emit(Component.EVENTS.FLOW_CDM);
    }

    private componentDidMount(): void {
        this.onComponentDidMount(this.properties);
        this.lifeCycle.emit(Component.EVENTS.FLOW_RENDER);
    }

    // Может переопределять пользователь, необязательно трогать
    onComponentDidMount(properties: PropertiesType): void {
        void properties;
    }

    private componentDidUpdate(oldProps: PropertiesType, newProps: PropertiesType) {
        const response = this.onComponentDidUpdate
            ? this.onComponentDidUpdate(oldProps, newProps)
            : true;

        if (response) {
            this.lifeCycle.emit(Component.EVENTS.FLOW_RENDER);
        }
    }

    onComponentDidUpdate(oldProps: PropertiesType, newProps: PropertiesType): boolean {
        return !!oldProps && !!newProps;
    }

    get properties(): PropertiesType {
        return this.meta.properties;
    }

    setProps(nextProps: Partial<PropertiesType>): void {
        Object.assign(this.properties, nextProps);
    }

    get element(): HTMLElement {
        return this._element;
    }

    private addEventListeners(): void {
        const { events = {} } = this.properties;

        Object.keys(events).forEach((eventName) => {
            this.element.addEventListener(eventName, (<any>events)[eventName]);
        });
    }

    private removeEventListeners(): void {
        const { events = {} } = this.properties;

        Object.keys(events).forEach((eventName) => {
            this.element.removeEventListener(eventName, (<any>events)[eventName]);
        });
    }

    private render(): void {
        this.removeEventListeners();
        const block = this.onRender();
        if (block) {
            this._element.innerHTML = '';
            if (typeof block === 'string') {
                this._element.insertAdjacentHTML('beforeend', block);
            } else if (Array.isArray(block)) {
                block.forEach((b) => {
                    if (typeof b === 'string') {
                        this._element.insertAdjacentHTML('beforeend', b);
                    } else {
                        this._element.appendChild(b);
                    }
                });
            } else {
                this._element.appendChild(block);
                // this._element.insertAdjacentElement('beforeend', block);
            }
        }

        this.addEventListeners();
        this.lifeCycle.emit(Component.EVENTS.FLOW_CDR);
    }

    onRender(): HTMLElement | (HTMLElement | string)[] | string | null {
        return null;
    }

    private componentDidRender(): void {
        this.onComponentDidRender();
    }

    onComponentDidRender(): void {
        void 0;
    }

    private makePropsProxy(props?: PropertiesType): PropertiesType {
        return new Proxy(props || {}, {
            set: (target: PropertiesType, prop: string, val: unknown) => {
                // перехватываем запись свойства
                if (prop.indexOf('_') === 0) {
                    throw new Error('нет доступа');
                } else {
                    const prevTarget = { ...target };
                    // eslint-disable-next-line no-param-reassign
                    (<any>target)[prop] = val;
                    if (prevTarget[prop] !== val) {
                        this.lifeCycle.emit(
                            Component.EVENTS.FLOW_CDU,
                            { ...prevTarget },
                            { ...target }
                        );
                    }
                    return true;
                }
            },
            deleteProperty: () => {
                throw new Error('нет доступа');
            }
        }) as PropertiesType;
    }

    private createDocumentElement(tagName: string): HTMLElement {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        const element = document.createElement(tagName);

        const { html = {} } = this.properties;
        Object.keys(html).forEach((key) => {
            element.setAttribute(key, (<any>html)[key]);
        });

        return element;
    }

    show(): void {
        this.element.style.display = 'block';
    }

    hide(): void {
        this.element.style.display = 'none';
    }
}
