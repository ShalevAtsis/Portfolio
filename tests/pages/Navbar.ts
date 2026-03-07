import { type Page, type Locator } from '@playwright/test';

export class Navbar {
    readonly page: Page;
    readonly menuButton: Locator;
    readonly closeMenuButton: Locator;
    readonly overlay: Locator;
    readonly themeToggle: Locator;
    readonly viewModeToggle: Locator;
    readonly affordanceDot: Locator;
    readonly brandLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuButton = page.getByRole('button', { name: /open navigation menu/i });
        this.overlay = page.locator('#nav-overlay');
        this.closeMenuButton = this.overlay.getByRole('button', { name: /close menu/i });
        this.themeToggle = page.getByRole('button', { name: /Switch to (light|dark) mode/i });
        this.viewModeToggle = page.getByRole('switch', { name: /Switch to (Resume|Portfolio) view/i });
        // The affordance dot is nested inside the viewModeToggle
        this.affordanceDot = this.viewModeToggle.locator('.animate-ping');
        this.brandLink = page.getByRole('link', { name: 'Shalev Atsis' });
    }

    async openMenu() {
        await this.menuButton.click();
    }

    async closeMenu() {
        await this.closeMenuButton.click();
    }

    async toggleTheme() {
        await this.themeToggle.click();
    }

    async toggleViewMode() {
        await this.viewModeToggle.click();
    }

    getSocialLink(name: 'github' | 'linkedin' | 'email' | 'whatsapp'): Locator {
        const urls = {
            github: "https://github.com/ShalevAtsis",
            linkedin: "https://www.linkedin.com/in/shalev-atsis-software-developer/",
            email: "mailto:Shalevatsis@gmail.com",
            whatsapp: "https://wa.me/+972585060699"
        };
        // Expecting two of each (Navbar & Hero), returning the one in the Navbar specifically if possible, 
        // or just returning the collection to be asserted.
        // We'll scope to the header component
        return this.page.locator(`header a[href="${urls[name]}"]`);
    }
}
