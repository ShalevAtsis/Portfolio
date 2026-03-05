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

// ─────────────────────────────────────────────────────────────────────────────
//  Shared test data (single source of truth for URLs and copy)
// ─────────────────────────────────────────────────────────────────────────────
const URLS = {
    portfolio: 'https://shalevatsis.github.io/Portfolio/',
    whatsapp: 'https://wa.me/+972585060699',
    github: 'https://github.com/ShalevAtsis',
    linkedin: 'https://www.linkedin.com/in/shalev-atsis-software-developer/',
    email: 'mailto:Shalevatsis@gmail.com',
    cv: '/Portfolio/Shalev_Atsis_CV.pdf',
} as const;

const PROJECTS = ['SwellSight', 'Anomalyze', 'Multithreaded TCP Chat', 'E2E DevOps Pipeline', 'Titanic ML Flow', 'LeetCode Architecture'] as const;
const EXPERIENCE_JOBS = ['Tier 2 Software Support Engineer', 'B.Sc. Computer Science (In Progress)', 'Software QA Specialist', 'C2 System Operator & Team Lead'] as const;
const EXPERIENCE_COMPANIES = ['Jifiti', 'Holon Institute of Technology (HIT)', 'Hartech Technologies', 'Israeli Navy'] as const;

// ─────────────────────────────────────────────────────────────────────────────

test.describe('Portfolio — Full E2E Test Suite (POM)', () => {

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
        navbar = new Navbar(page);
        hero = new HeroSection(page);
        about = new AboutSection(page);
        experience = new ExperienceSection(page);
        skills = new SkillsSection(page);
        projects = new ProjectsSection(page);
        world = new PersonalWorldSection(page);
        contact = new ContactSection(page);
        resume = new ResumeView(page);

        await page.goto(URLS.portfolio);
        await expect(hero.headingFirstFrame).toBeVisible({ timeout: 10_000 });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  1. NAVBAR
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Navbar', () => {

        test('renders all social icon links with correct hrefs', async ({ page }) => {
            await expect(navbar.getSocialLink('github').first()).toHaveAttribute('href', URLS.github);
            await expect(navbar.getSocialLink('linkedin').first()).toHaveAttribute('href', URLS.linkedin);
            await expect(navbar.getSocialLink('email').first()).toHaveAttribute('href', URLS.email);
            await expect(navbar.getSocialLink('whatsapp').first()).toHaveAttribute('href', URLS.whatsapp);
        });

        test('hamburger menu opens and exposes all section links', async ({ page }) => {
            await expect(navbar.menuButton).toBeVisible();
            await navbar.openMenu();
            await expect(navbar.overlay).toBeVisible();

            // All six section links must be present with correct anchors
            const sections = ['About', 'Experience', 'Skills', 'Projects', 'Personal World', 'Contact'] as const;
            for (const section of sections) {
                await expect(navbar.overlay.getByRole('link', { name: section })).toBeVisible();
            }

            // Visual: numbered links should be visible (01About…06Contact pattern)
            await expect(page.getByText('01About02Experience03Skills04Projects05Personal World06Contact')).toBeVisible();
        });

        test('hamburger menu closes correctly and removes scroll lock', async ({ page }) => {
            await navbar.openMenu();
            await expect(navbar.overlay).toBeVisible();

            let overflow = await page.evaluate(() => document.body.style.overflow);
            expect(overflow).toBe('hidden');

            await navbar.closeMenu();
            await expect(navbar.overlay).not.toBeVisible();

            overflow = await page.evaluate(() => document.body.style.overflow);
            expect(overflow).toBe('');
        });

        test('scroll lock is applied on open and released on close', async ({ page }) => {
            let overflow = await page.evaluate(() => document.body.style.overflow);
            expect(overflow).not.toBe('hidden');

            await navbar.openMenu();
            overflow = await page.evaluate(() => document.body.style.overflow);
            expect(overflow).toBe('hidden');

            await navbar.closeMenu();
            overflow = await page.evaluate(() => document.body.style.overflow);
            expect(overflow).toBe('');
        });

        test('section links scroll viewport and update URL hash', async ({ page }) => {
            const sectionHashes = [
                { name: 'About', hash: '#about' },
                { name: 'Experience', hash: '#experience' },
                { name: 'Skills', hash: '#skills' },
                { name: 'Projects', hash: '#projects' },
                { name: 'Personal World', hash: '#personal-world' },
                { name: 'Contact', hash: '#contact' },
            ];

            for (const { name, hash } of sectionHashes) {
                await navbar.openMenu();
                await navbar.overlay.getByRole('link', { name }).click();
                await expect(page).toHaveURL(new RegExp(hash));
            }
        });

        test('theme toggle switches dark/light class on <html> element', async ({ page }) => {
            const html = page.locator('html');
            const initialClass = (await html.getAttribute('class')) ?? '';
            const isInitiallyDark = initialClass.includes('dark');

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

        test('view-mode toggle switches between Portfolio and Resume views', async ({ page }) => {
            await expect(navbar.viewModeToggle).toBeVisible();
            const isResume = await navbar.viewModeToggle.getAttribute('aria-checked') === 'true';

            await navbar.toggleViewMode();
            await expect(navbar.viewModeToggle).toHaveAttribute('aria-checked', isResume ? 'false' : 'true');

            // Revert
            await navbar.toggleViewMode();
            await expect(navbar.viewModeToggle).toHaveAttribute('aria-checked', isResume ? 'true' : 'false');
        });

        test('navbar ARIA snapshot matches expected structure', async ({ page }) => {
            await expect(page.getByLabel('Main navigation')).toMatchAriaSnapshot(`
                - navigation "Main navigation":
                  - button "Open navigation menu"
                  - link "Shalev Atsis":
                    - /url: /Portfolio/
                  - link "GitHub profile":
                    - /url: https://github.com/ShalevAtsis
                    - img
                  - link "LinkedIn profile":
                    - /url: https://www.linkedin.com/in/shalev-atsis-software-developer/
                    - img
                  - link "Send email":
                    - /url: mailto:Shalevatsis@gmail.com
                    - img
                  - link "Message on WhatsApp":
                    - /url: https://wa.me/+972585060699
                    - img
                  - button /Switch to (light|dark) mode/:
                    - img
                  - group "View mode toggle":
                    - switch /Switch to (Resume|Portfolio) view/
            `);
        });

        test('[PIXEL] navbar screenshot matches baseline', async ({ page }) => {
            await expect(page.getByRole('navigation', { name: 'Main navigation' })).toHaveScreenshot('navbar.png', {
                maxDiffPixelRatio: 0.02,
            });
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  2. HERO SECTION
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Hero Section', () => {

        test('renders status badge, heading, and subtitle', async () => {
            await expect(hero.statusBadge).toBeVisible();
            await expect(hero.headingFirstFrame).toBeVisible();
        });

        test('all CTA links are visible with correct hrefs', async () => {
            await expect(hero.whatsappButton).toHaveAttribute('href', URLS.whatsapp);
            await expect(hero.downloadCVButton).toHaveAttribute('href', URLS.cv);
            await expect(hero.getSocialLinkInHero('email')).toHaveAttribute('href', URLS.email);
            await expect(hero.getSocialLinkInHero('github')).toHaveAttribute('href', URLS.github);
            await expect(hero.getSocialLinkInHero('linkedin')).toHaveAttribute('href', URLS.linkedin);
        });

        test('WhatsApp link opens external page in new tab', async ({ page }) => {
            const popupPromise = page.waitForEvent('popup');
            await hero.whatsappButton.click();
            const popup = await popupPromise;
            await expect(popup).toBeDefined();
        });

        test('Download CV triggers a file download', async ({ page }) => {
            const downloadPromise = page.waitForEvent('download');
            await hero.downloadCVButton.click();
            const download = await downloadPromise;
            expect(download.suggestedFilename()).toContain('CV');
        });

        test('GitHub link opens external page in new tab', async ({ page }) => {
            const popupPromise = page.waitForEvent('popup');
            await hero.getSocialLinkInHero('github').click();
            const popup = await popupPromise;
            expect(popup.url()).toContain('github.com');
        });

        test('LinkedIn link opens external page in new tab', async ({ page }) => {
            const popupPromise = page.waitForEvent('popup');
            await hero.getSocialLinkInHero('linkedin').click();
            const popup = await popupPromise;
            expect(popup.url()).toContain('linkedin.com');
        });

        test('hero ARIA snapshot matches expected structure', async ({ page }) => {
            await expect(page.locator('#hero')).toMatchAriaSnapshot(`
                - text: Open to opportunities
                - heading "Shalev Atsis" [level=1]
                - paragraph: Software EngineerAI & Computer Vision
                - paragraph: /Currently powering production systems at Jifiti/
                - link "Message on WhatsApp":
                  - /url: https://wa.me/+972585060699
                  - img
                  - text: ""
                - link "Download CV":
                  - /url: /Portfolio/Shalev_Atsis_CV.pdf
                  - img
                  - text: ""
                - link "Send email to Shalevatsis@gmail.com":
                  - /url: mailto:Shalevatsis@gmail.com
                  - img
                  - text: ""
                - link "GitHub Profile":
                  - /url: https://github.com/ShalevAtsis
                  - img
                - link "LinkedIn Profile":
                  - /url: https://www.linkedin.com/in/shalev-atsis-software-developer/
                  - img
            `);
        });

        test('[PIXEL] hero section screenshot matches baseline', async ({ page }) => {
            await expect(page.locator('#hero')).toHaveScreenshot('hero-section.png', {
                maxDiffPixelRatio: 0.02,
            });
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  3. ABOUT SECTION
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('About Section', () => {

        test.beforeEach(async ({ page }) => {
            await page.goto(URLS.portfolio + '#about');
        });

        test('renders all three story cards', async () => {
            await expect(about.engineerCard).toBeVisible();
            await expect(about.passionCard).toBeVisible();
            await expect(about.journeyCard).toBeVisible();
        });

        test('each card has a correct sub-heading', async () => {
            await expect(about.getCardHeading('Building in parallel')).toBeVisible();
            await expect(about.getCardHeading('At the AI frontier')).toBeVisible();
            await expect(about.getCardHeading('An unconventional path')).toBeVisible();
        });

        test('about ARIA snapshot matches expected content', async ({ page }) => {
            await expect(page.locator('#about')).toMatchAriaSnapshot(`
                - paragraph: About Me
                - heading "The TL;DR" [level=2]
                - img
                - paragraph: The Engineer
                - heading "Building in parallel" [level=3]
                - paragraph: /I'm a Software Engineer in motion/
                - img
                - paragraph: The Passion
                - heading "At the AI frontier" [level=3]
                - paragraph: /My deep interest lies at the intersection of AI/
                - img
                - paragraph: The Journey
                - heading "An unconventional path" [level=3]
                - paragraph: /My path to software wasn't a straight line/
            `);
        });

        test('[PIXEL] about section screenshot matches baseline', async ({ page }) => {
            await expect(page.locator('#about')).toHaveScreenshot('about-section.png', {
                maxDiffPixelRatio: 0.02,
            });
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  4. EXPERIENCE SECTION
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Experience Section', () => {

        test.beforeEach(async ({ page }) => {
            await page.goto(URLS.portfolio + '/#experience');
        });

        test('section heading is visible', async () => {
            await expect(experience.heading).toBeVisible();
        });

        test('all four job titles are visible', async () => {
            for (const title of EXPERIENCE_JOBS) {
                await expect(experience.getJobTitle(title)).toBeVisible();
            }
        });

        test('all four company names are visible', async () => {
            for (const company of EXPERIENCE_COMPANIES) {
                await expect(experience.getCompanyName(company)).toBeVisible();
            }
        });

        test('Jifiti entry contains expected bullet points', async ({ page }) => {
            await expect(page.locator('#experience')).toContainText('Investigate production incidents');
            await expect(page.locator('#experience')).toContainText('Built Python analytics pipelines');
            await expect(page.locator('#experience')).toContainText('Collaborate embedded in an R&D Agile squad');
        });

        test('experience ARIA snapshot matches full section', async ({ page }) => {
            await expect(page.locator('#experience')).toMatchAriaSnapshot(`
                - heading "Experience & Education" [level=2]
                - paragraph: /From naval operations to software engineering/
                - img
                - heading "Tier 2 Software Support Engineer" [level=3]
                - paragraph: Jifiti
                - text: /Current Aug \\d+ – Present/
                - list:
                  - listitem: /Investigate production incidents/
                  - listitem: /Built Python analytics pipelines/
                  - listitem: /Collaborate embedded in an R&D Agile squad/
                - img
                - heading "B.Sc. Computer Science (In Progress)" [level=3]
                - paragraph: Holon Institute of Technology (HIT)
                - text: /GPA \\d+ \\d+ – June \\d+/
                - list:
                  - listitem: /Specialising in Artificial Intelligence and Computer Vision/
                  - listitem: /Applying classroom ML theory/
                - img
                - heading "Software QA Specialist" [level=3]
                - paragraph: Hartech Technologies
                - text: /Nov \\d+ – Dec \\d+/
                - list:
                  - listitem: /Ran \\d+\\+ field tests/
                  - listitem: /Delivered on-site client training/
                  - listitem: /Identified and resolved defects/
                - img
                - heading "C2 System Operator & Team Lead" [level=3]
                - paragraph: Israeli Navy
                - text: /Feb \\d+ – Oct \\d+/
                - list:
                  - listitem: /Operated radar, sonar, and electronic warfare systems/
                  - listitem: /Coordinated multi-platform intelligence integration/
                  - listitem: /Led a \\d+-person crew/
            `);
        });

        test('[PIXEL] experience section screenshot matches baseline', async ({ page }) => {
            await expect(page.locator('#experience')).toHaveScreenshot('experience-section.png', {
                maxDiffPixelRatio: 0.02,
            });
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  5. SKILLS SECTION
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Skills Section', () => {

        test.beforeEach(async ({ page }) => {
            await page.goto(URLS.portfolio + '/#skills');
        });

        test('all four skill categories are visible', async () => {
            await expect(skills.getCategoryHeading('Programming')).toBeVisible();
            await expect(skills.getCategoryHeading('AI & Machine Learning')).toBeVisible();
            await expect(skills.getCategoryHeading('Cloud & DevOps')).toBeVisible();
            await expect(skills.getCategoryHeading('Concepts & Soft Skills')).toBeVisible();
        });

        test('key skills are visible in their categories', async ({ page }) => {
            await expect(page.locator('#skills')).toContainText('Python');
            await expect(page.locator('#skills')).toContainText('TypeScript');
            await expect(page.locator('#skills')).toContainText('PyTorch');
            await expect(page.locator('#skills')).toContainText('OpenCV');
            await expect(page.locator('#skills')).toContainText('Docker');
            await expect(page.locator('#skills')).toContainText('AWS');
        });

        test('filter input narrows skills by query "Py"', async ({ page }) => {
            await skills.filterSkills('Py');
            // Only Python-related skills should remain
            await expect(page.locator('#skills')).toContainText('Python');
            await expect(page.locator('#skills')).toContainText('PyTorch');
            // NumPy should appear because it contains "Py" match
            await expect(page.locator('#skills')).toContainText('NumPy');
        });

        test('filter input narrows skills by specific query "Python"', async ({ page }) => {
            await skills.filterSkills('Python');
            await expect(page.locator('#skills')).toContainText('Python');
            // Non-matching skills should be absent
            await expect(page.locator('#skills')).not.toContainText('Docker');
            await expect(page.locator('#skills')).not.toContainText('AWS');
        });

        test('skills ARIA snapshot matches all four categories', async ({ page }) => {
            await expect(page.locator('#skills')).toMatchAriaSnapshot(`
                - paragraph: Programming
                - text: Python TypeScript Java C++ SQL JavaScript NumPy Pandas Matplotlib React Node.js
                - paragraph: AI & Machine Learning
                - text: PyTorch OpenCV HuggingFace Scikit-learn GenAI Diffusion Models Computer Vision Deep Learning
                - paragraph: Cloud & DevOps
                - text: AWS Docker CI/CD Pipelines Jenkins MongoDB Git Playwright Selenium Jira Postman
                - paragraph: Concepts & Soft Skills
                - text: Data Structures Algorithms OOP System Design Agile Methodologies Communication Networks Analytical Thinking Team Collaboration Fast Learning
            `);
        });

        test('[PIXEL] skills section screenshot matches baseline', async ({ page }) => {
            await expect(page.locator('#skills')).toHaveScreenshot('skills-section.png', {
                maxDiffPixelRatio: 0.02,
            });
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  6. PROJECTS SECTION
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Projects Section', () => {

        test.beforeEach(async ({ page }) => {
            await page.goto(URLS.portfolio + '/#projects');
        });

        test('section heading is visible', async () => {
            await expect(projects.heading).toBeVisible();
        });

        test('all six project cards are visible', async () => {
            for (const projectName of PROJECTS) {
                await expect(projects.getProjectCardHeading(projectName)).toBeVisible();
            }
        });

        test('project ARIA snapshot includes all six projects with GitHub links', async ({ page }) => {
            await expect(page.locator('#projects')).toMatchAriaSnapshot(`
                - heading "Featured Projects" [level=2]
                - paragraph: /A selection of personal and academic builds/
                - link "View SwellSight on GitHub":
                  - /url: https://github.com/ShalevAtsis/SwellSight_Colab
                  - img
                - link "View SwellSight on GitHub":
                  - /url: https://github.com/ShalevAtsis/SwellSight_Colab
                  - img
                - paragraph: /AI-powered system that analyzes beach cam footage/
                - button "Read more"
                - text: Python PyTorch DINOv2 OpenCV HuggingFace ControlNet
                - link "View Anomalyze on GitHub":
                  - /url: https://github.com/ShalevAtsis/Anomalyze
                  - img
                - link "View Anomalyze on GitHub":
                  - /url: https://github.com/ShalevAtsis/Anomalyze
                  - img
                - paragraph: /Advanced AI-powered web security scanner/
                - button "Read more"
                - text: React Node.js Docker Express MongoDB DevSecOps
                - link "View Multithreaded TCP Chat on GitHub":
                  - /url: https://github.com/ShalevAtsis/Multithreaded-TCP-Chat
                  - img
                - link "View Multithreaded TCP Chat on GitHub":
                  - /url: https://github.com/ShalevAtsis/Multithreaded-TCP-Chat
                  - img
                - paragraph: /A multithreaded chat server implemented in Python/
                - button "Read more"
                - text: Python TCP/IP Sockets Multithreading Client-Server
                - link "View E2E DevOps Pipeline on GitHub":
                  - /url: https://github.com/ShalevAtsis/DevOps-Project
                  - img
                - link "View E2E DevOps Pipeline on GitHub":
                  - /url: https://github.com/ShalevAtsis/DevOps-Project
                  - img
                - paragraph: /An automated end-to-end DevOps pipeline/
                - button "Read more"
                - text: Jenkins Docker Selenium Gatling Tomcat CI/CD
                - link "View Titanic ML Flow on GitHub":
                  - /url: https://github.com/ShalevAtsis/Machine-Learning-Flow
                  - img
                - link "View Titanic ML Flow on GitHub":
                  - /url: https://github.com/ShalevAtsis/Machine-Learning-Flow
                  - img
                - paragraph: /Machine Learning flow project predicting Titanic/
                - button "Read more"
                - text: Python Scikit-Learn Pandas Seaborn Classification
                - link "View LeetCode Architecture on GitHub":
                  - /url: https://github.com/ShalevAtsis/LeetCode
                  - img
                - link "View LeetCode Architecture on GitHub":
                  - /url: https://github.com/ShalevAtsis/LeetCode
                  - img
                - paragraph: /A structured repository containing optimized solutions/
                - button "Read more"
                - text: Python C Algorithms Data Structures Graphs
            `);
        });

        test('"Read more" expands SwellSight description and "Show less" collapses it', async ({ page }) => {
            await page.getByRole('button', { name: 'Read more' }).first().click();
            await expect(page.locator('#projects')).toContainText(
                'AI-powered system that analyzes beach cam footage to extract wave height, direction, and breaking type.'
            );

            await page.getByRole('button', { name: 'Show less' }).click();
            // Card still contains the truncated text (not collapsed to nothing)
            await expect(page.locator('#projects')).toContainText('AI-powered system');
        });

        test('hover reveals GitHub link on SwellSight card', async () => {
            await projects.hoverProjectCard('SwellSight');
            const link = projects.getProjectExternalLink('SwellSight');
            await expect(link).toBeVisible();
        });

        test('hover reveals GitHub link on Anomalyze card', async () => {
            await projects.hoverProjectCard('Anomalyze');
            const link = projects.getProjectExternalLink('Anomalyze');
            await expect(link).toBeVisible();
        });

        test('SwellSight GitHub link opens external page in new tab', async ({ page }) => {
            const popupPromise = page.waitForEvent('popup');
            await page.getByRole('link', { name: 'View SwellSight on GitHub' }).nth(1).click();
            const popup = await popupPromise;
            expect(popup.url()).toContain('ShalevAtsis/SwellSight');
        });

        test('[PIXEL] projects section screenshot matches baseline', async ({ page }) => {
            await expect(page.locator('#projects')).toHaveScreenshot('projects-section.png', {
                maxDiffPixelRatio: 0.02,
            });
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  7. PERSONAL WORLD SECTION
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Personal World Section', () => {

        test.beforeEach(async ({ page }) => {
            await page.goto(URLS.portfolio + '/#personal-world');
        });

        test('globe canvas renders', async () => {
            // The canvas takes longer to render as it waits for next/dynamic + dataloads
            await expect(world.globeCanvas.first()).toBeAttached({ timeout: 20000 });
        });

        test('Cinema and Library panel buttons are visible', async () => {
            await expect(world.cinemaPanelButton).toBeVisible();
            await expect(world.libraryPanelButton).toBeVisible();
        });

        test('Now Playing widget is visible with Bad Bunny track', async () => {
            await expect(world.nowPlayingWidget).toBeVisible();
            await expect(world.getAudioPlayerTarget('Bad Bunny')).toBeVisible();
            await expect(world.getAudioPlayerTarget('Baile Inolvidable')).toBeVisible();
        });

        test('AI species classifier card is visible', async ({ page }) => {
            await expect(
                page.locator('div').filter({ hasText: '[AI TARGET ACQUIRED]Species:' }).nth(5)
            ).toBeVisible();
        });

        test('AI Suggestion Engine widget is visible', async () => {
            await expect(world.aiSuggestionEngine).toBeVisible();
            await expect(world.aiSuggestionInput).toBeVisible();
        });

        test('Cinema panel reveals Director\'s Cut list', async ({ page }) => {
            await world.openCinemaPanel();
            await expect(page.locator('#personal-world')).toMatchAriaSnapshot(`
                - paragraph: Director's Cut
                - text: /#1 Shutter Island \\d+ #2 The Godfather \\d+/
            `);
        });

        test('Library panel reveals reading list', async ({ page }) => {
            await world.openLibraryPanel();
            await expect(page.getByText('CinemaLibraryCurrently')).toBeVisible();
            await expect(page.locator('#personal-world')).toMatchAriaSnapshot(`
                - paragraph: Currently Reading
                - paragraph: 📖 The Lean Startup
                - paragraph: Eric Ries
                - paragraph: Read
                - text: /✓ The Power of Habit ✓ Can't Hurt Me/
            `);
        });

        test('Play/Pause toggle works on Now Playing widget', async ({ page }) => {
            await page.getByRole('button', { name: 'Play' }).click();
            await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();
            await page.getByRole('button', { name: 'Pause' }).click();
            await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
        });

        test('AI Suggestion Engine accepts a suggestion and confirms match', async ({ page }) => {
            await world.submitAiSuggestion('The Wolf of Wall Street');
            await expect(page.getByText('Match Confirmed!')).toBeVisible();
            await expect(page.getByText('Added to my backlog')).toBeVisible();

            await page.getByRole('button', { name: 'Suggest something else' }).click();
            await expect(world.aiSuggestionInput).toBeVisible();
        });

        test('AI Suggestion Engine accepts a second suggestion', async ({ page }) => {
            await world.submitAiSuggestion('The Lion King');
            await expect(page.getByText('Match Confirmed!')).toBeVisible();
        });

        test('section ARIA snapshot matches all widgets', async ({ page }) => {
            await expect(page.locator('#personal-world')).toMatchAriaSnapshot(`
                - paragraph: Beyond the Code
                - heading "Personal World" [level=2]
                - paragraph: /A dashboard of the things that make me tick/
                - img
                - text: Global Adventures
                - heading "Surf & Dive Spots" [level=3]
                - img
                - text: /Brazil Colombia Ecuador/
                - img
                - text: /Eilat Thailand San Andrés/
                - button "Cinema":
                  - img
                  - text: ""
                - button "Library":
                  - img
                  - text: ""
                - paragraph: Director's Cut
                - text: /#1 Shutter Island \\\\d+ #2 The Godfather \\\\d+/
                - img
                - text: Now Playing
                - img "Bad Bunny — Debí Tirar Más Fotos"
                - paragraph: Baile Inolvidable
                - paragraph: Bad Bunny
                - button "Play":
                  - img
                - text: /0:\\d+ 3:\\d+/
                - img "Hammerhead shark — AI CV scan"
                - text: /\\[AI TARGET ACQUIRED\\] Species: Hammerhead Shark/
                - paragraph: Computer Vision · Marine Biology
                - paragraph: AI Species Classifier — Galapagos Islands Deployment
                - img
                - text: AI Suggestion Engine
                - paragraph: /Know a movie, book, or dive site I'd love/
                - paragraph: /Drop it here/
                - textbox /e.g. The Social Network/
                - button "Send":
                  - img
                  - text: ""
            `);
        });

        test('[PIXEL] personal world section screenshot matches baseline', async ({ page }) => {
            await expect(page.locator('#personal-world')).toHaveScreenshot('personal-world-section.png', {
                maxDiffPixelRatio: 0.03, // slightly more lenient for animated globe
            });
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  8. CONTACT SECTION
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Contact Section', () => {

        test.beforeEach(async ({ page }) => {
            await page.goto(URLS.portfolio + '/#contact');
        });

        test('all five CTA links are visible', async () => {
            await expect(contact.whatsappLink).toBeVisible();
            await expect(contact.emailButton).toBeVisible();
            await expect(contact.linkedinLink).toBeVisible();
            await expect(contact.githubLink).toBeVisible();
            await expect(contact.downloadCvLink).toBeVisible();
        });

        test('CTA links have correct hrefs', async () => {
            await expect(contact.whatsappLink).toHaveAttribute('href', URLS.whatsapp);
            await expect(contact.emailButton).toHaveAttribute('href', URLS.email);
            await expect(contact.linkedinLink).toHaveAttribute('href', URLS.linkedin);
            await expect(contact.githubLink).toHaveAttribute('href', URLS.github);
            await expect(contact.downloadCvLink).toHaveAttribute('href', URLS.cv);
        });

        test('WhatsApp CTA opens external page in new tab', async ({ page }) => {
            const popupPromise = page.waitForEvent('popup');
            await contact.whatsappLink.click();
            const popup = await popupPromise;
            expect(popup.url()).toContain('wa.me');
        });

        test('LinkedIn CTA opens external page in new tab', async ({ page }) => {
            const popupPromise = page.waitForEvent('popup');
            await contact.linkedinLink.click();
            const popup = await popupPromise;
            expect(popup.url()).toContain('linkedin.com');
        });

        test('GitHub CTA opens external page in new tab', async ({ page }) => {
            const popupPromise = page.waitForEvent('popup');
            await contact.githubLink.click();
            const popup = await popupPromise;
            expect(popup.url()).toContain('github.com');
        });

        test('contact form fields are visible with correct placeholders', async ({ page }) => {
            await expect(contact.nameInput).toBeVisible();
            await expect(contact.emailInput).toBeVisible();
            await expect(contact.companyInput).toBeVisible();
            await expect(contact.messageInput).toBeVisible();
            await expect(contact.sendButton).toBeVisible();

            await expect(contact.nameInput).toHaveAttribute('placeholder', /John Doe/);
            await expect(contact.emailInput).toHaveAttribute('placeholder', /john@example.com/);
            await expect(contact.messageInput).toHaveAttribute('placeholder', /Tell me about your project/);
        });

        test('contact form fills, submits, and shows success message', async ({ page }) => {
            await contact.fillContactForm({
                name: 'Sydney Sweeney',
                email: 'test@example.com',
                company: 'Google',
                message: 'I love your portfolio!',
            });

            // Verify filled values before submit
            await expect(contact.nameInput).toHaveValue('Sydney Sweeney');
            await expect(contact.emailInput).toHaveValue('test@example.com');
            await expect(contact.messageInput).toHaveValue('I love your portfolio!');

            await contact.submitForm();
            await expect(page.getByText('Message sent successfully!')).toBeVisible();
            await expect(page.locator('#contact')).toContainText('Message sent successfully!');
        });

        test('contact form ARIA snapshot matches expected structure', async ({ page }) => {
            await expect(page.locator('#contact')).toMatchAriaSnapshot(`
                - paragraph: Let's Talk
                - heading "Get in Touch" [level=2]
                - paragraph: /Whether you have a project in mind/
                - link "WhatsApp":
                  - /url: https://wa.me/+972585060699
                  - img
                  - text: WhatsApp Fastest response
                - link "Email":
                  - /url: mailto:Shalevatsis@gmail.com
                  - img
                  - text: Email Shalevatsis@gmail.com
                - link "LinkedIn":
                  - /url: https://www.linkedin.com/in/shalev-atsis-software-developer/
                  - img
                  - text: LinkedIn Let's connect
                - link "GitHub":
                  - /url: https://github.com/ShalevAtsis
                  - img
                  - text: GitHub Explore my code
                - link "Download CV":
                  - /url: /Portfolio/Shalev_Atsis_CV.pdf
                  - img
                  - text: Download CV Get my full resume (PDF)
                - text: Name
                - textbox "Name":
                  - /placeholder: John Doe/
                - text: Email Address
                - textbox "Email Address":
                  - /placeholder: john@example.com/
                - text: Company / LinkedIn Profile (Optional)
                - textbox "Company / LinkedIn Profile (Optional)":
                  - /placeholder: Optional/
                - text: How can I help?
                - textbox "How can I help?":
                  - /placeholder: Tell me about your project or opportunity.../
                - button "Send Message"
            `);
        });

        test('[PIXEL] contact section screenshot matches baseline', async ({ page }) => {
            await expect(page.locator('#contact')).toHaveScreenshot('contact-section.png', {
                maxDiffPixelRatio: 0.02,
            });
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  9. FOOTER & EASTER EGG TERMINAL
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Footer & Easter Egg Debug Terminal', () => {

        test('footer copyright text is visible', async ({ page }) => {
            await expect(page.getByRole('contentinfo')).toContainText('Shalev Atsis · Software Engineer · 2026');
        });

        test('easter egg button is visible and triggers terminal overlay', async ({ page }) => {
            await expect(page.getByRole('button', { name: /Trigger debug mode/i })).toBeVisible();
            await page.getByRole('button', { name: /Trigger debug mode/i }).click();

            await expect(page.getByText('[ 0.000000] Booting kernel... fingers crossed.')).toBeVisible();
            await expect(page.getByText(/TIP: type 'help'/)).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Enter command…' })).toBeVisible();
        });

        test('terminal responds to "help" command with suggestions', async ({ page }) => {
            await page.getByRole('button', { name: /Trigger debug mode/i }).click();
            await page.getByRole('textbox', { name: 'Enter command…' }).fill('help');
            await page.getByRole('textbox', { name: 'Enter command…' }).press('Enter');
            await expect(page.getByText('Have you tried: sudo fix-site')).toBeVisible();
            await expect(page.locator('body')).toContainText('sudo fix-site --force (classic, never fails)');
        });

        test('terminal "sudo fix-site --force" restores the system', async ({ page }) => {
            await page.getByRole('button', { name: /Trigger debug mode/i }).click();
            await page.getByRole('textbox', { name: 'Enter command…' }).fill('sudo fix-site --force');
            await page.getByRole('textbox', { name: 'Enter command…' }).press('Enter');
            await expect(page.getByRole('button', { name: /System Restored/i })).toBeVisible();
        });

        test('terminal ARIA snapshot matches boot sequence', async ({ page }) => {
            await page.getByRole('button', { name: /Trigger debug mode/i }).click();
            await expect(page.locator('body')).toMatchAriaSnapshot(`
                - text: /system_recovery — CRITICAL \\[ \\d+\\.\\d+\\] Booting kernel/
                - textbox "Enter command…":
                  - /placeholder: " Enter command…"/
            `);
        });

        test('[PIXEL] footer screenshot matches baseline', async ({ page }) => {
            await expect(page.getByRole('contentinfo')).toHaveScreenshot('footer.png', {
                maxDiffPixelRatio: 0.02,
            });
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  10. RESUME VIEW
    // ═══════════════════════════════════════════════════════════════════════
    test.describe('Resume View', () => {

        test.beforeEach(async ({ page }) => {
            await navbar.toggleViewMode();
            await expect(page.getByText(/Interactive Resume/)).toBeVisible();
        });

        test('resume view toggle shows "Interactive Resume" header', async ({ page }) => {
            await expect(page.getByText(/Interactive Resume/)).toBeVisible();
        });

        test('Download PDF button triggers file download', async ({ page }) => {
            const downloadPromise = page.waitForEvent('download');
            await resume.downloadButton.click();
            const download = await downloadPromise;
            expect(download.suggestedFilename()).toContain('CV');
        });

        test('PDF object/iframe is embedded and attached to the DOM', async ({ page }) => {
            await expect(resume.pdfObject).toBeVisible({ timeout: 15_000 });
        });

        test('toggling back to Portfolio returns to portfolio view', async ({ page }) => {
            await navbar.toggleViewMode();
            await expect(hero.headingFirstFrame).toBeVisible();
        });
    });

});
