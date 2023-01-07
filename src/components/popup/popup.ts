class Popup {
    toggleCardPopup(): void {
        const popup = document.querySelector('.popup-credit-card');
        (popup as HTMLElement).classList.toggle('popup-credit-card--show');
    }
}

export default Popup;
