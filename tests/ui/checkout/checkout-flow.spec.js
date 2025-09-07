const { test } = require('@playwright/test');
const { LoginPage } = require('../../../pages/login.page');
const { ProductsPage } = require('../../../pages/products.page');
const { CartPage } = require('../../../pages/cart.page');
const { CheckoutPage } = require('../../../pages/checkout.page');

test.describe('Checkout Flow @checkout', () => {

  test('E2E Checkout Success', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    await products.addProductByName('Sauce Labs Backpack');
    await cart.goto();

    await cart.checkout();
    await checkout.fillCheckoutInfo('John', 'Doe', '12345');
    await checkout.continue();
    await checkout.finish();
    await checkout.assertOrderComplete();
  });

  test('Validation error for missing info', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    await products.addProductByName('Sauce Labs Backpack');
    await cart.goto();

    await cart.checkout();
    // Leave fields empty
    await checkout.continue();
    await page.locator('h3[data-test="error"]').isVisible();
  });
});
