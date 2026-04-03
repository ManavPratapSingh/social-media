// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Profile Management', () => {

  test.beforeEach(async ({ page }) => {
    // Mock user data for the session
    const userData = {
      _id: 'mock_userId_123',
      name: 'Initial Name',
      user_name: 'testuser',
      email: 'test@example.com',
      bio: 'Initial bio',
      profile_img: 'http://example.com/initial.jpg'
    };

    await page.addInitScript((data) => {
      window.localStorage.setItem('userData', JSON.stringify(data));
    }, userData);

    // Mock the session check
    await page.route('**/api/user', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(userData)
      });
    });

    // Mock the user profile API (for the profile page)
    await page.route('**/api/user/profile/testuser', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(userData)
      });
    });

    await page.goto('/profile/testuser');
  });

  test('User can open Edit Profile modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Edit Profile' }).click();
    await expect(page.getByPlaceholder('Enter Your Name')).toBeVisible();
    await expect(page.getByPlaceholder('Bio')).toBeVisible();
  });

  test('User can successfully update profile details', async ({ page }) => {
    // Intercept the patch API call
    await page.route('**/api/user/profile/mock_userId_123', async route => {
      if (route.request().method() === 'PATCH') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            message: "Changes saved successfully!",
            updatedUser: {
              _id: "mock_userId_123",
              name: "Updated Name",
              user_name: "testuser",
              bio: "Updated bio"
            }
          })
        });
      } else {
        await route.continue();
      }
    });

    await page.getByRole('button', { name: 'Edit Profile' }).click();

    // Fill new details
    await page.getByPlaceholder('Enter Your Name').fill('Updated Name');
    await page.getByPlaceholder('Bio').fill('Updated bio');

    // Handle the success alert
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('success');
      await dialog.dismiss();
    });

    // Click Confirm
    await page.getByRole('button', { name: 'Confirm' }).click();

    // The component calls window.location.reload()
    // Playwright will detect the reload.
  });

});
