import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly registerButton: Locator;
    readonly LoginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('input[name = "firstName"]');
        this.lastNameInput = page.locator('input[name = "lastName"]');
        this.emailInput = page.locator('input[name = "email"]');
        this.passwordInput = page.locator('input[name = "password"]');
        this.registerButton = page.getByTestId('boton-registrarse');
        this.LoginButton = page.getByTestId('boton-login-header-signup');
    }

    async visitRegisterPage() {
        await this.page.goto('http://localhost:3000/');
    }

    async completeRegister(firstName: string, lastName: string, email: string, password: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async completeRegisterUser(usuario: {nombre: string, apellido: string, email: string, password: string}) {
        await this.firstNameInput.fill(usuario.nombre);
        await this.lastNameInput.fill(usuario.apellido);
        await this.emailInput.fill(usuario.email);
        await this.passwordInput.fill(usuario.password);
    }

    async clickRegister() {
        await this.registerButton.click();
    }

    async completeAndSubmitRegister(usuario: {nombre: string, apellido: string, email: string, password: string}) {
        await this.completeRegister(usuario.nombre, usuario.apellido, usuario.email, usuario.password);
        await this.clickRegister();
    }
}
