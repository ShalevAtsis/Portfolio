import { type Page, type Locator } from '@playwright/test';

export class PersonalWorldSection {
    readonly page: Page;
    readonly sectionLocator: Locator;
    readonly globeCanvas: Locator;
    readonly cinemaPanelButton: Locator;
    readonly libraryPanelButton: Locator;
    readonly nowPlayingWidget: Locator;
    readonly aiSuggestionEngine: Locator;
    readonly aiSuggestionInput: Locator;
    readonly aiSuggestionSendButton: Locator;
    readonly playButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sectionLocator = page.locator('section#personal-world');
        this.globeCanvas = this.sectionLocator.locator('canvas');
        this.cinemaPanelButton = this.sectionLocator.getByRole('button', { name: 'Cinema' });
        this.libraryPanelButton = this.sectionLocator.getByRole('button', { name: 'Library' });
        this.nowPlayingWidget = this.sectionLocator.getByText('Now Playing', { exact: false });
        this.aiSuggestionEngine = this.sectionLocator.getByText('AI Suggestion Engine', { exact: false });
        this.aiSuggestionInput = this.sectionLocator.getByRole('textbox', { name: /e.g. The Social Network/i });
        this.aiSuggestionSendButton = this.sectionLocator.getByRole('button', { name: 'Send', exact: true });
        this.playButton = this.sectionLocator.getByRole('button', { name: 'Play' });
    }

    getInterestTab(tabName: string): Locator {
        return this.sectionLocator.getByRole('tab', { name: tabName });
    }

    getAudioPlayerTarget(songName: string): Locator {
        return this.sectionLocator.getByText(songName, { exact: false });
    }

    async openCinemaPanel() {
        await this.cinemaPanelButton.click();
    }

    async openLibraryPanel() {
        await this.libraryPanelButton.click();
    }

    async submitAiSuggestion(text: string) {
        await this.aiSuggestionInput.fill(text);
        await this.aiSuggestionSendButton.click();
    }
}
