// pages/cart.page.js
import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async goto() {
    await this.page.click('.shopping_cart_link');
  }

  getProductByName(name) {
    return this.page.locator('.cart_item').filter({ hasText: name });
  }

  async removeProductByName(name) {
    const removeButton = this.getProductByName(name).locator('button:has-text("Remove")');
    await removeButton.click();
  }

  async assertProductInCart(name) {
    await expect(this.getProductByName(name)).toBeVisible();
  }

  async assertProductNotInCart(name) {
    await expect(this.getProductByName(name)).toHaveCount(0, { timeout: 10000 });
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
