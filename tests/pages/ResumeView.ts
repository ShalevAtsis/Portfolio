import { type Page, type Locator } from '@playwright/test';

export class ResumeView {
    readonly page: Page;
    readonly pdfObject: Locator;
    readonly downloadButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pdfObject = page.locator('object[type="application/pdf"]');
        this.downloadButton = page.getByRole('link', { name: /Download PDF/i });
    }
}
