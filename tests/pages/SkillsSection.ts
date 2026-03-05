import { type Page, type Locator } from '@playwright/test';

export class SkillsSection {
    readonly page: Page;
    readonly sectionLocator: Locator;
    readonly heading: Locator;
    readonly filterInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sectionLocator = page.locator('section#skills');
        this.heading = this.sectionLocator.getByRole('heading', { level: 2, name: /Skills/i });
        this.filterInput = this.sectionLocator.getByRole('textbox', { name: /Filter skills/i });
    }

    getCategoryHeading(category: string): Locator {
        return this.sectionLocator.getByText(category, { exact: true });
    }

    getSkillLocator(skillName: string): Locator {
        return this.sectionLocator.getByText(skillName, { exact: true });
    }

    async filterSkills(query: string) {
        await this.filterInput.click();
        await this.filterInput.fill(query);
    }

    async clearFilter() {
        await this.filterInput.clear();
    }
}
