import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(0);
  await page.goto('https://mssit3.lntsufin.com/shome');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('#mobileLoginNumber').fill('1063123506');
  await page.getByRole('button', { name: 'Get OTP' }).click();
  await page.getByText('Enter OTP').click();
  await page.locator('#otpInput').fill('1234');
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('button', { name: 'Orders icon active Orders' }).click();
  await page.goto('https://mssit3.lntsufin.com/seller/#/productOrders/active-orders?title=Manage%20Product%20Orders');
  await page.getByRole('textbox', { name: 'Search by Order ID, Product' }).click();
  await page.getByRole('textbox', { name: 'Search by Order ID, Product' }).fill('PSS04717-0008');
  await page.getByRole('textbox', { name: 'Search by Order ID, Product' }).press('Enter');
  await page.getByRole('button', { name: 'filters icon Filters' }).click();
  await page.getByText('Order Confirmed').click();
  await page.getByText('Last 3 Months').click();
  await page.getByRole('button', { name: 'Apply' }).click();
  await page.getByRole('button', { name: 'View Details' }).first().click();

  await page.getByRole('button', { name: 'Prepare for Dispatch' }).click();
  await page.getByRole('button', { name: 'Upload' }).first().click();
  await page.getByRole('textbox', { name: 'Invoice Number *' }).click();
  await page.getByRole('textbox', { name: 'Invoice Number *' }).fill('555555555');
  await page.getByRole('img').click();
  await page.getByText('2', { exact: true }).click();
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('product_order_PSS04577-0029.pdf');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Upload' }).click();
  await page.getByRole('textbox', { name: 'E-Way Bill Number *' }).click();
  await page.getByRole('textbox', { name: 'E-Way Bill Number *' }).fill('777');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('product_order_PSS04577-0029.pdf');
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Save & Next' }).click();

  await page.getByText('+Add Package').click();
  await page.locator('#length_0').click();
  await page.locator('#length_0').fill('1');
  await page.locator('#width_0').click();
  await page.locator('#width_0').fill('1');
  await page.locator('#height0').click();
  await page.locator('#height0').fill('1');
  await page.locator('#weight0').click();
  await page.locator('#weight0').fill('2');
  
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
    await page.getByRole('button', { name: 'OK' }).click();

  await page.getByText('Download Documents').click();
  const downloadPromise = page.waitForEvent('download');
  await page.locator('a').filter({ hasText: /^Invoice$/ }).click();
  const download = await downloadPromise;
  await page.locator('.cdk-overlay-backdrop').click();
  await page.getByRole('button', { name: 'Manage Documents' }).click();
  await page.getByRole('img', { name: 'close icon' }).nth(2).click();
  await page.getByText('Track Shipment').click();
  await page.getByRole('img', { name: 'close icon' }).nth(1).click();
  await page.getByText('View Specifications').click();
  await page.getByRole('img', { name: 'close icon' }).first().click();
});