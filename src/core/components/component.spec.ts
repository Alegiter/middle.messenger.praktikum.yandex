import { assert } from 'chai';
import { Done } from 'mocha';
import Component, { ComponentProperties } from './component';

describe('Component testing', () => {
    it('should create div by default', () => {
        const div = new Component();
        assert(div.element.tagName === 'DIV', 'Did not create div');
    });

    it('should add html attributes to host element', () => {
        const id = '1';
        const div = new Component('div', {
            html: {
                id
            }
        });
        assert(div.element.id === id, 'Did not add html attribute');
    });

    it('should add event listeners to host element', (done: Done) => {
        const click = () => {
            assert(true);
            done();
        };
        const div = new Component('div', {
            events: {
                click
            }
        });
        div.element.dispatchEvent(new Event('click'));
    });

    it('should add children to host element', () => {
        const child = new Component('span');
        const div = new Component('div', {
            children: [child.element]
        });
        const { children } = div.element;
        assert(children.length === 1, 'Child did not add');
        assert(children.item(0)!.tagName === 'SPAN', 'Child did not add');
    });

    it('should add css classes to host element', () => {
        const cssClass = 'test';
        const div = new Component('div', {
            classList: [cssClass]
        });
        assert(div.element.classList.contains(cssClass), 'Не добавился css класс');
    });

    describe('Component lifecycle testing', () => {
        type TestComponentProperties = ComponentProperties & {
            onComponentDidMount?: () => void;
            onRender?: () => void;
            onComponentDidRender?: () => void;
            onComponentDidUpdate?: () => void;
            onComponentDestroy?: () => void;
            forUpdate?: number;
        };
        class TestComponent extends Component<TestComponentProperties> {
            constructor(properties: {
                onComponentDidMount?: () => void;
                onRender?: () => void;
                onComponentDidRender?: () => void;
                onComponentDidUpdate?: () => void;
                onComponentDestroy?: () => void;
            }) {
                super('div', properties);
            }

            onComponentDidMount() {
                const { onComponentDidMount } = this.properties;
                if (onComponentDidMount) {
                    onComponentDidMount();
                }
            }

            onRender(): null {
                const { onRender } = this.properties;
                if (onRender) {
                    onRender();
                }
                return null;
            }

            onComponentDidRender() {
                const { onComponentDidRender } = this.properties;
                if (onComponentDidRender) {
                    onComponentDidRender();
                }
            }

            onComponentDidUpdate(): boolean {
                const { onComponentDidUpdate } = this.properties;
                if (onComponentDidUpdate) {
                    onComponentDidUpdate();
                }
                return true;
            }

            onComponentDestroy() {
                const { onComponentDestroy } = this.properties;
                if (onComponentDestroy) {
                    onComponentDestroy();
                }
            }
        }

        /* eslint-disable no-new */
        it('should check onComponentDidMount', (done: Done) => {
            new TestComponent({
                onComponentDidMount: () => {
                    assert(true);
                    done();
                }
            });
        });

        it('should check onRender', (done: Done) => {
            new TestComponent({
                onRender: () => {
                    assert(true);
                    done();
                }
            });
        });

        it('should check onComponentDidRender', (done: Done) => {
            new TestComponent({
                onComponentDidRender: () => {
                    assert(true);
                    done();
                }
            });
        });

        it('should check onComponentDidUpdate', (done: Done) => {
            const component = new TestComponent({
                onComponentDidUpdate: () => {
                    assert(true);
                    done();
                }
            });

            component.properties.forUpdate = 1;
        });

        it('should check onComponentDestroy', (done: Done) => {
            const component = new TestComponent({
                onComponentDestroy: () => {
                    assert(true);
                    done();
                }
            });

            component.destroy();
        });
        /* eslint-enable no-new */
    });
});
