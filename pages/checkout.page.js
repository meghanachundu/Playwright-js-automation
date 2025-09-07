const { expect } = require('@playwright/test');

exports.CheckoutPage = class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.zip = page.locator('#postal-code');
    this.continueBtn = page.locator('#continue');
    this.finishBtn = page.locator('#finish');
    this.orderComplete = page.locator('.complete-header');
  }

  async goto() {
    await this.page.goto('/checkout-step-one.html');
  }

  async fillCheckoutInfo(firstName, lastName, zip) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.zip.fill(zip);
  }

  async continue() {
    await this.continueBtn.click();
  }

  async finish() {
    await this.finishBtn.click();
  }

  async assertOrderComplete() {
    await expect(this.orderComplete).toHaveText('Thank you for your order!');
  }
};

