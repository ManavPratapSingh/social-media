// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
  
  test('Landing page should show Log In and Sign Up options', async ({ page }) => {
    await page.goto('/');
    // Check for "Sign In" and "Sign Up" links (assuming they exist on the landing page)
    // If your Landing page uses specific text or components, update these selectors.
    await expect(page.getByRole('button', { name: /log in/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /sign up/i })).toBeVisible();
  });

  test('User can navigate to Sign In page', async ({ page }) => {
    await page.goto('/');
    // Assuming there's a link to sign-in
    const signInButton = page.getByRole('button', { name: /log in/i });
    if (await signInButton.isVisible()) {
      await signInButton.click();
      await expect(page).toHaveURL(/\/sign-in/);
    } else {
      await page.goto('/sign-in');
    }
    await expect(page.locator('h2')).toContainText('Sign In');
  });

  test('User can navigate to Sign Up page', async ({ page }) => {
    await page.goto('/');
    const signUpButton = page.getByRole('button', { name: /sign up/i });
    if (await signUpButton.isVisible()) {
      await signUpButton.click();
      await expect(page).toHaveURL(/\/sign-up/);
    } else {
      await page.goto('/sign-up');
    }
    await expect(page.locator('h2')).toContainText('Sign Up');
  });

  test('Failed login shows an alert', async ({ page }) => {
    await page.goto('/sign-in');
    
    // Fill with wrong credentials
    await page.locator('#user_name').fill('wronguser');
    await page.locator('#passwd').fill('wrongpassword');
    
    // Listen for the alert
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Error');
      await dialog.dismiss();
    });
    
    await page.getByRole('button', { name: /sign in/i }).click();
  });

  test('Successful Login with Mocking', async ({ page }) => {
    // Intercept the sign-in API call
    await page.route('**/auth/sign-in', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        headers: {
          'Set-Cookie': 'token=mock_token; Path=/; HttpOnly; SameSite=Lax'
        },
        body: JSON.stringify({
          message: "Signed in successfully",
          user: {
            _id: "mock_id_123",
            name: "Test User",
            user_name: "testuser",
            email: "test@example.com"
          }
        })
      });
    });

    await page.goto('/sign-in');
    await page.locator('#user_name').fill('testuser');
    await page.locator('#passwd').fill('password123');
    
    // We expect the app to show a success alert and redirect to /home
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('success');
      await dialog.dismiss();
    });

    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Check for redirection to /home
    await expect(page).toHaveURL(/\/home/);
  });

  test('Successful Signup with Mocking', async ({ page }) => {
    // Intercept the sign-up API call
    await page.route('**/auth/sign-up', async route => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        headers: {
          'Set-Cookie': 'token=mock_token_new; Path=/; HttpOnly; SameSite=Lax'
        },
        body: JSON.stringify({
          message: "user created successfully",
          user: {
            _id: "mock_id_456",
            name: "New User",
            user_name: "newuser",
            email: "new@example.com"
          }
        })
      });
    });

    await page.goto('/sign-up');
    await page.locator('#name').fill('New User');
    await page.locator('#email').fill('new@example.com');
    await page.locator('#userName').fill('newuser');
    await page.locator('#passwd').fill('password123');

    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('success');
      await dialog.dismiss();
    });

    await page.getByRole('button', { name: /sign up/i }).click();

    // Check for redirection to /home
    await expect(page).toHaveURL(/\/home/);
  });

});
