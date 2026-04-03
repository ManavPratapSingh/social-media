// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Post Creation Flow', () => {

  test.beforeEach(async ({ page }) => {
    // Mock user data for the session
    await page.addInitScript(() => {
      window.localStorage.setItem('userData', JSON.stringify({
        _id: 'mock_userId_123',
        name: 'Test User',
        user_name: 'testuser',
        email: 'test@example.com'
      }));
    });

    // Mock the session check
    await page.route('**/api/user', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          _id: 'mock_userId_123',
          name: 'Test User',
          user_name: 'testuser',
          email: 'test@example.com'
        })
      });
    });

    await page.goto('/home');
  });

  test('User can open the Upload Modal', async ({ page }) => {
    const createButton = page.getByText('Create', { exact: true });
    await createButton.click();
    
    // Check if modal title is visible
    await expect(page.getByRole('heading', { name: /upload media/i })).toBeVisible();
  });

  test('User can successfully upload a post with mocking', async ({ page }) => {
    // Intercept the upload API call
    await page.route('**/api/post/upload', async route => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          message: "post created successfully!",
          populatedPost: {
            _id: "mock_post_id_456",
            caption: "This is a test post",
            media_url: "http://example.com/mock-image.jpg",
            author: {
              user_name: "testuser",
              profile_img: ""
            }
          }
        })
      });
    });

    // Open Modal
    await page.getByText('Create', { exact: true }).click();

    // Fill caption
    await page.getByPlaceholder('Write a caption...').fill('This is a test post');

    // Simulate file upload (mocked)
    // In our component, handle_input_media logic is triggered by clicking a div that clicks a hidden input.
    // However, in E2E we usually use setInputFiles on the actual input[type="file"].
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('div.border-dashed').click(); // This triggers the hidden input's click
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles({
      name: 'test.png',
      mimeType: 'image/png',
      buffer: Buffer.from('')
    });

    // Listen for the success alert
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('post created successfully');
      await dialog.dismiss();
    });

    // Click Upload button
    await page.getByRole('button', { name: /upload post/i }).click();

    // Verify modal closes (in the component it reloads the window, 
    // which in a test might just navigate back to /home)
    // Given the component calls window.location.reload(), Playwright will detect a navigation.
  });

});
