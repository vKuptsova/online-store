import Page from '../../templates/page';
import './error.css';

export const enum ErrorTypes {
    Error_404 = 404,
}

class ErrorPage extends Page {
    private errorType: ErrorTypes | string;

    constructor(id: string, errorType: ErrorTypes | string) {
        super(id);
        this.errorType = errorType;
    }

    render() {
        const errorBlock = document.createElement('div');
        (errorBlock as HTMLElement).classList.add('error-page');
        (errorBlock as HTMLElement).innerHTML = `<h2>Error! The page was not found.</h2>`;
        this.container.append(errorBlock);
        return this.container;
    }
}

export default ErrorPage;
