import Component from '../../components/component';
import { Type } from '../types';
import { renderer2 } from '../renderer';

export default class Route {
    private component: Component<any> | null = null;
    constructor(
        private readonly options: {
            path: string;
            ComponentClass: Type<Component<any>>;
            routerOutlet?: string;
        }
    ) {}

    leave(): void {
        if (this.component) {
            this.component.destroy();

            renderer2(this.component.element, {
                query: this.options.routerOutlet,
                deleteElement: true
            });
        }
    }

    render(): void {
        if (!this.component) {
            this.component = new this.options.ComponentClass();
        }

        this.component.create();
        renderer2(this.component.element, { query: this.options.routerOutlet });
    }

    match(path: string): boolean {
        return path === this.options.path;
    }
}
