import { type Page, type Locator } from '@playwright/test';

export class AboutSection {
    readonly page: Page;
    readonly sectionLocator: Locator;
    readonly heading: Locator;
    readonly tldrHeading: Locator;
    readonly engineerCard: Locator;
    readonly passionCard: Locator;
    readonly journeyCard: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sectionLocator = page.locator('section#about');
        this.heading = this.sectionLocator.getByRole('heading', { level: 2, name: /The TL;DR/i });
        this.tldrHeading = this.sectionLocator.getByRole('heading', { level: 2, name: /The TL;DR/i });
        this.engineerCard = this.sectionLocator.getByText('The Engineer', { exact: true });
        this.passionCard = this.sectionLocator.getByText('The Passion', { exact: true });
        this.journeyCard = this.sectionLocator.getByText('The Journey', { exact: true });
    }

    getCardHeading(title: 'Building in parallel' | 'At the AI frontier' | 'An unconventional path'): Locator {
        return this.sectionLocator.getByRole('heading', { level: 3, name: title });
    }
}
