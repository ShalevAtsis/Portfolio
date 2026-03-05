import { type Page, type Locator } from '@playwright/test';

export class PersonalWorldSection {
    readonly page: Page;
    readonly sectionLocator: Locator;
    readonly globeCanvas: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sectionLocator = page.locator('section#personal-world');
        this.globeCanvas = this.sectionLocator.locator('canvas');
    }

    getInterestTab(tabName: string): Locator {
        return this.sectionLocator.getByRole('tab', { name: tabName });
    }

    getAudioPlayerTarget(songName: string): Locator {
        return this.sectionLocator.getByText(songName, { exact: false });
    }
}
