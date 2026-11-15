import { test, expect, openHome, showSection, hasCompactNav, isVisualProject, visualOptions } from './fixtures';
import {
    URLS,
    Navbar,
    HeroSection,
    AboutSection,
    ExperienceSection,
    SkillsSection,
    ProjectsSection,
    PersonalWorldSection,
    ContactSection,
    AgentConsole,
    ResumeView,
} from './pages';

// ─────────────────────────────────────────────────────────────────────────────
//  Shared test data. Keep in sync with lib/content.ts and lib/nav.ts.
// ─────────────────────────────────────────────────────────────────────────────
const SECTIONS = [
    { name: 'About', hash: '#about' },
    { name: 'Experience', hash: '#experience' },
    { name: 'Skills', hash: '#skills' },
    { name: 'Projects', hash: '#projects' },
    { name: 'Gallery', hash: '#gallery' },
    { name: 'Personal World', hash: '#personal-world' },
    { name: 'Contact', hash: '#contact' },
] as const;

const PROJECTS = ['SwellSight', 'Anomalyze', 'Multithreaded TCP Chat', 'E2E DevOps Pipeline', 'Titanic ML Flow', 'LeetCode Architecture'] as const;
const EXPERIENCE_JOBS = ['QA AI Automation Engineer', 'Automation Engineer', 'Tier 2 Software Support Engineer', 'B.Sc. Computer Science', 'Software QA Engineer', 'Command and Control System Operator'] as const;
const EXPERIENCE_COMPANIES = ['High Lander', 'Jifiti', 'Holon Institute of Technology (HIT)', 'Hartech Technologies', 'Israeli Navy'] as const;
const SKILL_CATEGORIES = ['Test Automation & QA', 'AI & Machine Learning', 'Programming', 'Cloud & DevOps', 'Concepts & Soft Skills'] as const;

test.describe('Portfolio — Full E2E Test Suite (POM)', () => {
    let navbar: Navbar;
    let hero: HeroSection;
    let about: AboutSection;
    let experience: ExperienceSection;
    let skills: SkillsSection;
    let projects: ProjectsSection;
    let world: PersonalWorldSection;
    let contact: ContactSection;
    let agent: AgentConsole;
    let resume: ResumeView;

    test.beforeEach(async ({ page }) => {
        navbar = new Navbar(page);
        hero = new HeroSection(page);
        about = new AboutSection(page);
        experience = new ExperienceSection(page);
        skills = new SkillsSection(page);
        projects = new ProjectsSection(page);
        world = new PersonalWorldSection(page);
        contact = new ContactSection(page);
        agent = new AgentConsole(page);
        resume = new ResumeView(page);

        await openHome(page);
        await expect(hero.heading).toBeVisible();
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  1. NAVBAR
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Navbar', () => {
        test('social links are filled in after hydration with the correct hrefs', async () => {
            await expect(navbar.socialLink('github')).toHaveAttribute('href', URLS.github);
            await expect(navbar.socialLink('linkedin')).toHaveAttribute('href', URLS.linkedin);
            await expect(navbar.socialLink('email')).toHaveAttribute('href', URLS.email);
            await expect(navbar.socialLink('whatsapp')).toHaveAttribute('href', URLS.whatsapp);
        });

        test('contact details are not present in the server-rendered HTML', async ({ request }) => {
            const html = await (await request.get('/')).text();
            expect(html).not.toContain('Shalevatsis@gmail.com');
            expect(html).not.toContain('972585060699');
        });

        test('desktop: inline section links navigate and update the URL hash', async ({ page }) => {
            test.skip(hasCompactNav(page), 'inline links exist on large screens only');
            for (const { name, hash } of SECTIONS) {
                await navbar.inlineLink(name).click();
                await expect(page).toHaveURL(new RegExp(`${hash}$`));
                await expect(page.locator(hash)).toBeInViewport();
            }
        });

        test('compact: burger opens a sheet with all numbered section links', async ({ page }) => {
            test.skip(!hasCompactNav(page), 'the burger menu exists on small screens only');
            await navbar.menuButton.click();
            await expect(navbar.overlay).toBeVisible();
            for (const { name } of SECTIONS) {
                await expect(navbar.overlay.getByRole('link', { name })).toBeVisible();
            }
            await expect(navbar.overlay.getByRole('list')).toContainText('01About02Experience03Skills04Projects05Gallery06Personal World07Contact');
        });

        test('compact: sheet locks scrolling, closes, and returns focus to the burger', async ({ page }) => {
            test.skip(!hasCompactNav(page), 'the burger menu exists on small screens only');
            expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');

            await navbar.menuButton.click();
            await expect(navbar.overlay).toBeVisible();
            expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');

            await navbar.closeMenuButton.click();
            await expect(navbar.overlay).toBeHidden();
            expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
            await expect(navbar.menuButton).toBeFocused();
        });

        test('compact: Escape closes the sheet', async ({ page }) => {
            test.skip(!hasCompactNav(page), 'the burger menu exists on small screens only');
            await navbar.menuButton.click();
            await expect(navbar.overlay).toBeVisible();
            await page.keyboard.press('Escape');
            await expect(navbar.overlay).toBeHidden();
        });

        test('compact: sheet links navigate and update the URL hash', async ({ page }) => {
            test.skip(!hasCompactNav(page), 'the burger menu exists on small screens only');
            // Seven open -> navigate -> close round trips: needs more than the default budget on slow CI WebKit.
            test.slow();
            for (const { name, hash } of SECTIONS) {
                await navbar.menuButton.click();
                await navbar.overlay.getByRole('link', { name }).click();
                await expect(page).toHaveURL(new RegExp(`${hash}$`));
                await expect(navbar.overlay).toBeHidden();
            }
        });

        test('theme toggle switches the dark class on <html>', async ({ page }) => {
            const html = page.locator('html');
            await expect(html).toHaveClass(/dark/); // dark is the default theme
            await navbar.themeToggle.click();
            await expect(html).not.toHaveClass(/dark/);
            await navbar.themeToggle.click();
            await expect(html).toHaveClass(/dark/);
        });

        test('view-mode toggle switches between Portfolio and Resume views', async () => {
            await expect(navbar.viewModeToggle).toHaveAttribute('aria-checked', 'false');
            await navbar.viewModeToggle.click();
            await expect(navbar.viewModeToggle).toHaveAttribute('aria-checked', 'true');
            await navbar.viewModeToggle.click();
            await expect(navbar.viewModeToggle).toHaveAttribute('aria-checked', 'false');
        });

        test('clicking the brand name scrolls back to the top', async ({ page }) => {
            await showSection(page, 'skills');
            await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
            await navbar.brandLink.click();
            await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 8000 }).toBeLessThan(50);
        });

        test('skip link is the first focusable element and targets the main content', async ({ page, browserName }) => {
            test.skip(browserName === 'webkit', 'WebKit does not Tab to links by default');
            await page.keyboard.press('Tab');
            const skip = page.getByRole('link', { name: 'Skip to content' });
            await expect(skip).toBeFocused();
            await expect(skip).toHaveAttribute('href', '#main-content');
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  2. HERO + OCEAN SHADER
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Hero Section', () => {
        test('renders status badge and heading', async () => {
            await expect(hero.statusBadge).toBeVisible();
            await expect(hero.heading).toBeVisible();
        });

        test('all CTA links have the correct hrefs', async () => {
            await expect(hero.whatsappButton).toHaveAttribute('href', URLS.whatsapp);
            await expect(hero.downloadCVButton).toHaveAttribute('href', URLS.cv);
            await expect(hero.link('email')).toHaveAttribute('href', URLS.email);
            await expect(hero.link('github')).toHaveAttribute('href', URLS.github);
            await expect(hero.link('linkedin')).toHaveAttribute('href', URLS.linkedin);
        });

        test('WhatsApp link opens in a new tab', async ({ page }) => {
            const popupPromise = page.waitForEvent('popup');
            await hero.whatsappButton.click();
            expect((await popupPromise).url()).toContain('wa.me');
        });

        test('Download CV triggers a file download', async ({ page }) => {
            const downloadPromise = page.waitForEvent('download');
            await hero.downloadCVButton.click();
            expect((await downloadPromise).suggestedFilename()).toContain('CV');
        });

        test('GitHub and LinkedIn links open in a new tab', async ({ page }) => {
            for (const name of ['github', 'linkedin'] as const) {
                const popupPromise = page.waitForEvent('popup');
                await hero.link(name).click();
                const popup = await popupPromise;
                expect(popup.url()).toContain(`${name}.com`);
                await popup.close();
            }
        });

        test('hero ARIA snapshot matches expected structure', async ({ page }) => {
            await expect(hero.whatsappButton).toHaveAttribute('href', URLS.whatsapp);
            await expect(page.locator('#hero')).toMatchAriaSnapshot(`
                - text: Open To Opportunities
                - heading "Shalev Atsis" [level=1]
                - paragraph: /Software Engineer.*AI Engineer/
                - paragraph: /AI-driven quality engineering for autonomous aviation at High Lander/
                - link "Message on WhatsApp":
                  - /url: https://wa.me/+972585060699
                - link "Download CV":
                  - /url: /Shalev_Atsis_CV.pdf
                - link "Send email":
                  - /url: mailto:Shalevatsis@gmail.com
                - link "GitHub Profile":
                  - /url: https://github.com/ShalevAtsis
                - link "LinkedIn Profile":
                  - /url: https://www.linkedin.com/in/shalev-atsis-software-developer/
            `);
        });

        test('ocean backdrop is decorative and its canvas mounts', async () => {
            await expect(hero.oceanBackdrop).toHaveAttribute('aria-hidden', 'true');
            await expect(hero.oceanCanvas).toBeAttached();
            await expect(hero.oceanCanvas).toHaveAttribute('aria-hidden', 'true');
            // Either WebGL2 is available and a frame was drawn, or the CSS fallback stays visible.
            await expect(hero.oceanCanvas).toHaveAttribute('data-state', /^(webgl|fallback)$/, { timeout: 15_000 });
        });

        test('ocean shader animates while the hero is on screen and pauses off screen', async ({ page, browserName }) => {
            // WebKit on Linux rasterises WebGL on the CPU: forcing the shader there only measures the CI machine.
            test.skip(browserName === 'webkit' && process.platform === 'linux', 'software-rendered WebGL is too slow to time');
            // Headless browsers use a software renderer, which the site treats as "no WebGL";
            // ?ocean=webgl forces the real shader so its loop can be verified.
            await page.goto('/?ocean=webgl');
            await expect(hero.oceanCanvas).toHaveAttribute('data-state', /^(webgl|fallback)$/, { timeout: 15_000 });
            test.skip((await hero.oceanCanvas.getAttribute('data-state')) !== 'webgl', 'WebGL2 is not available in this browser');
            await expect(hero.oceanCanvas).toHaveAttribute('data-running', 'true');
            await showSection(page, 'skills');
            await expect(hero.oceanCanvas).toHaveAttribute('data-running', 'false');
        });

        test('hero content recedes (scale + fade) as the page scrolls', async ({ page }) => {
            const content = hero.heading.locator('xpath=ancestor::div[1]');
            await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.6));
            await expect.poll(async () => Number(await content.evaluate((el) => getComputedStyle(el).opacity))).toBeLessThan(0.6);
        });
    });

    test.describe('Reduced motion', () => {
        test.use({ contextOptions: { reducedMotion: 'reduce' } });

        test('ocean renders a still frame without an animation loop', async ({ page }) => {
            await page.goto('/?ocean=webgl');
            await expect(hero.oceanCanvas).toHaveAttribute('data-state', /^(webgl|fallback)$/, { timeout: 15_000 });
            await expect(hero.oceanCanvas).toHaveAttribute('data-running', 'false');
            await page.waitForTimeout(500);
            await expect(hero.oceanCanvas).toHaveAttribute('data-running', 'false');
        });

        test('hero does not transform on scroll and the About statement is a plain paragraph', async ({ page }) => {
            const content = hero.heading.locator('xpath=ancestor::div[1]');
            await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.6));
            await page.waitForTimeout(300);
            expect(Number(await content.evaluate((el) => getComputedStyle(el).opacity))).toBe(1);

            await showSection(page, 'about');
            const statement = about.section.getByText(/I build software you can trust/);
            await expect(statement).toBeVisible();
            expect(Number(await statement.evaluate((el) => getComputedStyle(el).opacity))).toBe(1);
        });

        test('agent console shows its text instantly and still fixes the site', async () => {
            await agent.open();
            await expect(agent.transcript).toContainText('Tell me what to do in plain language');
            await agent.ask('fix the site');
            await expect(agent.toast).toBeVisible();
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  3. ABOUT
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('About Section', () => {
        test.beforeEach(async ({ page }) => {
            await showSection(page, 'about');
        });

        test('renders the heading, the statement, and all three story cards', async () => {
            await expect(about.heading).toBeVisible();
            await expect(about.section).toContainText('I build software you can trust in places where failure is not an option');
            for (const label of ['The Engineer', 'The Passion', 'The Journey']) {
                await expect(about.label(label)).toBeVisible();
            }
            for (const title of ['Engineering trust in AI', 'At the AI frontier', 'An unconventional path']) {
                await expect(about.cardHeading(title)).toBeVisible();
            }
        });

        test('statement words light up with scroll', async () => {
            const lastWord = about.section.locator('p span', { hasText: /^fly\.\s*$/ });
            await about.section.getByText('I build software', { exact: false }).first().scrollIntoViewIfNeeded();
            await expect.poll(async () => Number(await lastWord.evaluate((el) => getComputedStyle(el).opacity))).toBeLessThan(0.5);
            await about.cardHeading('Engineering trust in AI').scrollIntoViewIfNeeded();
            await expect.poll(async () => Number(await lastWord.evaluate((el) => getComputedStyle(el).opacity))).toBeGreaterThan(0.9);
        });

        test('content reflects the current facts', async () => {
            await expect(about.section).toContainText('High Lander');
            await expect(about.section).toContainText('Honor Graduate, GPA 94');
            await expect(about.section).toContainText('14-person platoon');
            await expect(about.section).not.toContainText('on track to graduate');
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  4. EXPERIENCE
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Experience Section', () => {
        test.beforeEach(async ({ page }) => {
            await showSection(page, 'experience');
        });

        test('section heading is visible', async () => {
            await expect(experience.heading).toBeVisible();
        });

        test('all job titles and organisations are present', async () => {
            for (const title of EXPERIENCE_JOBS) await expect(experience.jobTitle(title)).toBeVisible();
            for (const company of EXPERIENCE_COMPANIES) await expect(experience.company(company)).toBeVisible();
        });

        test('entries contain the expected facts', async () => {
            await expect(experience.section).toContainText('AI-driven quality engineering for autonomous aviation');
            await expect(experience.section).toContainText('Cut manual regression time by 30%');
            await expect(experience.section).toContainText('Investigated production incidents');
            await expect(experience.section).toContainText('Honor Graduate · GPA 94');
            await expect(experience.section).toContainText('14-person specialist platoon');
            await expect(experience.section).toContainText('Sep 2026 – Present');
        });

        test('stat counters settle on their real values', async () => {
            const stats = experience.section.locator('dl');
            await stats.scrollIntoViewIfNeeded();
            for (const value of ['50+', '70', '14', '94']) {
                await expect(stats.locator('dd', { hasText: new RegExp(`^${value.replace('+', '\\+')}$`) })).toBeVisible({ timeout: 8000 });
            }
        });

        test('experience ARIA snapshot matches the timeline order', async () => {
            await expect(experience.section).toMatchAriaSnapshot(`
                - heading "Experience & Education" [level=2]
                - list:
                  - listitem:
                    - article:
                      - heading "QA AI Automation Engineer" [level=3]
                      - paragraph: High Lander
                  - listitem:
                    - article:
                      - heading "Automation Engineer" [level=3]
                      - paragraph: Jifiti
                  - listitem:
                    - article:
                      - heading "Tier 2 Software Support Engineer" [level=3]
                      - paragraph: Jifiti
                  - listitem:
                    - article:
                      - heading "B.Sc. Computer Science" [level=3]
                      - paragraph: Holon Institute of Technology (HIT)
                  - listitem:
                    - article:
                      - heading "Software QA Engineer" [level=3]
                      - paragraph: Hartech Technologies
                  - listitem:
                    - article:
                      - heading "Command and Control System Operator" [level=3]
                      - paragraph: Israeli Navy
            `);
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  5. SKILLS
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Skills Section', () => {
        test.beforeEach(async ({ page }) => {
            await showSection(page, 'skills');
        });

        test('all five skill categories are visible', async () => {
            for (const category of SKILL_CATEGORIES) await expect(skills.category(category)).toBeVisible();
        });

        test('key skills are listed, with test automation up front', async () => {
            for (const skill of ['Playwright', 'TypeScript', 'Python', 'PyTorch', 'OpenCV', 'Docker', 'AWS']) {
                await expect(skills.skill(skill)).toHaveCount(1);
            }
            await expect(skills.section.getByRole('link', { name: /See the tests/ })).toHaveAttribute('href', /ShalevAtsis\/Portfolio\/tree\/main\/tests/);
        });

        test('filter narrows skills by query "Py"', async () => {
            await skills.filterInput.fill('Py');
            await expect(skills.skill('Python')).toHaveCount(1);
            await expect(skills.skill('PyTorch')).toHaveCount(1);
            await expect(skills.skill('NumPy')).toHaveCount(1);
            await expect(skills.skill('Docker')).toHaveCount(0);
        });

        test('filter shows an empty state and can be cleared', async () => {
            await skills.filterInput.fill('zzzz');
            await expect(skills.section).toContainText('No skills match');
            await skills.section.getByRole('button', { name: 'Clear search' }).click();
            await expect(skills.filterInput).toHaveValue('');
            await expect(skills.skill('Docker')).toHaveCount(1);
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  6. PROJECTS
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Projects Section', () => {
        test.beforeEach(async ({ page }) => {
            await showSection(page, 'projects');
        });

        test('section heading is visible', async () => {
            await expect(projects.heading).toBeVisible();
        });

        test('all six projects render exactly once, each with a GitHub link', async () => {
            await expect(projects.cards).toHaveCount(PROJECTS.length);
            for (const name of PROJECTS) {
                await expect(projects.card(name)).toHaveCount(1);
                await expect(projects.sourceLink(name)).toHaveAttribute('href', /^https:\/\/github\.com\/ShalevAtsis\//);
                await expect(projects.sourceLink(name)).toHaveAttribute('target', '_blank');
            }
        });

        test('SwellSight showcase shows its description and metrics', async () => {
            const card = projects.card('SwellSight');
            await expect(card).toContainText('AI-powered system that analyzes beach cam footage');
            await expect(card).toContainText('direction accuracy');
            await card.locator('dl').scrollIntoViewIfNeeded();
            await expect(card.locator('dd', { hasText: /^92%$/ })).toBeVisible({ timeout: 8000 });
            for (const step of ['Depth extraction', 'Synthetic data', 'Real-time analysis']) {
                await expect(card).toContainText(step);
            }
        });

        test('SwellSight GitHub link opens in a new tab', async ({ page }) => {
            const popupPromise = page.waitForEvent('popup');
            await projects.sourceLink('SwellSight').click();
            expect((await popupPromise).url()).toContain('ShalevAtsis/SwellSight');
        });

        test('desktop: vertical scroll drives the pinned horizontal gallery', async ({ page }) => {
            test.skip(hasCompactNav(page), 'the pinned gallery exists on large screens only');
            const track = projects.section.locator('ul:has([data-gallery-item])');
            await expect(track).toBeAttached();
            const xOf = () => track.evaluate((el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m41);

            await track.evaluate((el) => {
                const outer = el.parentElement!.parentElement!;
                window.scrollTo(0, outer.getBoundingClientRect().top + window.scrollY);
            });
            await expect.poll(xOf).toBeGreaterThan(-5);

            await track.evaluate((el) => {
                const outer = el.parentElement!.parentElement!;
                window.scrollTo(0, outer.getBoundingClientRect().bottom + window.scrollY - window.innerHeight);
            });
            await expect.poll(xOf).toBeLessThan(-200);
            await expect(projects.card('LeetCode Architecture')).toBeInViewport();
        });

        test('compact: projects stack vertically', async ({ page }) => {
            test.skip(!hasCompactNav(page), 'small screens only');
            await expect(projects.section.locator('[data-gallery-item]')).toHaveCount(0);
            await projects.card('Anomalyze').scrollIntoViewIfNeeded();
            await expect(projects.card('Anomalyze')).toBeInViewport();
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  7. GALLERY
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Gallery Section', () => {
        test('shows seven captioned field photos with alt text', async ({ page }) => {
            await showSection(page, 'gallery');
            const figures = page.locator('#gallery figure');
            await expect(figures).toHaveCount(7);
            await expect(page.locator('#gallery img[alt=""]')).toHaveCount(0);
            await expect(page.locator('#gallery')).toContainText('Autonomous UAV Field Test');
            await expect(page.locator('#gallery')).toContainText('Official System Handover');
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  8. PERSONAL WORLD
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Personal World Section', () => {
        test.beforeEach(async ({ page }) => {
            await showSection(page, 'personal-world');
        });

        test('globe card mounts with surf and dive spot controls', async () => {
            await expect(world.globe).toBeAttached();
            const filter = world.section.getByRole('group', { name: 'Filter spots' });
            await expect(world.section.getByRole('group', { name: 'Surf spots' }).getByRole('button')).toHaveCount(6);
            await filter.getByRole('button', { name: /Dive/ }).click();
            await expect(world.section.getByRole('group', { name: 'Dive spots' }).getByRole('button')).toHaveCount(7);
            await filter.getByRole('button', { name: /Travel/ }).click();
            await expect(world.section.getByRole('group', { name: 'Travel spots' }).getByRole('button')).toHaveCount(25);
        });

        test('stats row is derived from the spot list', async () => {
            const stats = world.section.locator('[data-world-stats]');
            await expect(stats).toContainText('countries on the map');
            await expect(stats.locator('dd')).toHaveText(['29', '6', '7', '30+']);
        });

        test('choosing a spot fills the logbook panel, with or without WebGL', async () => {
            const panel = world.section.locator('[data-spot-panel]');
            await expect(panel).toContainText('Pick a spot on the map.');
            const filter = world.section.getByRole('group', { name: 'Filter spots' });
            await filter.getByRole('button', { name: /Dive/ }).click();
            const galapagos = world.section.getByRole('button', { name: 'Galapagos' });
            await galapagos.click();
            await expect(galapagos).toHaveAttribute('aria-pressed', 'true');
            await expect(panel).toContainText('Dive site');
            await expect(panel).toContainText('Ecuador');
            await expect(panel).toContainText('Pacific Ocean');
            await expect(panel).toContainText('0.38° S, 90.30° W');
            await filter.getByRole('button', { name: /Surf/ }).click();
            await world.section.getByRole('button', { name: 'Brazil' }).click();
            await expect(panel).toContainText('Surf trip');
            await expect(panel).toContainText('Atlantic Ocean');
            await filter.getByRole('button', { name: /Travel/ }).click();
            await world.section.getByRole('button', { name: 'Budapest' }).click();
            await expect(panel).toContainText('Hungary');
            await expect(panel).not.toContainText('Water');
        });

        test('focusing a film or a book shows its cover', async ({ page }) => {
            const preview = page.locator('[data-cover-preview] img');
            await world.section.getByText('Inception', { exact: true }).locator('xpath=ancestor::li').focus();
            await expect(preview).toHaveAttribute('src', /\/covers\/inception\.jpg$/);
            await world.libraryButton.click();
            await world.section.getByText("Can't Hurt Me", { exact: true }).locator('xpath=ancestor-or-self::li').focus();
            await expect(preview).toHaveAttribute('src', /\/covers\/cant-hurt-me\.jpg$/);
            // A book without a cover is simply not focusable and shows nothing.
            await expect(world.section.getByText('Badulina', { exact: true })).not.toHaveAttribute('tabindex', '0');
        });

        test('Cinema and Library tabs switch content', async () => {
            await expect(world.cinemaButton).toHaveAttribute('aria-pressed', 'true');
            await expect(world.section).toContainText('Shutter Island');
            await world.libraryButton.click();
            await expect(world.libraryButton).toHaveAttribute('aria-pressed', 'true');
            await expect(world.section).toContainText('Currently Reading');
            await expect(world.section).toContainText('The Lean Startup');
            await expect(world.section).toContainText("Can't Hurt Me");
        });

        test('Now Playing shows the Bad Bunny track and never autoplays', async ({ page }) => {
            await expect(world.section.getByText('Now Playing')).toBeVisible();
            await expect(world.section.getByText('Baile Inolvidable')).toBeVisible();
            await expect(world.section.getByText('Bad Bunny', { exact: true })).toBeVisible();
            await expect(world.playButton).toBeVisible();
            await expect(world.seekSlider).toBeVisible();
            // No audio element is created (and nothing is downloaded) before the first click.
            await expect(navbar.miniPlayer).toHaveCount(0);
            expect(await page.evaluate(() => performance.getEntriesByType('resource').some((r) => r.name.endsWith('.mp3')))).toBe(false);
        });

        test('Play/Pause works and reveals the navbar mini-player', async ({ browserName }) => {
            test.skip(browserName === 'webkit', 'MP3 playback is not available in headless WebKit on Linux');
            await world.playButton.click();
            await expect(world.pauseButton).toBeVisible();
            await expect(navbar.miniPlayer).toBeVisible();
            await expect(navbar.miniPlayer).toHaveAttribute('aria-pressed', 'true');
            await world.pauseButton.click();
            await expect(world.playButton).toBeVisible();
            await expect(navbar.miniPlayer).toHaveAttribute('aria-pressed', 'false');
        });

        test('AI species classifier card is visible', async () => {
            await expect(world.section.getByText('[AI TARGET ACQUIRED]')).toBeVisible();
            await expect(world.section.getByText('Species: Hammerhead Shark')).toBeVisible();
            await expect(world.section.getByText(/AI Species Classifier/)).toBeVisible();
            await expect(world.section.getByRole('link', { name: 'See SwellSight' })).toHaveAttribute('href', '#projects');
        });

        test('suggestion box is honest about being human-powered and accepts a suggestion', async ({ page }) => {
            await expect(world.section.getByText('AI Suggestion Engine')).toBeVisible();
            await expect(world.section).toContainText('no model involved');
            await world.suggestionInput.fill('The Wolf of Wall Street');
            await world.suggestionSend.click();
            await expect(page.getByText('Added to my backlog')).toBeVisible();
            await page.getByRole('button', { name: 'Suggest something else' }).click();
            await expect(world.suggestionInput).toBeVisible();
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  9. CONTACT
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Contact Section', () => {
        test.beforeEach(async ({ page }) => {
            await showSection(page, 'contact');
        });

        test('closing headline and all five channels are visible with correct hrefs', async () => {
            await expect(contact.heading).toBeVisible();
            await expect(contact.whatsappLink).toHaveAttribute('href', URLS.whatsapp);
            await expect(contact.emailLink).toHaveAttribute('href', URLS.email);
            await expect(contact.linkedinLink).toHaveAttribute('href', URLS.linkedin);
            await expect(contact.githubLink).toHaveAttribute('href', URLS.github);
            await expect(contact.downloadCvLink).toHaveAttribute('href', URLS.cv);
            await expect(contact.section.getByRole('link', { name: 'Start a conversation' })).toHaveAttribute('href', URLS.whatsapp);
        });

        test('external channels open in a new tab', async ({ page }) => {
            for (const [link, host] of [[contact.whatsappLink, 'wa.me'], [contact.linkedinLink, 'linkedin.com'], [contact.githubLink, 'github.com']] as const) {
                const popupPromise = page.waitForEvent('popup');
                await link.click();
                const popup = await popupPromise;
                expect(popup.url()).toContain(host);
                await popup.close();
            }
        });

        test('form fields are labelled and have placeholders', async () => {
            await expect(contact.nameInput).toHaveAttribute('placeholder', /John Doe/);
            await expect(contact.emailInput).toHaveAttribute('placeholder', /john@example.com/);
            await expect(contact.companyInput).toBeVisible();
            await expect(contact.messageInput).toHaveAttribute('placeholder', /Tell me about your project/);
            await expect(contact.sendButton).toBeVisible();
        });

        test('empty submit shows accessible validation errors and sends nothing', async ({ page }) => {
            let sent = false;
            page.on('request', (r) => { if (r.url().includes('web3forms')) sent = true; });
            await contact.sendButton.click();
            await expect(contact.section.getByRole('alert').filter({ hasText: 'Name is required' })).toBeVisible();
            await expect(contact.section.getByRole('alert').filter({ hasText: 'Email is required' })).toBeVisible();
            await expect(contact.section.getByRole('alert').filter({ hasText: 'Message is required' })).toBeVisible();
            await expect(contact.nameInput).toHaveAttribute('aria-invalid', 'true');
            expect(sent).toBe(false);
        });

        test('form fills, submits (mocked), and shows the success message', async ({ page }) => {
            await contact.fill({ name: 'Ada Lovelace', email: 'test@example.com', company: 'Analytical Engines', message: 'I love your portfolio!' });
            await expect(contact.nameInput).toHaveValue('Ada Lovelace');
            const requestPromise = page.waitForRequest(/api\.web3forms\.com\/submit/);
            await contact.sendButton.click();
            const body = (await requestPromise).postDataJSON();
            expect(body).toMatchObject({ name: 'Ada Lovelace', email: 'test@example.com', message: 'I love your portfolio!', botcheck: '' });
            await expect(contact.section.getByText('Message sent successfully!')).toBeVisible();
        });

        test('a failed submission tells the visitor instead of failing silently', async ({ page, context }) => {
            await context.route(/api\.web3forms\.com/, (route) => route.fulfill({ status: 500, body: '{}' }));
            await contact.fill({ name: 'Ada', email: 'ada@example.com', message: 'Hello' });
            await contact.sendButton.click();
            await expect(contact.section.getByRole('alert').filter({ hasText: 'the message was not sent' })).toBeVisible();
            await expect(page.getByText('Message sent successfully!')).toHaveCount(0);
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  10. FOOTER & EASTER EGG: "MODEL HALLUCINATION" + AGENT CONSOLE
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Footer & Agent Console easter egg', () => {
        test('footer copyright text is visible', async ({ page }) => {
            await expect(page.getByRole('contentinfo')).toContainText(`Shalev Atsis · Software Engineer · ${new Date().getFullYear()}`);
        });

        test('trigger makes the page hallucinate without touching the real content', async ({ page }) => {
            await agent.open();
            await expect(page.locator('.debug-chaos-wrapper')).toHaveAttribute('data-broken', 'true');
            // Real heading text stays in the DOM and the accessibility tree.
            await expect(hero.heading).toHaveText(/Shalev Atsis/);
            // The scrambled layer is decorative.
            const glitch = page.locator('#hero h1 .hallucination');
            await expect(glitch).toHaveAttribute('aria-hidden', 'true');
            await expect(glitch).toHaveText('Shalev Atlas', { timeout: 8000 });
            await expect(page.getByText('temperature: 1.9').first()).toBeVisible();
            await expect(page.getByRole('status').filter({ hasText: 'pretending its AI model is hallucinating' })).toBeAttached();
        });

        test('console streams a model-style trace and focuses the prompt', async () => {
            await agent.open();
            await expect(agent.prompt).toBeFocused();
            await expect(agent.transcript).toContainText('thinking…');
            await expect(agent.transcript).toContainText('tool: read_file(layout.tsx)', { timeout: 10_000 });
            await expect(agent.transcript).toContainText('confidence: 0.42', { timeout: 10_000 });
        });

        test('"help" answers with hints in the agent\'s voice', async () => {
            await agent.open();
            await agent.ask('help');
            await expect(agent.transcript).toContainText('ask me to fix, restore, or undo the hallucination');
            await expect(agent.transcript).toContainText('sudo fix-site --force still works');
        });

        test('an unrelated prompt gets a self-aware refusal, not a fix', async ({ page }) => {
            await agent.open();
            await agent.ask('write me a poem');
            await expect(agent.transcript).toContainText('As a large language model I cannot render this footer');
            await expect(page.locator('.debug-chaos-wrapper')).toHaveAttribute('data-broken', 'true');
        });

        for (const prompt of ['please undo the hallucination', 'Can you REPAIR this?', 'rollback', 'sudo fix-site --force']) {
            test(`natural-language prompt "${prompt}" restores the site`, async ({ page }) => {
                await agent.open();
                await agent.ask(prompt);
                await expect(agent.transcript).toContainText('temperature: 0.2', { timeout: 10_000 });
                await expect(agent.toast).toBeVisible({ timeout: 15_000 });
                await expect(agent.toast).toContainText("The model has been reminded who's boss.");
                await expect(agent.dialog).toBeHidden();
                await expect(page.locator('.debug-chaos-wrapper')).toHaveAttribute('data-broken', 'false');
                await expect(page.locator('.hallucination')).toHaveCount(0);
            });
        }

        test('suggested-prompt chip fixes the site (no typing needed on mobile)', async () => {
            await agent.open();
            await agent.chip('fix the site').click();
            await expect(agent.toast).toBeVisible({ timeout: 15_000 });
        });

        test('reasoning can be skipped', async () => {
            await agent.open();
            await agent.ask('fix it');
            // The button only exists while the trace streams and the panel resizes around it, so a
            // regular click (which waits for a stable position) can lose the race on slow machines.
            await agent.dialog.getByRole('button', { name: 'skip reasoning' }).dispatchEvent('click');
            await expect(agent.transcript).toContainText('headings: grounded in the DOM');
            await expect(agent.toast).toBeVisible({ timeout: 10_000 });
        });

        test('Escape closes the console and returns focus to the trigger', async ({ page }) => {
            await agent.open();
            await expect(agent.prompt).toBeFocused();
            await page.keyboard.press('Escape');
            await expect(agent.dialog).toBeHidden();
            await expect(agent.trigger).toBeFocused();
            // Still hallucinating: the visitor can reopen the console and fix it.
            await agent.trigger.click();
            await expect(agent.dialog).toBeVisible();
        });

        test('focus is trapped inside the console', async ({ page, browserName }) => {
            test.skip(browserName === 'webkit', 'WebKit does not Tab to buttons by default');
            await agent.open();
            await expect(agent.prompt).toBeFocused();
            for (let i = 0; i < 12; i++) {
                await page.keyboard.press('Tab');
                expect(await agent.dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
            }
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  11. RESUME VIEW
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Resume View', () => {
        test.beforeEach(async () => {
            await navbar.viewModeToggle.click();
            await expect(resume.title).toBeVisible();
        });

        test('Download PDF button triggers a file download', async ({ page }) => {
            const downloadPromise = page.waitForEvent('download');
            await resume.downloadButton.click();
            expect((await downloadPromise).suggestedFilename()).toContain('CV');
        });

        test('PDF object is embedded', async () => {
            await expect(resume.pdfObject).toBeVisible({ timeout: 15_000 });
            await expect(resume.pdfObject).toHaveAttribute('data', URLS.cv);
        });

        test('toggling back returns to the portfolio view', async () => {
            await navbar.viewModeToggle.click();
            await expect(hero.heading).toBeVisible();
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  12. PIXEL SNAPSHOTS (Desktop Chrome on Linux only)
    //  Taken under prefers-reduced-motion so every animation is in its final
    //  state; WebGL canvases are hidden (tests/visual.css) and counters masked.
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Pixel snapshots', () => {
        test.use({ contextOptions: { reducedMotion: 'reduce' } });

        test.beforeEach(async ({}, testInfo) => {
            test.skip(!isVisualProject(testInfo.project.name), 'pixel baselines exist for Desktop Chrome on Linux only');
        });

        test('[PIXEL] navbar', async ({ page }) => {
            await expect(navbar.socialLink('email')).toHaveAttribute('href', URLS.email);
            await expect(navbar.nav).toHaveScreenshot('navbar.png', visualOptions(page));
        });

        test('[PIXEL] hero section', async ({ page }) => {
            await expect(hero.oceanCanvas).toHaveAttribute('data-state', /^(webgl|fallback)$/, { timeout: 15_000 });
            await expect(page.locator('#hero')).toHaveScreenshot('hero-section.png', visualOptions(page));
        });

        for (const id of ['about', 'experience', 'skills', 'projects', 'personal-world', 'contact'] as const) {
            test(`[PIXEL] ${id} section`, async ({ page }) => {
                await showSection(page, id);
                // Let lazy widgets (globe / fallback) settle before comparing.
                if (id === 'personal-world') await expect(world.section.locator('[data-globe] > *').first()).toBeAttached();
                if (id === 'contact') await expect(contact.emailLink).toHaveAttribute('href', URLS.email);
                await expect(page.locator(`#${id}`)).toHaveScreenshot(`${id}-section.png`, visualOptions(page));
            });
        }

        test('[PIXEL] footer', async ({ page }) => {
            await expect(page.getByRole('contentinfo')).toHaveScreenshot('footer.png', visualOptions(page));
        });
    });
});
