const { chromium } = require('playwright');
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Step 1: Navigate to https://example.com
  await page.goto('https://example.com');

  // Step 2: Verify the page title is "Example Domain"
  const title = await page.title();
  console.log(`Page title: ${title}`);
  if (title !== 'Example Domain') {
    throw new Error('Title verification failed');
  }

  // Step 3: Click on the "More information..." link using a recommended selector
  await page.getByRole('link', { name: 'More information...' }).click();

  // Step 4: Verify the browser is redirected to the IANA website
  await page.waitForURL('https://www.iana.org/help/example-domains');
  const currentURL = page.url();
  console.log(`Redirected URL: ${currentURL}`);
  if (currentURL !== 'https://www.iana.org/help/example-domains') {
    throw new Error('Redirection to IANA website failed');
  }

  // Step 5: Navigate to https://www.iana.org/about
  await page.goto('https://www.iana.org/about');

  // Step 6: Scroll down and navigate to the “TERMS OF SERVICE” page and click
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.getByRole('link', { name: 'TERMS OF SERVICE' }).click();

  await browser.close();
})()});
