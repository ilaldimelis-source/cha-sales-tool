const { test, expect } = require('@playwright/test');

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/CHA/i);
});

test('sidebar exists', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#sidebar')).toBeVisible();
});
