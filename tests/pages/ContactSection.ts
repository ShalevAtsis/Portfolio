import { type Page, type Locator } from '@playwright/test';

export class ContactSection {
    readonly page: Page;
    readonly sectionLocator: Locator;
    readonly emailButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sectionLocator = page.locator('section#contact');
        this.emailButton = this.sectionLocator.getByRole('link', { name: /Drop me an email/i });
    }
}
