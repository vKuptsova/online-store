import Page from '../../templates/page';

class ProductPage extends Page {
    constructor(id: string) {
        super(id);
    }

    render() {
        const title = 'this.createHeaderTitle(MainPage.TextObject.MainTitle)';
        this.container.append(title);
        return this.container;
    }
}

export default ProductPage;
