import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/dashboardPage';
import TestData from '../data/testData.json';
import { PassThrough } from 'stream';

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
        data: {
            firstName: TestData.usuarioValido.nombre,
            lastName: TestData.usuarioValido.apellido,
            email: email,
            password: TestData.usuarioValido.password,
        }
    });

    expect(response.status()).toBe(201);

    const responsePromiseLogin = page.waitForResponse('http://localhost:6007/api/auth/login');
    await loginPage.completeAndSubmitLogin({ email: email, password: TestData.usuarioValido.password });
    const responseLogin = await responsePromiseLogin;
    const reponseBodyLogin = await responseLogin.json();
    expect(responseLogin.status()).toBe(200);
    expect(reponseBodyLogin).toHaveProperty('token');
    expect(reponseBodyLogin).toHaveProperty('user');
    expect(reponseBodyLogin.user).toEqual(expect.objectContaining({
        id: expect.any(String),
        firstName: TestData.usuarioValido.nombre,
        lastName: TestData.usuarioValido.apellido,
        email: email,
    }));
    await expect(page.getByText('Inicio de sesión exitoso')).toBeVisible();
    await expect(dashboardPage.dashboardTitle).toBeVisible();
});