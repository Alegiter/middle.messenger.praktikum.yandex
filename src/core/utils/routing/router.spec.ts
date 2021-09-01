// eslint-disable-next-line max-classes-per-file
import { assert } from 'chai';
import Component, { ComponentProperties } from '../../components/component';
import { Router } from './router';
import { Routes } from './routes';

class LoginComponent extends Component<ComponentProperties> {
    public static INNER_HTML = 'LoginComponent';
    constructor() {
        super();
    }

    onRender(): string {
        return LoginComponent.INNER_HTML;
    }
}

class SignUpComponent extends Component<ComponentProperties> {
    public static INNER_HTML = 'SignUpComponent';
    constructor() {
        super();
    }

    onRender(): string {
        return SignUpComponent.INNER_HTML;
    }
}

describe('Router testing', () => {
    const router: Router = new Router()
        .withRoute(Routes.LOGIN, LoginComponent)
        .withRoute(Routes.SIGNUP, SignUpComponent);
    router.start();

    function checkRoot(testInnerHtml: string): void {
        const app = document.getElementById('app');
        if (!app) {
            assert(false, "'app' element do not exist");
            return;
        }

        const child = app.children.item(0);
        if (!child) {
            assert(false, "There is no child element in 'app'");
            return;
        }

        assert(child.innerHTML === testInnerHtml, 'Wrong inner html');
    }

    it('should navigate to login', () => {
        router.go(Routes.LOGIN);
        assert.equal(window.location.pathname, Routes.LOGIN, 'Did not navigate to login');
        checkRoot(LoginComponent.INNER_HTML);
    });

    it('should navigate to signup', () => {
        router.go(Routes.SIGNUP);
        assert.equal(
            window.location.pathname,
            Routes.SIGNUP,
            'Did not navigate to signup'
        );
        checkRoot(SignUpComponent.INNER_HTML);
    });
});
