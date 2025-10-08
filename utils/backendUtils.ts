import { Page, request, APIRequestContext } from '@playwright/test';

export class backendUtils {
    readonly page: Page;
    apiRequestContext: APIRequestContext | undefined;

    constructor(page: Page) {
        this.page = page;
        
    }

    async init() {
        this.apiRequestContext = await request.newContext();
    }

    async sendRequest(endpoint: string, data: JSON) {
        if (!this.apiRequestContext) {
            throw new Error('APIRequestContext not initialized. Call init() first.');
        }
        const response = await this.apiRequestContext.post(endpoint, {
            data: data
        });

        const responseBody = await response.json();
        return responseBody;
    }
}

