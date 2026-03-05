import { type Page, type Locator } from '@playwright/test';

export class ExperienceSection {
    readonly page: Page;
    readonly sectionLocator: Locator;
    readonly heading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sectionLocator = page.locator('section#experience');
        this.heading = this.sectionLocator.getByRole('heading', { level: 2, name: /Experience/i });
    }

    getJobTitle(title: string): Locator {
        // e.g., "Full Stack Software Engineer", "Combat Soldier & Commander"
        return this.sectionLocator.getByRole('heading', { name: title });
    }

    getCompanyLink(companyName: string): Locator {
        return this.sectionLocator.getByRole('link', { name: companyName });
    }
}
