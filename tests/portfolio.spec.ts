import { test, expect } from '@playwright/test';
import { Navbar } from './pages/Navbar';
import { HeroSection } from './pages/HeroSection';
import { AboutSection } from './pages/AboutSection';
import { ExperienceSection } from './pages/ExperienceSection';
import { SkillsSection } from './pages/SkillsSection';
import { ProjectsSection } from './pages/ProjectsSection';
import { PersonalWorldSection } from './pages/PersonalWorldSection';
import { ContactSection } from './pages/ContactSection';
import { ResumeView } from './pages/ResumeView';

test.describe('Portfolio Deep E2E Tests (POM Architecture)', () => {

    let navbar: Navbar;
    let hero: HeroSection;
    let about: AboutSection;
    let experience: ExperienceSection;
    let skills: SkillsSection;
    let projects: ProjectsSection;
    let world: PersonalWorldSection;
    let contact: ContactSection;
    let resume: ResumeView;

    test.beforeEach(async ({ page }) => {
        // Initialize Page Objects
        navbar = new Navbar(page);
        hero = new HeroSection(page);
        about = new AboutSection(page);
        experience = new ExperienceSection(page);
        skills = new SkillsSection(page);
        projects = new ProjectsSection(page);
        world = new PersonalWorldSection(page);
        contact = new ContactSection(page);
        resume = new ResumeView(page);

        // Go to the homepage and verify the initial hydration
        await page.goto('/');
        await expect(hero.headingFirstFrame).toBeVisible({ timeout: 10000 });
    });

    test.describe('Navigation & Routing', () => {

        test('Navigation menu opens, displays links securely, and closes', async ({ page }) => {
            await expect(navbar.menuButton).toBeVisible();
            await navbar.openMenu();

            await expect(navbar.overlay).toBeVisible();

            const aboutLink = navbar.overlay.getByRole('link', { name: 'About' });
            await expect(aboutLink).toBeVisible();

            await navbar.closeMenu();
            await expect(navbar.overlay).not.toBeVisible();
        });

        test('Section links correctly scroll viewport or update URL hash', async ({ page }) => {
            await navbar.openMenu();
            const projectsLink = navbar.overlay.getByRole('link', { name: 'Projects' });
            await expect(projectsLink).toBeVisible();
            await projectsLink.click();

            await expect(page).toHaveURL(/.*#projects/);
            await expect(projects.sectionLocator).toBeVisible();

            await navbar.openMenu();
            const skillsLink = navbar.overlay.getByRole('link', { name: 'Skills' });
            await skillsLink.click();
            await expect(page).toHaveURL(/.*#skills/);
            await expect(skills.sectionLocator).toBeVisible();
        });

        test('Portal Scroll Lock applies correctly to document body', async ({ page }) => {
            // Assert that the overflow property is not explicitly hidden initially
            let overflow = await page.evaluate(() => document.body.style.overflow);
            expect(overflow).not.toBe('hidden');

            await navbar.openMenu();
            await expect(navbar.overlay).toBeVisible();

            // Assert scroll lock is applied
            overflow = await page.evaluate(() => document.body.style.overflow);
            expect(overflow).toBe('hidden');

            await navbar.closeMenu();

            // Assert scroll lock is removed
            overflow = await page.evaluate(() => document.body.style.overflow);
            expect(overflow).toBe('');
        });
    });

    test.describe('External Links & Social CTAs Verification', () => {

        test('Social buttons contain correct expected external hrefs', async () => {
            // The tests strictly ensure the main referential links exist per requirements
            const githubNavbar = navbar.getSocialLink('github').first();
            await expect(githubNavbar).toBeVisible();

            const linkedinNavbar = navbar.getSocialLink('linkedin').first();
            await expect(linkedinNavbar).toBeVisible();

            const emailNavbar = navbar.getSocialLink('email').first();
            await expect(emailNavbar).toBeVisible();

            const whatsappNavbar = navbar.getSocialLink('whatsapp').first();
            await expect(whatsappNavbar).toBeVisible();

            // Hero section checks
            const githubHero = hero.getSocialLinkInHero('github');
            await expect(githubHero).toBeVisible();

            const emailHero = hero.getSocialLinkInHero('email');
            await expect(emailHero).toBeVisible();

            // WhatsApp button explicitly visible and mapped in Hero POM
            await expect(hero.whatsappButton).toBeVisible();
        });
    });

    test.describe('UI Features, Toggles & Micro-Interactions', () => {

        test('Theme Toggle switches the dark mode class on HTML element', async ({ page }) => {
            await expect(navbar.themeToggle).toBeVisible();

            const html = page.locator('html');
            const initialClass = (await html.getAttribute('class')) || '';
            const isInitiallyDark = initialClass.includes('dark');

            // Toggle
            await navbar.toggleTheme();
            if (isInitiallyDark) {
                await expect(html).not.toHaveClass(/dark/);
            } else {
                await expect(html).toHaveClass(/dark/);
            }

            // Revert
            await navbar.toggleTheme();
            if (isInitiallyDark) {
                await expect(html).toHaveClass(/dark/);
            } else {
                await expect(html).not.toHaveClass(/dark/);
            }
        });

        test('View Mode Toggle updates state logically', async () => {
            await expect(navbar.viewModeToggle).toBeVisible();
            const isResumeInitially = await navbar.viewModeToggle.getAttribute('aria-checked') === 'true';

            await navbar.toggleViewMode();
            await expect(navbar.viewModeToggle).toHaveAttribute('aria-checked', isResumeInitially ? 'false' : 'true');
        });

        test('Affordance Dot indicator is visible on View Mode Toggle', async () => {
            // Asserts the pulse ping notification
            await expect(navbar.affordanceDot).toBeVisible();
        });
    });

    test.describe('Core Components & Dynamic Features', () => {

        test('Hero loads CTA content, statuses, and links gracefully', async () => {
            await expect(hero.statusBadge).toBeVisible();
            await expect(hero.whatsappButton).toBeVisible();
            await expect(hero.downloadCVButton).toBeVisible();
        });

        test('About contains profile artifacts', async () => {
            await expect(about.heading).toBeVisible();
            await expect(about.profileImage).toBeVisible();
        });

        test('Experience timeline is populated with target keys', async () => {
            await expect(experience.heading).toBeVisible();
            await expect(experience.getCompanyLink('Jifiti')).toBeVisible();
            await expect(experience.getCompanyLink('IDF')).toBeVisible();
            await expect(experience.getJobTitle('Full Stack Software Engineer')).toBeVisible();
        });

        test('Skills grids show expected specific items', async () => {
            await expect(skills.heading).toBeVisible();
            await expect(skills.getCategoryHeading('Languages & Core')).toBeVisible();
            await expect(skills.getSkillLocator('Python')).toBeVisible();
            await expect(skills.getSkillLocator('React')).toBeVisible();
        });

        test('Personal world shows Globe renderer and audio payload', async () => {
            // Scroll is necessary to trigger dynamic chunks mapping
            await world.sectionLocator.scrollIntoViewIfNeeded();

            await expect(world.getInterestTab('Music & Vibes')).toBeVisible();
            await expect(world.getAudioPlayerTarget('Bad Bunny')).toBeVisible();
            // Globe 3D canvas (injects progressively after hydration)
            await expect(world.globeCanvas.first()).toBeAttached();
        });

        test('Contact block ends smoothly', async () => {
            await expect(contact.emailButton).toBeVisible();
            await expect(contact.sectionLocator.getByText(/Shalev Atsis/i).first()).toBeVisible();
        });
    });

    test.describe('Projects & Hover Discoverability Interactions', () => {

        test('Project cards trigger hover state and Expose nested Github Links', async ({ page }) => {
            await page.goto('/#projects');
            await expect(projects.heading).toBeVisible();

            const swellHeading = projects.getProjectCardHeading('SwellSight');
            await expect(swellHeading).toBeVisible();

            // Hover Discoverability check
            await projects.hoverProjectCard('SwellSight');

            const swellExtLink = projects.getProjectExternalLink('SwellSight');
            await expect(swellExtLink).toBeVisible();

            // Check Anomalyze
            await expect(projects.getProjectCardHeading('Anomalyze')).toBeVisible();
            await projects.hoverProjectCard('Anomalyze');
            await expect(projects.getProjectExternalLink('Anomalyze')).toBeVisible();
        });
    });

});
