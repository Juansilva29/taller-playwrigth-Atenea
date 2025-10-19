import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboardPage';
import { ModalTransferencia } from '../pages/modalTrasferencia';
import TestData from '../data/testData.json';

let dashboardPage: DashboardPage;
let modalTransferencia: ModalTransferencia;


const testUsuarioEnvia = test.extend({
    storageState: require.resolve('../playwright/.auth/usuario.envia.json')
})
const testUsuarioRecibe = test.extend({
    storageState: require.resolve('../playwright/.auth/usuario.recibe.json')
})

test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    modalTransferencia = new ModalTransferencia(page);
    await dashboardPage.visitdashboardPage();
});

testUsuarioEnvia('TC-1 transaccion exitosa', async ({ page }) => {
    await expect(dashboardPage.dashboardTitle).toBeVisible();
    await dashboardPage.botonEnviar.click();
    await modalTransferencia.completarYEnviarDinero(TestData.usuarioReceptor.email, '100');
    await expect(page.getByText('Transferencia enviada a ' + TestData.usuarioReceptor.email)).toBeVisible();

});

testUsuarioRecibe('TC-2 Verificar ingreso de dinero', async ({ page }) => {
    await expect(dashboardPage.dashboardTitle).toBeVisible();
await expect(page.getByText('Transferencia de ' + TestData.usuarioExistente.email).first()).toHaveText('Transferencia de ' + TestData.usuarioExistente.email);
});