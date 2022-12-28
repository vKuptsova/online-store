import Page from '../../templates/page';

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
        const title = "'404': 'Error! The page was not found.'";
        this.container.append(title);
        return this.container;
    }
}

export default ErrorPage;
