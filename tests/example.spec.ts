import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  // Expect a title "to contain" a substring (make sure the title is correct).
  await expect(page).toHaveTitle(/AngularCURD/);
});

test('search by ID button is clickable', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  // Click the Search By Id button.
  await page.getByRole('button', { name: 'Search By Id' }).click();

  // Expect page to have a heading with the name 'Search for a Book'.
  await expect(page.getByRole('heading', { name: 'Search for a Book' })).toBeVisible();
});
