import { type Page, type Locator } from '@playwright/test';

export class ResumeView {
    readonly page: Page;
    readonly pdfObject: Locator;
    readonly downloadButton: Locator;
    readonly pdfIframe: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pdfObject = page.getByLabel('Shalev Atsis resume PDF');
        this.downloadButton = page.getByRole('link', { name: /Download resume PDF/i });
        // The CV label visible inside the nested iframe
        this.pdfIframe = this.pdfObject.contentFrame().locator('iframe');
    }
}
