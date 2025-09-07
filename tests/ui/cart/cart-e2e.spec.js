// tests/ui/cart/cart-e2e.spec.js
import { test } from '@playwright/test';
import { ProductsPage } from '../../../pages/products.page';
import { CartPage } from '../../../pages/cart.page';

test.describe('Cart End-to-End Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  });

  test('Add, update, and checkout flow', async ({ page }) => {
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    // Add product
    await products.addProductByName('Sauce Labs Backpack');
    await cart.goto();
    await cart.assertProductInCart('Sauce Labs Backpack');

    // Update: remove + add another
    await cart.removeProductByName('Sauce Labs Backpack');
    await cart.assertProductNotInCart('Sauce Labs Backpack');

    await products.goto();
    await products.addProductByName('Sauce Labs Bolt T-Shirt');
    await cart.goto();
    await cart.assertProductInCart('Sauce Labs Bolt T-Shirt');

    // Proceed to checkout
    await cart.checkout();

    // Validate checkout page
    await page.waitForSelector('[data-test="firstName"]');
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    // Verify order summary
    await page.waitForSelector('.summary_info');

    // Finish order
    await page.click('[data-test="finish"]');
    await page.waitForSelector('.complete-header');
    await page.waitForSelector('.complete-text');
  });
});
