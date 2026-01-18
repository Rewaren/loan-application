import { test, expect } from '@playwright/test';
import {faker } from '@faker-js/faker'

test('verify application fields are in place', async ({ page }) => {
  await page.goto('https://loan-app.tallinn-learning.ee/small-loan');

  await expect(page.getByTestId('id-small-loan-calculator-field-amount')).toBeVisible();
  await expect(page.getByTestId('id-small-loan-calculator-field-amount-slider')).toBeVisible();
  await expect(page.getByTestId('ib-small-loan-calculator-field-period')).toBeVisible();
  await expect(page.getByTestId('ib-small-loan-calculator-field-period-slider')).toBeVisible();
  await expect(page.getByTestId('id-small-loan-calculator-field-apply')).toBeVisible();
});

test('verify "Apply for loan" button scrolls back to top', async ({ page }) => {
    await page.goto('https://loan-app.tallinn-learning.ee/small-loan');
    await page.getByTestId('id-image-element-button-image-1').scrollIntoViewIfNeeded();
    await page.getByTestId('id-image-element-button-image-1').click();
    await expect(page.getByTestId('id-small-loan-calculator-field-amount')).toBeInViewport();

    await page.getByTestId('id-image-element-button-image-2').scrollIntoViewIfNeeded();
    await page.getByTestId('id-image-element-button-image-2').click();
    await expect(page.getByTestId('id-small-loan-calculator-field-amount')).toBeInViewport();
});

test('apply for loan e2e', async ({ page }) => {
    await page.goto('https://loan-app.tallinn-learning.ee/small-loan');
    await page.getByTestId('id-small-loan-calculator-field-apply').click();
    await expect(page.getByTestId('login-popup-continue-button')).toBeDisabled();
    await page.getByTestId('login-popup-username-input').fill(faker.internet.email());
    await page.getByTestId('login-popup-password-input').fill('1234');
    await page.getByTestId('login-popup-continue-button').click();
    await expect(page.getByTestId('final-page-full-name')).toBeVisible();
    await expect(page.getByTestId('final-page-communication-language')).toBeVisible();
    await page.getByTestId('final-page-continue-button').click();
    await page.getByTestId('final-page-success-ok-button').click();
    await expect(page.getByTestId('id-small-loan-calculator-field-amount')).toBeInViewport();
});

test('verify validation error', async ({ page }) => {
    await page.goto('https://loan-app.tallinn-learning.ee/small-loan');
    await page.getByTestId('id-small-loan-calculator-field-amount').fill('0');
    await expect(page.getByTestId('id-small-loan-calculator-field-error')).toBeVisible();
    await page.getByTestId('id-small-loan-calculator-field-amount').fill('500');
    await expect(page.getByTestId('id-small-loan-calculator-field-error')).toBeHidden();
});