import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import TestData from '../data/testData.json';

let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
  registerPage = new RegisterPage(page);
  await registerPage.visitRegisterPage();
});

test('TC-1 verify visual elements in singup page', async ({ page }) => {
  await test.step('Verificar que los campos del formulario de registro sean visibles', async () => {
    await expect(registerPage.firstNameInput).toBeVisible();
    await expect(registerPage.lastNameInput).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.registerButton).toBeVisible();
  });
});

test('TC-2 verify register button is disabled for default', async ({ page }) => {
  await test.step('Verificar que el botón de registro esté deshabilitado por defecto', async () => {
    await expect(registerPage.registerButton).toBeDisabled();
  });
});

test('TC-3 verify register button is enabled when the form is completed', async ({ page }) => {
  await test.step('Completar el formulario y verificar que el botón de registro se habilite', async () => {
    const email = 'Juan' + Date.now().toString() + '@test.com';
    TestData.usuarioValido.email = email;
    await registerPage.completeRegisterUser(TestData.usuarioValido);
    await expect(registerPage.registerButton).toBeEnabled();
  });
});

test('TC-4 verify re- direct to login page when click on register', async ({ page }) => {
  await test.step('Hacer clic en el botón de login y verificar redirección a la página de login', async () => {
    await registerPage.LoginButton.click();
    await expect(page).toHaveURL('http://localhost:3000/login');
  });
});

test('TC-5 verify register success', async ({ page }) => {
  await test.step('Completar el registro y verificar mensaje de éxito', async () => {
    const email = 'Juan' + Date.now().toString() + '@test.com';
    TestData.usuarioValido.email = email;
    await registerPage.completeRegisterUser(TestData.usuarioValido);
    await registerPage.clickRegister();
    await expect(page.getByText('Registro exitoso')).toBeVisible();
  });
});

test('TC-6 verify user with email already exists', async ({ page }) => {
  await test.step('Registrar usuario con email existente y verificar mensajes de error y éxito', async () => {
    const email = 'Juan' + Date.now().toString() + '@test.com';
    TestData.usuarioInvalido.email = email;
    await registerPage.completeAndSubmitRegister(TestData.usuarioInvalido);
    await expect(page.getByText('Registro exitoso')).toBeVisible();
    await registerPage.visitRegisterPage();
    await registerPage.completeAndSubmitRegister(TestData.usuarioInvalido);
    await expect(page.getByText('email already in use')).toBeVisible();
    await expect(page.getByText('Registro exitoso')).not.toBeVisible();
  });
});