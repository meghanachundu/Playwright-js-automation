import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/login.page.js';
import { DashboardPage } from '../../../pages/dashboard.page.js';

const USERNAME = process.env.APP_USERNAME || 'standard_user';
const PASSWORD = process.env.APP_PASSWORD || 'secret_sauce';

test.describe('Login Tests', () => {
test('Successful login redirects to dashboard', async ({ page }) => {
const loginPage = new LoginPage(page);
const dashboardPage = new DashboardPage(page);

await loginPage.goto();
await loginPage.login(USERNAME, PASSWORD);
await dashboardPage.assertDashboardVisible();
});

test('Login fails with wrong password', async ({ page }) => {
const loginPage = new LoginPage(page);

await loginPage.goto();
await loginPage.login(USERNAME, 'wrong_password');
await loginPage.assertErrorVisible('Epic sadface: Username and password do not match any user in this service');
});
});