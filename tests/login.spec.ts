import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/dashboardPage';
import TestData from '../data/testData.json';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.visitLoginPage();
});

test('TC-1 verify login success', async ({ page }) => {
    await test.step('Completar el login y verificar mensaje de éxito', async () => {
        await loginPage.completeAndSubmitLogin(TestData.usuarioExistente);
        await expect(page.getByText('Inicio de sesión exitoso')).toBeVisible();
        await expect(dashboardPage.dashboardTitle).toBeVisible();
    });
});

test('TC-2 verify login from backend', async ({ page, request }) => {
    const email = 'Juan' + Date.now().toString() + '@test.com';
    TestData.usuarioValido.email = email;
    const response = await request.post('http://localhost:6007/api/auth/signup', {
    });

    const responseBody = await response.json();
    expect(response.status()).toBe(201);

    await loginPage.completeAndSubmitLogin(TestData.usuarioExistente);
    await expect(page.getByText('Inicio de sesión exitoso')).toBeVisible();
    await expect(dashboardPage.dashboardTitle).toBeVisible();
});