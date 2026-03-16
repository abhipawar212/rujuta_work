import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(0);
    await page.goto('https://mssit2.lntsufin.com/');
    await page.getByRole('button', { name: 'track order Login' }).click();
  await page.getByRole('spinbutton').fill('44444444444');
  await page.getByRole('button', { name: 'Get OTP' }).click();
  await page.getByRole('dialog').locator('#otpInput').fill('1234');
  await page.getByRole('button', { name: 'Verify' }).click();
  // await page.getByRole('button', { name: 'track order Login' }).click();
  // await page.getByRole('button', { name: 'track order Login' }).click();
  // await page.getByRole('spinbutton').fill('44444444444');
  // await page.getByRole('dialog').locator('#otpInput').fill('1234');
  // await page.getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('button', { name: 'track order Hi, Buyer' }).click();
  await page.getByRole('link', { name: 'Manage RFQs' }).click();
  await page.goto('https://mssit2.lntsufin.com/buyer/#/request-quote/manage/rfq-listing');
  await page.getByRole('button', { name: 'View RFQ Details' }).first().click();
  await page.getByText('Show Product-wise Details').click();
  await page.getByRole('button', { name: 'View Quotations details' }).click();
  // await page.getByRole('button', { name: 'Accept Quote' }).click();
  // await page.getByRole('button', { name: 'Place Order' }).click();
  // await page.getByRole('button', { name: 'Proceed to Payment' }).click();
  // await page.getByRole('button', { name: 'Pay Now' }).click();
  // await page.locator('#paymentStatus').selectOption('Success');
  // await page.getByRole('button', { name: 'Pay' }).click();
  // await page.getByRole('button', { name: 'OK' }).click();
});