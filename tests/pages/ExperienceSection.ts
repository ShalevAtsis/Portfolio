import { type Page, type Locator } from '@playwright/test';

export class ExperienceSection {
    readonly page: Page;
    readonly sectionLocator: Locator;
    readonly heading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sectionLocator = page.locator('section#experience');
        this.heading = this.sectionLocator.getByRole('heading', { level: 2, name: /Experience & Education/i });
    }

    getJobTitle(title: string): Locator {
        return this.sectionLocator.getByRole('heading', { level: 3, name: title });
    }

    getCompanyName(company: string): Locator {
        return this.sectionLocator.getByText(company, { exact: true });
    }

    getCompanyLink(companyName: string): Locator {
        return this.sectionLocator.getByRole('link', { name: companyName });
    }
}
