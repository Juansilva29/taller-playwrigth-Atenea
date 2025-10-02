import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';


let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
  registerPage = new RegisterPage(page);
  await registerPage.visitRegisterPage();
});

test('TC-1 verify visual elements in singup page', async ({ page }) => {

  await expect(registerPage.firstNameInput).toBeVisible();
  await expect(registerPage.lastNameInput).toBeVisible();
  await expect(registerPage.emailInput).toBeVisible();
  await expect(registerPage.passwordInput).toBeVisible();
  await expect(registerPage.registerButton).toBeVisible();
});


test('TC-2 verify register button is disabled for default', async ({ page }) => {
  await expect(registerPage.registerButton).toBeDisabled();
});

test('TC-3 verify register button is enabled when the form is completed', async ({ page }) => {
  await registerPage.completeRegister('Juan', 'Silva', 'Juan' + Date.now().toString() + '@test.com', 'Juan1234');
  await expect(registerPage.registerButton).toBeEnabled();

});

test('TC-4 verify re- direct to login page when click on register', async ({ page }) => {
  await registerPage.LoginButton.click();
  await expect(page).toHaveURL('http://localhost:3000/login');
});

test('TC-5 verify register success', async ({ page }) => {
  await registerPage.completeRegister('Juan', 'Silva', 'Juan' + Date.now().toString() + '@test.com', 'Juan1234');
  await registerPage.clickRegister();
  await expect(page.getByText('Registro exitoso')).toBeVisible();
});


test('TC-6 verify user with email already exists', async ({ page }) => {
  const email = 'Juan' + Date.now().toString() + '@test.com';
  await registerPage.completeAndSubmitRegister('Juan', 'Silva', email, 'Juan1234');
  await expect(page.getByText('Registro exitoso')).toBeVisible();
  await registerPage.visitRegisterPage();
  await registerPage.completeAndSubmitRegister('Juan', 'Silva', email, 'Juan1234');
  await expect(page.getByText('email already in use')).toBeVisible();
  await expect(page.getByText('Registro exitoso')).not.toBeVisible();
});