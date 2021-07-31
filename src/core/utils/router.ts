export default class Router {
    static navigate(href: string): void {
        const link = document.createElement('a');
        link.href = href;
        document.body.appendChild(link);
        link.click();
        document.body.lastChild!.remove();
    }
}
