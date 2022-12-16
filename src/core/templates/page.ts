abstract class Page {
    protected container: HTMLElement;

    constructor(id: string) {
        this.container = document.createElement('main');
        this.container.classList.add('main');
        this.container.classList.add('container');
        this.container.id = id;
    }

    render() {
        console.log('this.container');
        return this.container;
    }
}

export default Page;
