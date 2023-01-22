abstract class Page {
    protected container: HTMLElement;

    constructor(id: string) {
        this.container = document.createElement('main');
        this.container.classList.add('main');
        this.container.classList.add('container');
        this.container.id = id;
    }

    render() {
        return this.container;
    }
}

export default Page;
