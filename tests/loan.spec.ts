import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoanPage } from '../pages/loan-page';

let loanPage: LoanPage;

test.beforeEach(async ({ page }) => {
    loanPage = new LoanPage(page);
    await loanPage.goto();
});

test('verify application fields are in place', async ({ page }) => {
    await expect(loanPage.amountField).toBeVisible();
    await expect(loanPage.amountSlider).toBeVisible();
    await expect(loanPage.periodField).toBeVisible();
    await expect(loanPage.periodSlider).toBeVisible();
    await expect(loanPage.applyButton).toBeVisible();
});

test('verify "Apply for loan" button scrolls back to top', async ({ page }) => {
    await loanPage.clickImageButton1();
    await expect(loanPage.amountField).toBeInViewport();

    await loanPage.clickImageButton2();
    await expect(loanPage.amountField).toBeInViewport();
});

test('apply for loan e2e', async ({ page }) => {
    await loanPage.clickApplyButton();
    await expect(loanPage.loginPopupContinueButton).toBeDisabled();

    await loanPage.fillLoginForm(faker.internet.email(), '1234');
    await loanPage.clickLoginContinue();

    await expect(loanPage.finalPageFullName).toBeVisible();
    await expect(loanPage.finalPageCommunicationLanguage).toBeVisible();

    await loanPage.clickFinalContinue();
    await loanPage.clickSuccessOk();

    await expect(loanPage.amountField).toBeInViewport();
});

test('verify validation error', async ({ page }) => {
    await loanPage.fillAmount('0');
    await expect(loanPage.amountError).toBeVisible();

    await loanPage.fillAmount('500');
    await expect(loanPage.amountError).toBeHidden();
});