import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/login.page.js';
import { ProductsPage } from '../../../pages/products.page.js';
import { CartPage } from '../../../pages/cart.page.js';

const USERNAME = process.env.APP_USERNAME || 'standard_user';
const PASSWORD = process.env.APP_PASSWORD || 'secret_sauce';

test.describe('Cart Management CRUD', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERNAME, PASSWORD);
  });

  test('Create (Add product to cart)', async ({ page }) => {
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await products.goto();
    await products.addProductByName('Sauce Labs Backpack');

    await cart.goto();
    await cart.assertProductInCart('Sauce Labs Backpack');
  });

  test('Read (Verify product exists in cart)', async ({ page }) => {
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await products.goto();
    await products.addProductByName('Sauce Labs Bike Light');

    await cart.goto();
    await cart.assertProductInCart('Sauce Labs Bike Light');
  });

  test('Update (Remove one product & add another)', async ({ page }) => {
  const products = new ProductsPage(page);
  const cart = new CartPage(page);

  await products.goto();

  // Add first product
  await products.addProductByName('Sauce Labs Onesie');

  // Remove it
  await products.removeProductByName('Sauce Labs Onesie');

  // Add another product
  await products.addProductByName('Sauce Labs Fleece Jacket');

  await cart.goto();
  await cart.assertProductInCart('Sauce Labs Fleece Jacket');
  await cart.assertProductNotInCart('Sauce Labs Onesie');
});


  test('Delete (Empty the cart)', async ({ page }) => {
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await products.goto();
    await products.addProductByName('Sauce Labs Onesie');

    await cart.goto();
    await products.removeProductByName('Sauce Labs Onesie');
    await cart.goto();

    await cart.assertProductNotInCart('Sauce Labs Onesie');
  });
});
