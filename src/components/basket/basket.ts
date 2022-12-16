import Page from '../../core/templates/page';

class BasketPage extends Page {
    constructor(id: string) {
        super(id);
    }

    render() {
        const title = 'basket';
        this.container.append(title);
        return this.container;
    }
}

export default BasketPage;
