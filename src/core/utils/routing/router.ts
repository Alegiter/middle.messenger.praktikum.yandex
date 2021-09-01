import Route from './route';
import Component from '../../components/component';
import { SafeAny, Type } from '../types';
import { Routes } from './routes';

export class Router {
    private readonly routes: Route[] = [];
    private activatedRoute: Route | null = null;

    private history = window.history;

    constructor(private routerOutlet?: string) {}

    withRoute(path: Routes, componentClass: Type<Component<SafeAny>>): this {
        this.routes.push(
            new Route({
                path,
                ComponentClass: componentClass,
                routerOutlet: this.routerOutlet
            })
        );
        return this;
    }

    start(): void {
        window.addEventListener('popstate', () => {
            this.onNavigate(window.location.pathname);
        });

        this.onNavigate(window.location.pathname);
    }

    private onNavigate(path: string): void {
        const route = this.routes.find((r) => r.match(path));
        if (!route) {
            return;
        }

        if (this.activatedRoute) {
            this.activatedRoute.leave();
        }

        this.activatedRoute = route;
        route.render();
    }

    go(path: Routes): void {
        this.history.pushState({}, '', path);
        this.onNavigate(path);
    }
}

export const AppRouter = new Router();
