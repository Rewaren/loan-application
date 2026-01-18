import { Page, Locator } from '@playwright/test';

export class LoanPage {
    readonly page: Page;

    readonly amountField: Locator;
    readonly amountSlider: Locator;
    readonly periodField: Locator;
    readonly periodSlider: Locator;
    readonly applyButton: Locator;
    readonly amountError: Locator;
    readonly imageButton1: Locator;
    readonly imageButton2: Locator;
    readonly loginPopupContinueButton: Locator;
    readonly loginPopupUsernameInput: Locator;
    readonly loginPopupPasswordInput: Locator;
    readonly finalPageFullName: Locator;
    readonly finalPageCommunicationLanguage: Locator;
    readonly finalPageContinueButton: Locator;
    readonly finalPageSuccessOkButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.amountField = page.getByTestId('id-small-loan-calculator-field-amount');
        this.amountSlider = page.getByTestId('id-small-loan-calculator-field-amount-slider');
        this.periodField = page.getByTestId('ib-small-loan-calculator-field-period');
        this.periodSlider = page.getByTestId('ib-small-loan-calculator-field-period-slider');
        this.applyButton = page.getByTestId('id-small-loan-calculator-field-apply');
        this.amountError = page.getByTestId('id-small-loan-calculator-field-error');
        this.imageButton1 = page.getByTestId('id-image-element-button-image-1');
        this.imageButton2 = page.getByTestId('id-image-element-button-image-2');
        this.loginPopupContinueButton = page.getByTestId('login-popup-continue-button');
        this.loginPopupUsernameInput = page.getByTestId('login-popup-username-input');
        this.loginPopupPasswordInput = page.getByTestId('login-popup-password-input');
        this.finalPageFullName = page.getByTestId('final-page-full-name');
        this.finalPageCommunicationLanguage = page.getByTestId('final-page-communication-language');
        this.finalPageContinueButton = page.getByTestId('final-page-continue-button');
        this.finalPageSuccessOkButton = page.getByTestId('final-page-success-ok-button');
    }

    async goto() {
        await this.page.goto('https://loan-app.tallinn-learning.ee/small-loan');
    }

    async fillAmount(amount: string) {
        await this.amountField.fill(amount);
    }

    async clickApplyButton() {
        await this.applyButton.click();
    }

    async clickImageButton1() {
        await this.imageButton1.scrollIntoViewIfNeeded();
        await this.imageButton1.click();
    }

    async clickImageButton2() {
        await this.imageButton2.scrollIntoViewIfNeeded();
        await this.imageButton2.click();
    }

    async fillLoginForm(email: string, password: string) {
        await this.loginPopupUsernameInput.fill(email);
        await this.loginPopupPasswordInput.fill(password);
    }

    async clickLoginContinue() {
        await this.loginPopupContinueButton.click();
    }

    async clickFinalContinue() {
        await this.finalPageContinueButton.click();
    }

    async clickSuccessOk() {
        await this.finalPageSuccessOkButton.click();
    }
}