import { test, expect } from '@playwright/test';

test('TC-1 verify visual elements in singup page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.locator('input[name = "firstName"]')).toBeVisible();
  await expect(page.locator('input[name = "lastName"]')).toBeVisible();
  await expect(page.locator('input[name = "email"]')).toBeVisible();
  await expect(page.locator('input[name = "password"]')).toBeVisible();
  await expect(page.getByTestId('boton-registrarse')).toBeVisible();
});

test('TC-2 verify register button is disabled for default', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByTestId('boton-registrarse')).toBeDisabled();
});

test('TC-3 verify register button is enabled when the form is completed', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name = "firstName"]').fill('Juan');
  await page.locator('input[name = "lastName"]').fill('Silva');
  await page.locator('input[name = "email"]').fill('Juan@test.com');
  await page.locator('input[name = "password"]').fill('Juan1234');
  await expect(page.getByTestId('boton-registrarse')).toBeEnabled();

});

test('TC-4 verify re- direct to login page when click on register', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByTestId('boton-login-header-signup').click();
  await expect(page).toHaveURL('http://localhost:3000/login');
  await page.waitForTimeout(5000);
});

test('TC-5 verify register success', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name = "firstName"]').fill('Juan');
  await page.locator('input[name = "lastName"]').fill('Silva');
  await page.locator('input[name = "email"]').fill('Juan' + Date.now().toString() + '@test.com');
  await page.locator('input[name = "password"]').fill('Juan1234');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso')).toBeVisible();
});


test('TC-6 verify user with email already exists', async ({ page }) => {
  const email = 'Juan' + Date.now().toString() + '@test.com';
  await page.goto('http://localhost:3000/');
  await page.locator('input[name = "firstName"]').fill('Juan');
  await page.locator('input[name = "lastName"]').fill('Silva');
  await page.locator('input[name = "email"]').fill(email);
  await page.locator('input[name = "password"]').fill('Juan1234');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso')).toBeVisible();
  await page.goto('http://localhost:3000/');
  await page.locator('input[name = "firstName"]').fill('Juan');
  await page.locator('input[name = "lastName"]').fill('Silva');
  await page.locator('input[name = "email"]').fill(email);
  await page.locator('input[name = "password"]').fill('Juan1234');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('email already in use')).toBeVisible();
  await expect(page.getByText('Registro exitoso')).not.toBeVisible();
});