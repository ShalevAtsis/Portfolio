import { type Page, type Locator } from '@playwright/test';

export class HeroSection {
    readonly page: Page;
    readonly headingFirstFrame: Locator;
    readonly statusBadge: Locator;
    readonly whatsappButton: Locator;
    readonly downloadCVButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headingFirstFrame = page.getByRole('heading', { level: 1, name: /Shalev Atsis/i });
        this.statusBadge = page.getByText('Open to opportunities', { exact: true });
        this.whatsappButton = page.getByRole('link', { name: /Message on WhatsApp/i });
        this.downloadCVButton = page.getByRole('link', { name: /Download CV/i });
    }

    getSocialLinkInHero(name: 'github' | 'linkedin' | 'email'): Locator {
        const urls = {
            github: "https://github.com/ShalevAtsis",
            linkedin: "https://www.linkedin.com/in/shalev-atsis-software-developer/", // Exact Match from requirement
            email: "mailto:Shalevatsis@gmail.com"
        };
        // Using section#hero to scope these specific links
        return this.page.locator(`section#hero a[href^="${urls[name].split('?')[0]}"]`);
    }
}
