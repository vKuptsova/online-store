import './popup.css';
import {
    CARD_REG_EXP,
    ERROR_MESSAGE,
    MAIL_REG_EXP,
    ONLY_DIGITS,
    ONLY_NUMERICAL_VALUES,
    PageIds,
    PHONE_REG_EXP,
} from '../../constants';

class Popup {
    toggleCardPopup(): void {
        const popup = document.querySelector('.popup-credit-card');
        (popup as HTMLElement).classList.toggle('popup-credit-card--show');
    }

    resetPopup(): void {
        const formPopup = document.querySelector('.popup');
        (formPopup as HTMLFormElement).reset();
    }

    onFormInput(): void {
        const formPopup = document.querySelector('.popup');
        const formInputs = (formPopup as HTMLElement).querySelectorAll('.popup-input');
        (formInputs as NodeListOf<HTMLInputElement>).forEach((input) => {
            input.addEventListener('input', () => this.clearAllErrorMessages());
        });
    }

    submit(): void {
        const submitButton = document.querySelector('.popup-submit');
        (submitButton as HTMLButtonElement).addEventListener('click', (event) => {
            event.preventDefault();
            this.clearAllErrorMessages();
            if (this.getFormValid()) {
                this.toggleCardPopup();
                this.resetPopup();
                window.location.hash = `${PageIds.MainPage}`;
            }
        });
    }

    getFormValid(): boolean {
        const nameInput = document.querySelector('.card-name');
        const cardNameValue = (nameInput as HTMLInputElement).value.split(/\W+/);
        const isNameValid = cardNameValue.length === 2 && cardNameValue[0].length >= 3 && cardNameValue[1].length >= 3;

        const phoneInput = document.querySelector('.card-phone');
        const phoneValue = (phoneInput as HTMLInputElement).value;
        const isPhoneValid = phoneValue.match(PHONE_REG_EXP);

        const mailInput = document.querySelector('.card-email');
        const mailValue = (mailInput as HTMLInputElement).value;
        const isMailValid = mailValue.match(MAIL_REG_EXP);

        const addressInput = document.querySelector('.card-address');
        const addressValue = (addressInput as HTMLInputElement).value.split(/\W+/);
        const isAddressValid =
            addressValue.length === 3 &&
            addressValue[0].length >= 5 &&
            addressValue[1].length >= 5 &&
            addressValue[2].length >= 5;

        const cardNumberInput = document.querySelector('.card-number');
        const cardNumberValue = (cardNumberInput as HTMLInputElement).value;
        const isCardNumberValid = !!cardNumberValue.match(CARD_REG_EXP) && cardNumberValue.length === 16;

        const cardValidInput = document.querySelector('.card-valid');
        const cardValidValue = (cardValidInput as HTMLInputElement).value;

        const cardCvvInput = document.querySelector('.card-cvv');
        const cardCvvValue = (cardCvvInput as HTMLInputElement).value;
        const isCardCvvValid = !!cardCvvValue.match(ONLY_DIGITS) && cardCvvValue.length === 3;

        if (!isNameValid) {
            this.setErrorMessage(nameInput, ERROR_MESSAGE.NAME);
        }

        if (!isPhoneValid) {
            this.setErrorMessage(phoneInput, ERROR_MESSAGE.PHONE);
        }

        if (!isAddressValid) {
            this.setErrorMessage(addressInput, ERROR_MESSAGE.ADDRESS);
        }

        if (!isMailValid) {
            this.setErrorMessage(mailInput, ERROR_MESSAGE.MAIl);
        }

        if (!isCardNumberValid) {
            this.setErrorMessage(cardNumberInput, ERROR_MESSAGE.CARD_NUMBER);
        }

        if (!cardValidValue) {
            this.setErrorMessage(cardValidInput, ERROR_MESSAGE.CARD_EXPIRED_DATE);
        }

        if (!isCardCvvValid) {
            this.setErrorMessage(cardCvvInput, ERROR_MESSAGE.CARD_CVV);
        }

        return (
            isNameValid &&
            !!isPhoneValid &&
            isAddressValid &&
            !!isMailValid &&
            isCardNumberValid &&
            !!cardValidValue &&
            !!isCardCvvValid
        );
    }

    onNumbersFieldInput(): void {
        const phoneInput = document.querySelector('.card-phone');
        const cardNumberInput = document.querySelector('.card-number');
        this.allowOnlyNumbers(phoneInput);
        this.allowOnlyNumbers(cardNumberInput);
    }

    allowOnlyNumbers(input: Element | null): void {
        (input as HTMLInputElement).addEventListener('input', (event) => {
            const inputValue = (event.target as HTMLInputElement).value;
            (event.target as HTMLInputElement).value = inputValue.replace(ONLY_NUMERICAL_VALUES, '');
        });
    }

    onCardExpiredDateInput(): void {
        const cardValidInput = document.querySelector('.card-valid');
        (cardValidInput as HTMLInputElement).addEventListener('input', (event) => {
            const inputValue = (event.target as HTMLInputElement).value;
            (event.target as HTMLInputElement).value = inputValue
                .replace(/[^0-9]/g, '')
                .replace(/^([2-9])$/g, '0$1')
                .replace(/^(1{1})([3-9]{1})$/g, '0$1/$2')
                .replace(/^0{1,}/g, '0')
                .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, '$1/$2');
        });
    }

    setErrorMessage(element: Element | null, errorText: string): void {
        const errorNameMessage = document.createElement('span');
        errorNameMessage.classList.add('error-message');
        (errorNameMessage as HTMLElement).innerText = errorText;
        (element as HTMLElement).insertAdjacentElement(<InsertPosition>'afterend', errorNameMessage);
    }

    clearAllErrorMessages(): void {
        const allErrors = document.querySelectorAll('.error-message');
        allErrors.forEach((error) => (error as HTMLElement).remove());
    }
}

export default Popup;
