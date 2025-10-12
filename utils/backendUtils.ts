import { Page, request } from '@playwright/test'

export class BackendUtils {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async sendRequest(endpoint: string, data: any) {
        const response = await this.page.request.post(endpoint, {data: data});
        return response;
    }

}

