// tests/ui/cart/cart-management.spec.js
import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../../pages/products.page';
import { CartPage } from '../../../pages/cart.page';

test.describe('Cart CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  });

  test('Create (Add product to cart)', async ({ page }) => {
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await products.addProductByName('Sauce Labs Backpack');
    await cart.goto();

    await cart.assertProductInCart('Sauce Labs Backpack');
  });

  test('Read (Verify product exists in cart)', async ({ page }) => {
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await products.addProductByName('Sauce Labs Onesie');
    await cart.goto();

    await cart.assertProductInCart('Sauce Labs Onesie');
  });

  test('Update (Remove one product & add another)', async ({ page }) => {
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await products.addProductByName('Sauce Labs Onesie');
    await cart.goto();
    await cart.removeProductByName('Sauce Labs Onesie');
    await cart.assertProductNotInCart('Sauce Labs Onesie');

    await products.goto();
    await products.addProductByName('Sauce Labs Fleece Jacket');
    await cart.goto();

    await cart.assertProductInCart('Sauce Labs Fleece Jacket');
  });

  test('Delete (Empty the cart)', async ({ page }) => {
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await products.addProductByName('Sauce Labs Bike Light');
    await products.addProductByName('Sauce Labs Bolt T-Shirt');
    await cart.goto();

    await cart.removeProductByName('Sauce Labs Bike Light');
    await cart.removeProductByName('Sauce Labs Bolt T-Shirt');

    await expect(cart.cartItems).toHaveCount(0);
  });
});
