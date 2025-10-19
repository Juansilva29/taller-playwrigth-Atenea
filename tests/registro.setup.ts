import { test as setup, expect } from '@playwright/test'; // test as setup es un alias para test
import TestData from '../data/testData.json';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { ModalCrearCuenta } from '../pages/modalCrearCuenta';
import test from 'node:test';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let modalCrearCuenta: ModalCrearCuenta;

setup.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    modalCrearCuenta = new ModalCrearCuenta(page);
    await loginPage.visitLoginPage();
});

const usuarioEnviaAuthFile = 'playwright/.auth/usuario.envia.json';
const usuarioRecibeAuthFile = 'playwright/.auth/usuario.recibe.json';

setup('login con usuario que envia dinero', async ({ page }) => {

    await loginPage.completeAndSubmitLogin(TestData.usuarioExistente);
    await expect(page.getByText('Inicio de sesión exitoso')).toBeVisible();
    await dashboardPage.clickCrearCuenta();
    await modalCrearCuenta.seleccionarTipoCuenta('Débito');
    await modalCrearCuenta.ingresarMonto('1000');
    await modalCrearCuenta.botonCrearCuenta.click();
    await expect(page.getByText('¡Cuenta creada exitosamente!')).toBeVisible();
    await page.context().storageState({ path: usuarioEnviaAuthFile });
});

setup('login con usuario que recibe dinero', async ({ page }) => {

    await loginPage.completeAndSubmitLogin(TestData.usuarioReceptor);
    await expect(page.getByText('Inicio de sesión exitoso')).toBeVisible();
    await page.context().storageState({ path: usuarioRecibeAuthFile });

});