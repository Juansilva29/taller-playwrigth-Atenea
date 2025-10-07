import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly LoginButton: Locator;
    readonly dashboardTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('input[name = "email"]');
        this.passwordInput = page.locator('input[name = "password"]');
        this.LoginButton = page.getByTestId('boton-login');
        this.dashboardTitle = page.getByTestId('logo-header-dashboard-text');
    }

        async visitLoginPage() {
        await this.page.goto('http://localhost:3000/login');
    }

    async completeLogin(usuario: {email: string, password: string}) {
        await this.emailInput.fill(usuario.email);
        await this.passwordInput.fill(  usuario.password);
    }

    async clickLogin() {
        await this.LoginButton.click();
    }   
    
    async completeAndSubmitLogin(usuario: {email: string, password: string}) {
        await this.completeLogin(usuario);
        await this.clickLogin();
        await expect(this.dashboardTitle).toBeVisible();

    }


}
