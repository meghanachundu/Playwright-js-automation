import { expect } from '@playwright/test';

export class DashboardPage {
constructor(page) {
this.page = page;
this.titleLocator = page.locator('.title');
}

async assertDashboardVisible() {
await expect(this.titleLocator).toBeVisible();
}
}