import { test, chromium, Browser, BrowserContext, Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';
import * as fs from 'fs';

dotenv.config({ path: path.resolve(__dirname, '.env') });

test('Raise RFQ - Complete Flow', async () => {
    test.setTimeout(10 * 60 * 1000); // 10 minutes timeout
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotDir = path.resolve(__dirname, 'test-results', 'screenshots', `run-${timestamp}`);
    const videoDir = path.resolve(__dirname, 'test-results', 'videos', `run-${timestamp}`);
    
    // Create directories if they don't exist
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
    }
    
    const browser: Browser = await chromium.launch({ 
        headless: process.env.HEADLESS === 'true' 
    });
    const context: BrowserContext = await browser.newContext({
        recordVideo: {
            dir: videoDir,
            size: { width: 1280, height: 720 }
        }
    });
    const page: Page = await context.newPage();
    
    let stepNumber = 0;
    const takeScreenshot = async (stepName: string) => {
        stepNumber++;
        const screenshotPath = path.join(screenshotDir, `${stepNumber.toString().padStart(3, '0')}-${stepName}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`Screenshot saved: ${stepName}`);
    };
    
    const baseURL = process.env.BASE_URL;
    const raiseRfqTestDataFile = process.env.RAISE_RFQ_TEST_DATA_FILE;
    
    // Load test data from JSON file
    const testDataPath = path.resolve(__dirname, raiseRfqTestDataFile || '');
    console.log("Loading test data from:", testDataPath);
    const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));
    console.log("Test Data loaded:", testData);    
    var searchText = testData.searchText;
    var products = testData.products;
    var quantites = testData.quantites;
    var milestonePercentages = testData.milestonePercentages;
    var userMobileNo = testData.userMobileNo;
    var loginOtp = testData.loginOtp;
    var fullUrl = baseURL + "/bhome";
    
    console.log("Full URL:", fullUrl);
    await page.goto(fullUrl);
    await page.getByRole("button", { name: "track order Login" }).click();
    await page.getByRole("spinbutton").click();
    await page.getByRole("spinbutton").fill(userMobileNo);
    await page.getByRole("button", { name: "Get OTP" }).click();
    await page.getByRole("dialog").locator("#otpInput").fill(loginOtp);
    await page.getByRole("dialog").locator("#otpInput").press("Enter");
    await page.getByRole("button", { name: "Verify" }).click();
    await page.getByRole("banner").getByRole("link", { name: "Request Quote for Bulk" }).click();
    await page.locator("buyer-root").click();
    
    for (let i = 0; i < products.length; i++) {
        console.log("Adding product:", products[i], "with search text:", searchText[i]);
        await page.locator("#searchid").click();
        await page.locator("#searchid").fill(searchText[i]);
        await page.locator("#suggestion-box").getByText(products[i]).click();
        await takeScreenshot('search-result-' + (i + 1));
        await page.locator("#searchid").click();
    }
    
    await page.getByRole("button", { name: "Proceed" }).click();
    await page.getByRole("textbox").nth(1).fill(quantites[0].toString());
    await page.getByRole("link", { name: "Edit" }).first().click();
    await page.getByRole("spinbutton").first().click();
    await page.getByRole("spinbutton").first().fill(milestonePercentages[0].toString());
    await page.getByRole("spinbutton").first().press("Tab");
    await page.getByRole("spinbutton").nth(1).fill(milestonePercentages[1].toString());
    await page.getByRole("spinbutton").nth(1).press("Tab");
    await page.getByRole("spinbutton").nth(2).press("Tab");
    await page.locator("#allowSpecificBrands1").nth(2).check();
    await takeScreenshot('milestones-entered');
    await page.getByRole("button", { name: "Save" }).first().click();
    await page.locator(".row.grey-panel-1").click();
    await page.getByRole("textbox").nth(2).press("ArrowDown");
    await page.getByRole("textbox").nth(2).press("ArrowDown");
    await page.getByRole("textbox").nth(2).press("ArrowDown");
    await page.getByRole("textbox").nth(2).press("ArrowDown");
    await page.getByRole("textbox").nth(2).press("ArrowDown");
    await page.getByRole("textbox").nth(2).press("ArrowDown");
    await page.getByRole("textbox").nth(2).press("ArrowDown");
    await page.getByRole("textbox").nth(3).click();
    await page.getByRole("textbox").nth(3).fill(quantites[1].toString());
    await takeScreenshot('requirements-entered');
    await page.getByRole("button", { name: "Proceed" }).click();
    await takeScreenshot('seller-search');
    await page.getByRole("button", { name: "Submit Request" }).click();
    await expect(page.getByText("Share your feedback")).toBeVisible();
    await page.getByRole("button", { name: "Close" }).click();
    await expect(page.getByText("Request Successfully Sent")).toBeVisible();
    await expect(page.getByText("Your RFQ ID is")).toBeVisible();
    
    const fullMessage: string | null = await page.getByText("Your RFQ ID is").textContent();
    const separator = 'Your RFQ ID is';
    if (fullMessage !== null) {
        const startIndex = fullMessage.indexOf(separator);
        const positionAfterSeparator = startIndex + separator.length;
        const rfqId = fullMessage.substring(positionAfterSeparator).trim();
        console.log("Extracted RFQ ID:", rfqId);
        
        // Write RFQ ID to file for pipeline use
        const outputFile = path.resolve(__dirname, 'test-results', 'rfq_id.txt');
        fs.writeFileSync(outputFile, rfqId);
        console.log(`RFQ ID saved to: ${outputFile}`);
    }
    
    await page.getByRole("button", { name: "Track your RFQ" }).click();
    await takeScreenshot('final-result');

    // ---------------------
    console.log(`\n✅ Test completed successfully!`);
    console.log(`📸 Screenshots saved in: ${screenshotDir}`);
    console.log(`🎥 Video will be saved in: ${videoDir}`);
    await context.close();
    await browser.close();
});
