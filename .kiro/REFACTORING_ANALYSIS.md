# Next.js Repository Cleanup - Refactoring Analysis

## Current State Analysis

### Component Organization (Current)
- **Root components/** directory contains 21 files:
  - Layout components: Navbar.tsx, Footer.tsx, BackgroundMatrix.tsx, DebugLayoutWrapper.tsx
  - Shared/Utility: Providers.tsx, ContactForm.tsx, ContactButton.tsx, PortfolioView.tsx, ResumeView.tsx, ViewSwitcher.tsx, NavigationMenu.tsx, NavActions.tsx, ThemeToggle.tsx, DualModeToggle.tsx, TerminalOverlay.tsx, OceanicBackground.tsx, BugTrigger.tsx, ProjectCard.tsx, HoverEffectCard.tsx, ScrollToTopButton.tsx, SectionDivider.tsx
  - UI: (partially organized)

- **components/ui/** directory contains 3 files:
  - FadeInUp.tsx (animation wrapper)
  - GlobeLoader.tsx (loading indicator)
  - GlobeViz.tsx (globe visualization)

- **components/sections/** directory contains 8 files:
  - AboutSection.tsx
  - CleanExperience.tsx
  - CleanHero.tsx
  - CleanProjects.tsx
  - CleanSkills.tsx
  - ContactSection.tsx
  - PersonalInterests.tsx
  - PersonalWorld.tsx

### Target Organization
Components need to be reorganized into:
- **components/ui/**: Atomic UI components (FadeInUp, GlobeLoader, GlobeViz, HoverEffectCard, SectionDivider, ScrollToTopButton)
- **components/layout/**: Layout components (Navbar, Footer, BackgroundMatrix, DebugLayoutWrapper)
- **components/sections/**: Already organized (AboutSection, CleanExperience, CleanHero, CleanProjects, CleanSkills, ContactSection, PersonalInterests, PersonalWorld)
- **components/shared/**: Utility/provider components (Providers, ContactForm, ContactButton, PortfolioView, ResumeView, ViewSwitcher, NavigationMenu, NavActions, ThemeToggle, DualModeToggle, TerminalOverlay, OceanicBackground, BugTrigger, ProjectCard)

### Type Definitions (Current)
- No centralized types directory exists
- Types are likely defined inline in components or scattered across files
- Need to create lib/types/ directory and consolidate

### Custom Hooks (Current)
- Hooks are defined in context files:
  - context/DebugContext.tsx (useDebug hook)
  - context/ViewContext.tsx (useView hook)
- Need to create lib/hooks/ directory and extract hooks

### Dependencies Analysis

#### Used Dependencies:
- **next**: ^16.1.6 ✓ (used in app router)
- **react**: ^18.3.1 ✓ (core framework)
- **react-dom**: ^18.3.1 ✓ (core framework)
- **next-themes**: ^0.4.6 ✓ (used in Providers.tsx, ThemeToggle.tsx)
- **lucide-react**: ^0.460.0 ✓ (used in multiple components for icons)
- **framer-motion**: ^11.11.17 ✓ (used in FadeInUp, ProjectCard, ContactForm, HoverEffectCard, and section components)
- **react-globe.gl**: ^2.37.0 ✓ (used in GlobeViz.tsx with dynamic import)

#### Used DevDependencies:
- **@playwright/test**: ^1.58.2 ✓ (used for tests)
- **@types/node**: ^22.9.0 ✓ (TypeScript types)
- **@types/react**: ^18.3.12 ✓ (TypeScript types)
- **@types/react-dom**: ^18.3.1 ✓ (TypeScript types)
- **autoprefixer**: ^10.4.20 ✓ (PostCSS plugin)
- **postcss**: ^8.4.49 ✓ (CSS processing)
- **tailwindcss**: ^3.4.15 ✓ (CSS framework)
- **typescript**: ^5.6.3 ✓ (TypeScript compiler)
- **serve**: ^14.2.5 ? (may be unused - check if used in scripts)

**Conclusion**: All dependencies appear to be used. The `serve` package may be unused but should be verified.

### Dead Code Analysis

#### Potentially Unused Files:
- Need to scan for files that are not imported anywhere
- Will check during task execution

### Import Path Analysis

Current imports use @ alias paths (good):
- `@/components/Providers`
- `@/context/DebugContext`
- `@/lib/basePath`
- `@/lib/github`
- `@/lib/motion`

Some components may still use relative imports - need to verify and update.

### React Server Component Status

- **app/layout.tsx**: Server Component (no 'use client') ✓
- **app/page.tsx**: Server Component (no 'use client') ✓
- **components/Providers.tsx**: Client Component ('use client') ✓
- **components/sections/**: Mix of Server and Client Components - need to verify each

## Refactoring Plan

### Phase 1: Directory Structure (Task 2)
1. Create components/layout/ directory
2. Create components/shared/ directory
3. Create lib/types/ directory
4. Create lib/hooks/ directory

### Phase 2: Component Reorganization (Tasks 3-6)
1. Move UI components to components/ui/
2. Move layout components to components/layout/
3. Verify section components in components/sections/
4. Move shared components to components/shared/

### Phase 3: Type and Hook Centralization (Tasks 8-9)
1. Extract and centralize types in lib/types/
2. Extract and centralize hooks in lib/hooks/

### Phase 4: Import Updates (Tasks 10-15)
1. Update imports in app/layout.tsx
2. Update imports in app/page.tsx
3. Update imports in all components
4. Update imports in context files
5. Update imports in lib files
6. Update imports in test files

### Phase 5: Verification (Tasks 16-19)
1. Verify no broken imports
2. Verify React Server Components preserved
3. Run TypeScript compiler check

### Phase 6: Cleanup and Build (Tasks 20-21)
1. Remove unused dependencies
2. Build application
3. Run Playwright tests

### Phase 7: Documentation (Tasks 22-23)
1. Create refactoring summary
2. Final verification

## Key Considerations

1. **Import Paths**: All imports should use @ alias (e.g., @/components/ui/Button)
2. **Server Components**: Preserve existing server/client designations
3. **Test Files**: Update only import paths, not test logic
4. **Dependencies**: All current dependencies appear to be used
5. **Dead Code**: Need to identify and remove unused files
6. **Type Safety**: Ensure no TypeScript errors after refactoring

## Next Steps

1. Create target directory structure
2. Move components to new locations
3. Update all import statements
4. Verify build and tests pass
