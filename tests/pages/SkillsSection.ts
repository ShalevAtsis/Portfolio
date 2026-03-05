import { type Page, type Locator } from '@playwright/test';

export class SkillsSection {
    readonly page: Page;
    readonly sectionLocator: Locator;
    readonly heading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sectionLocator = page.locator('section#skills');
        this.heading = this.sectionLocator.getByRole('heading', { level: 2, name: /Technical Arsenal/i });
    }

    getCategoryHeading(category: string): Locator {
        // e.g., "Languages & Core", "Backend & Architecture"
        return this.sectionLocator.getByRole('heading', { name: category });
    }

    getSkillLocator(skillName: string): Locator {
        // Find the specific text representation of a skill (e.g., 'Python', 'React', etc) inside the skills section
        return this.sectionLocator.getByText(skillName, { exact: true });
    }
}
