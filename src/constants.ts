export const SORTING_ITEMS: string[] = [
    'Sort by price ASC',
    'Sort by price DESC',
    'Sort by rating ASC',
    'Sort by rating DESC',
    'Sort by discount ASC',
    'Sort by discount DESC',
];

export const SORT_TYPE = {
    PRICE_ASC: 'Sort by price ASC',
    PRICE_DESC: 'Sort by price DESC',
    RATING_ASC: 'Sort by rating ASC',
    RATING_DESC: 'Sort by rating DESC',
    DISCOUNT_ASC: 'Sort by discount ASC',
    DISCOUNT_DESC: 'Sort by discount DESC',
};

export const enum PageIds {
    MainPage = 'main-page',
    ProductPage = 'product-page',
    BasketPage = 'basket-page',
}

export const enum FILTER_TYPE {
    BRAND = 'brand',
    CATEGORY = 'category',
    PRICE = 'price',
    STOCK = 'stock',
}