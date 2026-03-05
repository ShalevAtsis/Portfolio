import { test, expect } from '@playwright/test';
import { HeroSection } from './pages/HeroSection';
import { Navbar } from './pages/Navbar';

test.describe('Responsive Design Layout Tests', () => {

    test.beforeEach(async ({ page }) => {
        // Navigate to the homepage before each test
        await page.goto('https://shalevatsis.github.io/Portfolio/');
    });

    test('Hero Section renders correctly on the current viewport', async ({ page }) => {
        const hero = new HeroSection(page);

        // Wait for hydration and stability
        await expect(hero.headingFirstFrame).toBeVisible({ timeout: 10000 });

        // Standard assertions that should pass regardless of the viewport
        await expect(hero.statusBadge).toBeVisible();
        await expect(hero.whatsappButton).toBeVisible();

        // -------------------------------------------------------------
        // VISUAL (PIXEL-PERFECT) TESTING
        // -------------------------------------------------------------

        // Take a full-section screenshot. 
        // Playwright will automatically save separate baseline images for each 
        // environment defined in playwright.config.ts (Desktop, Tablet, Mobile)
        // using the format: hero-responsive-layout-[project_name]-[os].png
        await expect(hero.sectionLocator).toHaveScreenshot('hero-responsive-layout.png', {
            maxDiffPixelRatio: 0.02,
        });
    });

    test('Navbar menu behavior adapts to current viewport', async ({ page }) => {
        // The Burger Menu button is always visible on all screen sizes
        await expect(page.getByRole('button', { name: 'Open navigation menu' })).toBeVisible();

        const viewportWidth = page.viewportSize()?.width || 0;

        if (viewportWidth < 640) {
            // Mobile Viewport (< sm): The social icons are hidden inside a trigger menu
            await expect(page.getByRole('button', { name: 'Open social links' })).toBeVisible();

            // The desktop inline GitHub link is hidden by Tailwind's "sm:flex"
            await expect(page.locator('.sm\\:flex').getByRole('link', { name: 'GitHub' })).not.toBeVisible();
        } else {
            // Tablet & Desktop viewports (>= sm): The social icons are displayed inline
            await expect(page.getByRole('button', { name: 'Open social links' })).not.toBeVisible();

            // The inline GitHub link is visible
            await expect(page.locator('.sm\\:flex').getByRole('link', { name: 'GitHub' })).toBeVisible();
        }
    });

});
