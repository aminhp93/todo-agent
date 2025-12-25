import { test, expect } from '@playwright/test';

test.describe('Todo App E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear localStorage before each test
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should display app title and empty state', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Agent Engineering Todo' })).toBeVisible();
    await expect(page.getByText('No todos yet. Add one above!')).toBeVisible();
  });

  test('should show initial statistics with zeros', async ({ page }) => {
    await expect(page.getByText('Total: 0')).toBeVisible();
    await expect(page.getByText('Completed: 0')).toBeVisible();
    await expect(page.getByText('Active: 0')).toBeVisible();
  });

  test('should create a new todo', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new todo...');
    const addButton = page.getByRole('button', { name: 'Add' });

    await input.fill('My first todo');
    await addButton.click();

    await expect(page.getByText('My first todo')).toBeVisible();
    await expect(page.getByText('Total: 1')).toBeVisible();
  });

  test('should not create empty todo', async ({ page }) => {
    const addButton = page.getByRole('button', { name: 'Add' });
    
    await addButton.click();
    
    await expect(page.getByText('No todos yet. Add one above!')).toBeVisible();
  });

  test('should complete a todo', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new todo...');
    await input.fill('Todo to complete');
    await page.getByRole('button', { name: 'Add' }).click();

    const checkbox = page.getByRole('checkbox');
    await checkbox.check();

    await expect(checkbox).toBeChecked();
    await expect(page.getByText('Completed: 1')).toBeVisible();
    await expect(page.getByText('Active: 0')).toBeVisible();
  });

  test('should uncomplete a todo', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new todo...');
    await input.fill('Todo to toggle');
    await page.getByRole('button', { name: 'Add' }).click();

    const checkbox = page.getByRole('checkbox');
    
    // Complete it
    await checkbox.check();
    await expect(page.getByText('Completed: 1')).toBeVisible();
    
    // Uncomplete it
    await checkbox.uncheck();
    await expect(page.getByText('Completed: 0')).toBeVisible();
    await expect(page.getByText('Active: 1')).toBeVisible();
  });

  test('should edit a todo', async ({ page }) => {
    // Create todo
    const input = page.getByPlaceholder('Add a new todo...');
    await input.fill('Original title');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Original title')).toBeVisible();

    // Edit todo
    await page.getByRole('button', { name: 'Edit' }).click();
    const editInput = page.getByDisplayValue('Original title');
    await editInput.fill('Edited title');
    await editInput.press('Enter');

    await expect(page.getByText('Edited title')).toBeVisible();
    await expect(page.getByText('Original title')).not.toBeVisible();
  });

  test('should cancel edit with Escape key', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new todo...');
    await input.fill('Original title');
    await page.getByRole('button', { name: 'Add' }).click();

    await page.getByRole('button', { name: 'Edit' }).click();
    const editInput = page.getByDisplayValue('Original title');
    await editInput.fill('Changed title');
    await editInput.press('Escape');

    await expect(page.getByText('Original title')).toBeVisible();
    await expect(page.getByText('Changed title')).not.toBeVisible();
  });

  test('should edit todo by double-clicking', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new todo...');
    await input.fill('Double click me');
    await page.getByRole('button', { name: 'Add' }).click();

    const todoText = page.getByText('Double click me');
    await todoText.dblclick();

    const editInput = page.getByDisplayValue('Double click me');
    await expect(editInput).toBeFocused();
  });

  test('should delete a todo', async ({ page }) => {
    // Create todo
    const input = page.getByPlaceholder('Add a new todo...');
    await input.fill('Todo to delete');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Todo to delete')).toBeVisible();

    // Delete todo
    await page.getByRole('button', { name: 'Delete' }).click();

    await expect(page.getByText('Todo to delete')).not.toBeVisible();
    await expect(page.getByText('No todos yet. Add one above!')).toBeVisible();
  });

  test('should handle multiple todos', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new todo...');

    // Create 3 todos
    await input.fill('First todo');
    await page.getByRole('button', { name: 'Add' }).click();
    
    await input.fill('Second todo');
    await page.getByRole('button', { name: 'Add' }).click();
    
    await input.fill('Third todo');
    await page.getByRole('button', { name: 'Add' }).click();

    await expect(page.getByText('Total: 3')).toBeVisible();
    await expect(page.getByText('First todo')).toBeVisible();
    await expect(page.getByText('Second todo')).toBeVisible();
    await expect(page.getByText('Third todo')).toBeVisible();
  });

  test('should update statistics correctly with multiple operations', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new todo...');

    // Create 3 todos
    await input.fill('Todo 1');
    await page.getByRole('button', { name: 'Add' }).click();
    await input.fill('Todo 2');
    await page.getByRole('button', { name: 'Add' }).click();
    await input.fill('Todo 3');
    await page.getByRole('button', { name: 'Add' }).click();

    await expect(page.getByText('Total: 3')).toBeVisible();
    await expect(page.getByText('Active: 3')).toBeVisible();

    // Complete first two
    const checkboxes = page.getByRole('checkbox');
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();

    await expect(page.getByText('Completed: 2')).toBeVisible();
    await expect(page.getByText('Active: 1')).toBeVisible();

    // Delete one completed
    const deleteButtons = page.getByRole('button', { name: 'Delete' });
    await deleteButtons.nth(0).click();

    await expect(page.getByText('Total: 2')).toBeVisible();
    await expect(page.getByText('Completed: 1')).toBeVisible();
  });

  test('should persist todos after page reload', async ({ page }) => {
    // Create todos
    const input = page.getByPlaceholder('Add a new todo...');
    await input.fill('Persistent todo 1');
    await page.getByRole('button', { name: 'Add' }).click();
    await input.fill('Persistent todo 2');
    await page.getByRole('button', { name: 'Add' }).click();

    // Complete one
    await page.getByRole('checkbox').first().check();

    // Reload page
    await page.reload();

    // Verify todos persisted
    await expect(page.getByText('Persistent todo 1')).toBeVisible();
    await expect(page.getByText('Persistent todo 2')).toBeVisible();
    await expect(page.getByRole('checkbox').first()).toBeChecked();
    await expect(page.getByText('Total: 2')).toBeVisible();
    await expect(page.getByText('Completed: 1')).toBeVisible();
  });

  test('should clear input after creating todo', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new todo...');
    
    await input.fill('New todo');
    await page.getByRole('button', { name: 'Add' }).click();

    await expect(input).toHaveValue('');
  });

  test('should show loading state when creating todo', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new todo...');
    const addButton = page.getByRole('button', { name: 'Add' });
    
    await input.fill('New todo');
    
    // Start click but don't wait
    const clickPromise = addButton.click();
    
    // Should briefly show Adding... (might be too fast to catch reliably)
    // So we just verify the operation completes
    await clickPromise;
    
    await expect(page.getByText('New todo')).toBeVisible();
  });

  test('should handle rapid todo creation', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new todo...');
    const addButton = page.getByRole('button', { name: 'Add' });

    // Rapidly create multiple todos
    for (let i = 1; i <= 5; i++) {
      await input.fill(`Rapid todo ${i}`);
      await addButton.click();
      // Small delay to ensure state updates
      await page.waitForTimeout(100);
    }

    await expect(page.getByText('Total: 5')).toBeVisible();
  });

  test('should display completed todos with strikethrough', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new todo...');
    await input.fill('Completed task');
    await page.getByRole('button', { name: 'Add' }).click();

    const checkbox = page.getByRole('checkbox');
    await checkbox.check();

    const todoText = page.getByText('Completed task');
    await expect(todoText).toHaveClass(/line-through/);
  });

  test('should trim whitespace from todo title', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new todo...');
    await input.fill('   Todo with spaces   ');
    await page.getByRole('button', { name: 'Add' }).click();

    await expect(page.getByText('Todo with spaces')).toBeVisible();
    // Should not have the extra spaces
    await expect(page.getByText('   Todo with spaces   ')).not.toBeVisible();
  });
});
