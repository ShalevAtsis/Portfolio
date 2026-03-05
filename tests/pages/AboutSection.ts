import { type Page, type Locator } from '@playwright/test';

export class AboutSection {
    readonly page: Page;
    readonly sectionLocator: Locator;
    readonly heading: Locator;
    readonly profileImage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sectionLocator = page.locator('section#about');
        this.heading = this.sectionLocator.getByRole('heading', { level: 2, name: /About Me/i }).first();
        this.profileImage = this.sectionLocator.getByAltText(/Hammerhead shark/i);
    }
}
