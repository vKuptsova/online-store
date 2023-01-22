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

}

export const ERROR_MESSAGE = {
    NAME: 'Name should contain 2 words with lenght min 3 symbol for each',
    PHONE: 'Invalid phone number. Example: XXX XXX XXXXX',
    ADDRESS: 'Name should contain 3 words with lenght min 5 symbol for each',
    MAIl: 'Invalid e-mail',
    CARD_NUMBER: 'Should contains 16 numbers',
    CARD_EXPIRED_DATE: 'Should not be empty',
    CARD_CVV: 'Should contains only 3 numbers',
};

export const PHONE_REG_EXP = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9]){7}$/;
export const MAIL_REG_EXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
export const CARD_REG_EXP = /[0-9]{16}/;
export const ONLY_DIGITS = /\d{3}/;
export const ONLY_NUMERICAL_VALUES = /[^0-9]/g;
