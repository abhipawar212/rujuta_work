import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
      test.setTimeout(0);

  await page.goto('https://mssit3.lntsufin.com/');
  await page.getByRole('button', { name: 'track order Login' }).click();
  await page.getByRole('spinbutton').fill('44444444444');
  await page.getByRole('button', { name: 'Get OTP' }).click();
  await page.getByRole('dialog').locator('#otpInput').fill('1234');
  await page.getByRole('button', { name: 'Verify' }).click();
  //await page.goto('https://mssit3.lntsufin.com/buyer/#/unauthorized');
  await page.getByRole('textbox', { name: 'Enter product name here...' }).click();
  await page.locator('div').filter({ hasText: /^Audio Cables$/ }).nth(1).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByText('Rakesh AUX Aux Cable Carbon Fibre 1.8 mtr Audio Cables 2.5 2 Ratings 30K+').click();
  const page1 = await page1Promise;
    page.waitForTimeout(1500);

  await page1.locator('#orderQuantity').click();
  await page1.locator('#orderQuantity').fill('5');
  await page1.getByRole('button', { name: 'Add To Cart' }).click();
  await page1.getByRole('button', { name: 'Proceed to Cart' }).click();
  await page1.getByRole('button', { name: 'Proceed to Checkout' }).click();
  await page1.getByRole('button', { name: 'Pay ₹' }).click();
  //await page1.goto('https://mssit3.lntsufin.com/pg/transaction/transaction.do?command=initiateTransaction&environment=MSSIT3');
  await page1.locator('#paymentStatus').selectOption('Success');
  await page1.getByRole('button', { name: 'Pay' }).click();
  await page1.getByRole('button', { name: 'OK' }).click();
  await page1.getByRole('button', { name: 'Order details' }).click();

  
const orderText = await page
  .locator('order-placed-inner-box d-flex flex-column align-items-center')
  .filter({ hasText: 'Your Order ID is' })
  .textContent();

const orderId = orderText?.match(/ORD\d+-\d+/)?.[0];

console.log('Order ID:', orderId);

});