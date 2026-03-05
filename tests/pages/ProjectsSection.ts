import { type Page, type Locator } from '@playwright/test';

export class ProjectsSection {
    readonly page: Page;
    readonly sectionLocator: Locator;
    readonly heading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sectionLocator = page.locator('section#projects');
        this.heading = this.sectionLocator.getByRole('heading', { level: 2, name: /Featured Projects/i });
    }

    getProjectCardHeading(projectName: string): Locator {
        return this.sectionLocator.locator('h3', { hasText: projectName });
    }

    // Resolves the exact `a[target="_blank"]` pointing to the repo.
    getProjectExternalLink(projectName: string): Locator {
        return this.sectionLocator.locator('.h-full:has(h3:has-text("' + projectName + '"))')
            .locator('a[href*="github.com"]')
            .first();
    }

    async hoverProjectCard(projectName: string) {
        const cardHeading = this.getProjectCardHeading(projectName);
        // The card itself is the parent `.h-full` container 
        const cardContainer = cardHeading.locator('xpath=./ancestor::*[contains(@class, "h-full")][1]');
        await cardContainer.hover();
    }
}
