import { test, expect } from '@playwright/test';
import { BasePage } from '../../../pages/base.page.js';

test.describe('Smoke', () => {
test('App title is visible on home', async ({ page }) => {
const base = new BasePage(page);
await base.goto('/');


// For saucedemo homepage, the login button exists
await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});
});