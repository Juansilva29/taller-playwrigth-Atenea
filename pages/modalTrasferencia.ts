import { Page, Locator, } from '@playwright/test';

export class ModalTransferencia {
    readonly page: Page;
    readonly emailDestinatarioInput: Locator;
    readonly cuentaOrigenDropdown: Locator;
    readonly seleccionCuentaDropdown: Locator
    readonly montoInput: Locator;
    readonly botonEnviar: Locator;
    readonly botonCancelar: Locator;



    constructor(page: Page) {
        this.page = page;
        this.emailDestinatarioInput = page.getByRole('textbox', { name: 'Email del destinatario *' })
        this.cuentaOrigenDropdown = page.getByRole('combobox', { name: 'Cuenta origen *' })
        this.seleccionCuentaDropdown = page.getByRole('option', { name: '••••' })
        this.montoInput = page.getByRole('spinbutton', { name: 'Monto a enviar *' })
        this.botonEnviar = page.getByRole('button', { name: 'Enviar' })
        this.botonCancelar = page.getByRole('button', { name: 'Cancelar' })
    }

    async completarYEnviarDinero(emailDestinatario: string, monto: string) {
        await this.emailDestinatarioInput.fill(emailDestinatario);
        await this.cuentaOrigenDropdown.click();
        await this.seleccionCuentaDropdown.first().click();
        await this.montoInput.fill(monto);
        await this.botonEnviar.click();


    }



}
