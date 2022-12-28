import './sorting.css';
import { SORTING_ITEMS } from '../../constants';

const createSortingMarkup = (name: string) => {
    return `<option value="${name}">${name}</option>`;
};

class Sorting {
    init(nodeBlock: Element | null): void {
        const sortBar = document.createElement('div');
        sortBar.classList.add('sorting-bar');
        (nodeBlock as HTMLElement).prepend(sortBar);
        const sortingSelect = document.createElement('select');
        sortBar.appendChild(sortingSelect);

        const sortingMarkup = SORTING_ITEMS.map((item) => createSortingMarkup(item)).join(`\n`);

        (sortingSelect as HTMLElement).innerHTML = sortingMarkup;
    }
}

export default Sorting;
