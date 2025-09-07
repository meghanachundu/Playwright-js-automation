export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.inventoryItem = (name) => this.page.locator('.inventory_item').filter({ hasText: name });
    this.addToCartButton = (name) => this.inventoryItem(name).locator('button:has-text("Add to cart")');
    this.removeButton = (name) => this.inventoryItem(name).locator('button:has-text("Remove")');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async addProductByName(name) {
    await this.addToCartButton(name).click();
  }

 async removeProductByName(name) {
  const removeBtn = this.removeButton(name);
  if (await removeBtn.isVisible()) {
    await removeBtn.click();
  } else {
    console.log(`⚠️ Product "${name}" is not in the cart, skipping remove.`);
  }
}
}
