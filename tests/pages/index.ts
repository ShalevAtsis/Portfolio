import { type Locator, type Page } from '@playwright/test';

export const URLS = {
    whatsapp: 'https://wa.me/+972585060699',
    github: 'https://github.com/ShalevAtsis',
    linkedin: 'https://www.linkedin.com/in/shalev-atsis-software-developer/',
    email: 'mailto:Shalevatsis@gmail.com',
    cv: '/Shalev_Atsis_CV.pdf',
} as const;

export class Navbar {
    readonly header: Locator;
    readonly nav: Locator;
    readonly menuButton: Locator;
    readonly overlay: Locator;
    readonly closeMenuButton: Locator;
    readonly themeToggle: Locator;
    readonly viewModeToggle: Locator;
    readonly brandLink: Locator;
    readonly miniPlayer: Locator;

    constructor(readonly page: Page) {
        this.header = page.locator('header');
        this.nav = page.getByRole('navigation', { name: 'Main navigation' });
        this.menuButton = page.getByRole('button', { name: /open navigation menu/i });
        this.overlay = page.locator('#nav-overlay');
        this.closeMenuButton = this.overlay.getByRole('button', { name: /close menu/i });
        // Two toggles exist in the DOM (inline + compact); only one is visible per breakpoint.
        this.themeToggle = page.getByRole('button', { name: /Switch to (light|dark) mode/i }).locator('visible=true');
        this.viewModeToggle = page.getByRole('switch', { name: /Switch to (Resume|Portfolio) view/i }).locator('visible=true');
        this.brandLink = this.header.getByRole('link', { name: 'Shalev Atsis' });
        this.miniPlayer = this.header.getByRole('button', { name: /Toggle music/i });
    }

    inlineLink(name: string): Locator {
        return this.nav.getByRole('link', { name, exact: true });
    }

    socialLink(name: keyof typeof URLS): Locator {
        return this.header.locator(`a[href="${URLS[name]}"]`).first();
    }
}

export class HeroSection {
    readonly section: Locator;
    readonly heading: Locator;
    readonly statusBadge: Locator;
    readonly whatsappButton: Locator;
    readonly downloadCVButton: Locator;
    readonly oceanCanvas: Locator;
    readonly oceanBackdrop: Locator;

    constructor(readonly page: Page) {
        this.section = page.locator('section#hero');
        this.heading = this.section.getByRole('heading', { level: 1, name: /Shalev Atsis/i });
        this.statusBadge = this.section.getByText('Open To Opportunities', { exact: true });
        this.whatsappButton = this.section.getByRole('link', { name: /Message on WhatsApp/i });
        this.downloadCVButton = this.section.getByRole('link', { name: /Download CV/i });
        this.oceanCanvas = this.section.locator('canvas[data-ocean-shader]');
        this.oceanBackdrop = this.section.locator('[data-ocean-backdrop]');
    }

    link(name: 'github' | 'linkedin' | 'email'): Locator {
        return this.section.locator(`a[href="${URLS[name]}"]`);
    }
}

export class AboutSection {
    readonly section: Locator;
    readonly heading: Locator;

    constructor(readonly page: Page) {
        this.section = page.locator('section#about');
        this.heading = this.section.getByRole('heading', { level: 2, name: /The TL;DR/i });
    }

    label(text: string): Locator {
        return this.section.getByText(text, { exact: true });
    }

    cardHeading(title: string): Locator {
        return this.section.getByRole('heading', { level: 3, name: title });
    }
}

export class ExperienceSection {
    readonly section: Locator;
    readonly heading: Locator;

    constructor(readonly page: Page) {
        this.section = page.locator('section#experience');
        this.heading = this.section.getByRole('heading', { level: 2, name: /Experience & Education/i });
    }

    jobTitle(title: string): Locator {
        return this.section.getByRole('heading', { level: 3, name: title, exact: true });
    }

    company(name: string): Locator {
        return this.section.getByText(name, { exact: true }).first();
    }
}

export class SkillsSection {
    readonly section: Locator;
    readonly heading: Locator;
    readonly filterInput: Locator;

    constructor(readonly page: Page) {
        this.section = page.locator('section#skills');
        this.heading = this.section.getByRole('heading', { level: 2, name: /Skills/i });
        this.filterInput = this.section.getByRole('textbox', { name: /Filter skills/i });
    }

    category(name: string): Locator {
        return this.section.getByText(name, { exact: true });
    }

    skill(name: string): Locator {
        return this.section.getByRole('listitem').filter({ hasText: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`) });
    }
}

export class ProjectsSection {
    readonly section: Locator;
    readonly heading: Locator;
    readonly cards: Locator;

    constructor(readonly page: Page) {
        this.section = page.locator('section#projects');
        this.heading = this.section.getByRole('heading', { level: 2, name: /Featured Projects/i });
        this.cards = this.section.locator('[data-project-card]');
    }

    card(projectName: string): Locator {
        return this.cards.filter({ has: this.page.getByRole('heading', { level: 3, name: projectName, exact: true }) });
    }

    sourceLink(projectName: string): Locator {
        return this.section.getByRole('link', { name: `View ${projectName} on GitHub` });
    }
}

export class PersonalWorldSection {
    readonly section: Locator;
    readonly globe: Locator;
    readonly cinemaButton: Locator;
    readonly libraryButton: Locator;
    readonly playButton: Locator;
    readonly pauseButton: Locator;
    readonly seekSlider: Locator;
    readonly suggestionInput: Locator;
    readonly suggestionSend: Locator;

    constructor(readonly page: Page) {
        this.section = page.locator('section#personal-world');
        // Present with or without WebGL support (headless CI may lack a GPU).
        this.globe = this.section.locator('[data-globe]');
        this.cinemaButton = this.section.getByRole('button', { name: 'Cinema' });
        this.libraryButton = this.section.getByRole('button', { name: 'Library' });
        this.playButton = this.section.getByRole('button', { name: 'Play', exact: true });
        this.pauseButton = this.section.getByRole('button', { name: 'Pause', exact: true });
        this.seekSlider = this.section.getByRole('slider', { name: 'Seek' });
        this.suggestionInput = this.section.getByRole('textbox', { name: 'Your suggestion' });
        this.suggestionSend = this.section.getByRole('button', { name: 'Send', exact: true });
    }
}

export class ContactSection {
    readonly section: Locator;
    readonly heading: Locator;
    readonly whatsappLink: Locator;
    readonly emailLink: Locator;
    readonly linkedinLink: Locator;
    readonly githubLink: Locator;
    readonly downloadCvLink: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly companyInput: Locator;
    readonly messageInput: Locator;
    readonly sendButton: Locator;

    constructor(readonly page: Page) {
        this.section = page.locator('section#contact');
        this.heading = this.section.getByRole('heading', { level: 2, name: /Let's build something/i });
        this.whatsappLink = this.section.getByRole('link', { name: 'WhatsApp', exact: true });
        this.emailLink = this.section.getByRole('link', { name: 'Email', exact: true });
        this.linkedinLink = this.section.getByRole('link', { name: 'LinkedIn', exact: true });
        this.githubLink = this.section.getByRole('link', { name: 'GitHub', exact: true });
        this.downloadCvLink = this.section.getByRole('link', { name: 'Download CV' });
        this.nameInput = this.section.getByRole('textbox', { name: 'Name' });
        this.emailInput = this.section.getByRole('textbox', { name: 'Email Address' });
        this.companyInput = this.section.getByRole('textbox', { name: /Company \/ LinkedIn Profile/i });
        this.messageInput = this.section.getByRole('textbox', { name: 'How can I help?' });
        this.sendButton = this.section.getByRole('button', { name: 'Send Message' });
    }

    async fill(opts: { name: string; email: string; company?: string; message: string }) {
        await this.nameInput.fill(opts.name);
        await this.emailInput.fill(opts.email);
        if (opts.company) await this.companyInput.fill(opts.company);
        await this.messageInput.fill(opts.message);
    }
}

/** The "model hallucination" easter egg and its agent console dialog. */
export class AgentConsole {
    readonly trigger: Locator;
    readonly dialog: Locator;
    readonly prompt: Locator;
    readonly transcript: Locator;
    readonly toast: Locator;

    constructor(readonly page: Page) {
        this.trigger = page.getByRole('button', { name: /Trigger debug mode/i });
        this.dialog = page.getByRole('dialog', { name: 'agent_recovery' });
        this.prompt = this.dialog.getByRole('textbox', { name: 'Prompt the agent' });
        this.transcript = this.dialog.getByRole('log');
        this.toast = page.getByRole('button', { name: /System restored/i });
    }

    async open() {
        await this.trigger.scrollIntoViewIfNeeded();
        await this.trigger.click();
        await this.dialog.waitFor();
    }

    async ask(text: string) {
        await this.prompt.fill(text);
        await this.prompt.press('Enter');
    }

    chip(name: string): Locator {
        return this.dialog.getByRole('button', { name, exact: true });
    }
}

export class ResumeView {
    readonly pdfObject: Locator;
    readonly downloadButton: Locator;
    readonly title: Locator;

    constructor(readonly page: Page) {
        this.pdfObject = page.getByLabel('Shalev Atsis resume PDF');
        this.downloadButton = page.getByRole('link', { name: /Download resume PDF/i });
        this.title = page.getByRole('heading', { level: 1, name: 'Interactive Resume' });
    }
}
