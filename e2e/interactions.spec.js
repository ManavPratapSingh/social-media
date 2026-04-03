// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Post Interactions', () => {

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

    // Mock the feed API
    await page.route('**/api/post/', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            _id: "post_1",
            caption: "First Mock Post",
            media_url: "https://picsum.photos/400/400?sig=1",
            media_type: "image",
            author: { user_name: "user1", profile_img: "" },
            likes: [],
            comments: [],
            updatedAt: Date.now()
          },
          {
            _id: "post_2",
            caption: "Second Mock Post",
            media_url: "https://picsum.photos/400/400?sig=2",
            media_type: "image",
            author: { user_name: "user2", profile_img: "" },
            likes: ["mock_userId_123"],
            comments: [{ user: "mock_userId_123", text: "Nice post!", created_at: Date.now() }],
            updatedAt: Date.now()
          }
        ])
      });
    });

    await page.goto('/home');
  });

  test('Feed should display posts', async ({ page }) => {
    await expect(page.getByText('First Mock Post')).toBeVisible();
    await expect(page.getByText('Second Mock Post')).toBeVisible();
  });

  test('User can see like count', async ({ page }) => {
    // Post 2 has 1 like. The component renders post.likes.length if truthy.
    await expect(page.getByText('1', { exact: true })).toBeVisible();
    // Post 1 has 0 likes. The component renders 0.
    await expect(page.getByText('0', { exact: true })).toBeVisible();
  });

  test('User can interact with Like button', async ({ page }) => {
    // Note: This verifies the button is clickable. 
    // Since backend logic isn't implemented, we just check for the element.
    const likeButton = page.locator('.fa-heart').first();
    await expect(likeButton).toBeVisible();
    await likeButton.click();
  });

  test('User can interact with Comment input', async ({ page }) => {
    const commentInput = page.getByPlaceholder('Add a comment...').first();
    await expect(commentInput).toBeVisible();
    await commentInput.fill('Great post!');
    
    const postButton = page.getByRole('button', { name: 'Post' }).first();
    await expect(postButton).toBeVisible();
    await postButton.click();
  });

});
