export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]'); 
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/cart.html');
  }

  async assertProductInCart(name) {
    await this.page.locator('.cart_item').filter({ hasText: name }).waitFor();
  }

  async assertProductNotInCart(name) {
    await this.page.locator('.cart_item').filter({ hasText: name }).isHidden();
  }

  async checkout() {
        await this.checkoutButton.click();
    }

}
