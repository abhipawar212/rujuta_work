import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    test.setTimeout(0);
  await page.goto('https://mssit3.lntsufin.com/');
  await page.getByRole('button', { name: 'track order Login' }).click();
  await page.getByRole('spinbutton').fill('44444444444');
  await page.getByRole('button', { name: 'Get OTP' }).click();
  await page.getByRole('dialog').locator('#otpInput').fill('1234');
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('textbox', { name: 'Enter product name here...' }).click();
  await page.getByText('Audio Cables').click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('.col-12.px-0.mb-2').first().click();
  page.waitForTimeout(1500);
  const page1 = await page1Promise;
  await page1.getByText('51+').click();
  await page1.locator('#orderQuantity').click();
  await page1.locator('#orderQuantity').fill('71');
  await page1.locator('#pdp-rfq-button').click();
    page.waitForTimeout(1500);

  await page1.getByRole('checkbox', { name: 'Allow quotes from specific' }).check();
  await page1.locator('#gstin-dropdown-btn').click();
  await page1.locator('#brandName1').uncheck();
  await page1.locator('#brandName1').check();
  await page1.getByRole('button', { name: 'Edit' }).click();
  await page1.getByLabel('Select Products').getByRole('button', { name: 'Save' }).click();
  await page1.getByRole('link', { name: 'Edit' }).click();
  await page1.locator('#allowSpecificBrands1').nth(1).check();
  await page1.getByRole('button', { name: 'Save' }).first().click();
  // await page1.getByRole('button', { name: 'Choose File' }).click();

  //await page1.getByRole('button', { name: 'Choose File' }).setInputFiles('product_order_PSS04577-0029.pdf');
  await page1.getByRole('button', { name: 'Proceed' }).click();
  await page1.getByRole('button', { name: 'Submit Request' }).click();
    page.waitForTimeout(0);

  await page1.getByRole('button', { name: 'Close' }).click();
  await page1.getByRole('button', { name: 'Track your RFQ' }).click();
  





//const rfqIdLocator = page.getByText(/RFQID:/).first();
//console.log(await page.locator("div#p.req-quote-text").textContent());                        //Using locator method
//console.log(await page.locator.textConcent("iv#_ngcontent-tjo-c280"));                           //Using Page Fixture

//  console.log(await page.locator("").textContent());

// const rfqText = await page
//   .locator('p.req-quote-text')
//   .filter({ hasText: 'Your RFQ ID is' })
//   .textContent();

// const rfqId = rfqText?.match(/RSS\d+-\d+/)?.[0];

// console.log('RFQ ID:', rfqId);

const rfqText = await page
  .locator('p.req-quote-text', { hasText: 'Your RFQ ID is' })
  .textContent();

const rfqId = rfqText?.replace('Your RFQ ID is', '').trim();

console.log('RFQ ID:', rfqId);



});


