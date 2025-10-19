import { Page, Locator, } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly dashboardTitle: Locator;
    readonly botonCrearCuenta : Locator;
    readonly botonEnviar: Locator;
    readonly saldoTotalLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardTitle = page.getByTestId('titulo-dashboard');
        this.botonCrearCuenta = page.getByTestId('tarjeta-agregar-cuenta');
        this.botonEnviar = page.getByTestId('boton-enviar');
        this.saldoTotalLabel = page.getByTestId('saldo-total-dashboard');
    }

        async visitdashboardPage() {
        await this.page.goto('http://localhost:3000/dashboard');
    }

    async clickCrearCuenta() {
        await this.botonCrearCuenta.click();
    }




}
