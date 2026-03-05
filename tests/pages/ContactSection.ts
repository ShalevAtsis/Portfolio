import { type Page, type Locator } from '@playwright/test';

export class ContactSection {
    readonly page: Page;
    readonly sectionLocator: Locator;
    readonly whatsappLink: Locator;
    readonly emailButton: Locator;
    readonly linkedinLink: Locator;
    readonly githubLink: Locator;
    readonly downloadCvLink: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly companyInput: Locator;
    readonly messageInput: Locator;
    readonly sendButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sectionLocator = page.locator('section#contact');
        this.whatsappLink = this.sectionLocator.getByRole('link', { name: 'WhatsApp', exact: true });
        this.emailButton = this.sectionLocator.getByRole('link', { name: 'Email', exact: true });
        this.linkedinLink = this.sectionLocator.getByRole('link', { name: 'LinkedIn', exact: true });
        this.githubLink = this.sectionLocator.getByRole('link', { name: 'GitHub', exact: true });
        this.downloadCvLink = this.sectionLocator.getByRole('link', { name: 'Download CV' });
        this.nameInput = this.sectionLocator.getByRole('textbox', { name: 'Name' });
        this.emailInput = this.sectionLocator.getByRole('textbox', { name: 'Email Address' });
        this.companyInput = this.sectionLocator.getByRole('textbox', { name: /Company \/ LinkedIn Profile/i });
        this.messageInput = this.sectionLocator.getByRole('textbox', { name: 'How can I help?' });
        this.sendButton = this.sectionLocator.getByRole('button', { name: 'Send Message' });
    }

    async fillContactForm(opts: { name: string; email: string; company?: string; message: string }) {
        await this.nameInput.fill(opts.name);
        await this.emailInput.fill(opts.email);
        if (opts.company) await this.companyInput.fill(opts.company);
        await this.messageInput.fill(opts.message);
    }

    async submitForm() {
        await this.sendButton.click();
    }
}
