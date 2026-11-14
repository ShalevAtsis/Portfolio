import { test as base, expect, type Locator, type Page } from '@playwright/test';

/** 1×1 transparent PNG used in place of remote images (Cloudinary, globe textures). */
const PIXEL = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    'base64',
);

/**
 * Every test runs hermetically: nothing leaves the machine except requests to
 * the site under test.
 *  - Web3Forms is mocked, so the suite never sends real e-mails to the owner.
 *  - Remote images resolve instantly to a transparent pixel (stable snapshots).
 *  - External pages opened in new tabs (GitHub, LinkedIn, WhatsApp) get an empty document.
 */
export const test = base.extend<{ hermetic: void }>({
    hermetic: [
        async ({ context, baseURL }, use) => {
            const siteOrigin = new URL(baseURL ?? 'http://localhost:3000').origin;
            await context.route(
                (url) => url.origin !== siteOrigin && /^https?:$/.test(url.protocol),
                async (route) => {
                    const request = route.request();
                    const url = new URL(request.url());
                    if (url.hostname === 'api.web3forms.com') {
                        return route.fulfill({
                            status: 200,
                            contentType: 'application/json',
                            headers: { 'access-control-allow-origin': '*' },
                            body: JSON.stringify({ success: true, message: 'mocked' }),
                        });
                    }
                    if (request.resourceType() === 'image' || /\.(png|jpe?g|webp|avif|gif)$/i.test(url.pathname)) {
                        return route.fulfill({
                            status: 200,
                            contentType: 'image/png',
                            headers: { 'access-control-allow-origin': '*' },
                            body: PIXEL,
                        });
                    }
                    return route.fulfill({
                        status: 200,
                        contentType: 'text/html',
                        body: '<!doctype html><title>external (mocked)</title>',
                    });
                },
            );
            await use();
        },
        { auto: true },
    ],
});

export { expect };

/**
 * Pixel baselines exist for one project only (Desktop Chrome on Linux — the CI
 * platform). Elsewhere the comparison is skipped; regenerate baselines with
 * `npm run test:visual:update` (runs the official Playwright Docker image).
 */
export function isVisualProject(projectName: string): boolean {
    return projectName === 'Desktop Chrome' && (process.platform === 'linux' || !!process.env.PW_VISUAL);
}

/** Animated / remote-content regions that must never be part of a pixel diff. */
export function volatileRegions(page: Page): Locator[] {
    return [page.locator('canvas'), page.locator('video'), page.locator('img'), page.locator('[data-visual-mask]')];
}
