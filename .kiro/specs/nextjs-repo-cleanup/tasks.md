# Implementation Plan: Next.js Repository Cleanup and Restructuring

## Overview

This implementation plan breaks down the repository cleanup and restructuring into discrete, manageable coding tasks. The approach is systematic and verification-driven, with checkpoints at key stages to ensure nothing breaks. Each task builds on previous steps, with no orphaned code left unwired.

The refactoring is organized in phases:
1. Analysis and Planning
2. Component Reorganization
3. Type and Hook Centralization
4. Import Path Updates
5. Dead Code Removal
6. Verification and Documentation

## Tasks

- [x] 1. Analyze current codebase and create refactoring plan
  - Scan all component files and categorize them (ui, layout, sections, shared)
  - Identify all unused files and dead code
  - Identify all unused dependencies in package.json
  - Identify all type definitions scattered across files
  - Identify all custom hooks scattered across files
  - Create a detailed mapping document of current → target locations
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1_

- [x] 2. Create target directory structure
  - Create `components/ui/` directory (if not exists)
  - Create `components/layout/` directory
  - Create `components/sections/` directory
  - Create `components/shared/` directory
  - Create `lib/types/` directory
  - Create `lib/hooks/` directory
  - Verify all directories are created successfully
  - _Requirements: 1.1, 3.1, 4.1_

- [x] 3. Move UI components to components/ui/
  - Move `HoverEffectCard.tsx` to `components/ui/`
  - Move `SectionDivider.tsx` to `components/ui/`
  - Move `ScrollToTopButton.tsx` to `components/ui/`
  - Verify `FadeInUp.tsx` is in `components/ui/`
  - Verify `GlobeLoader.tsx` is in `components/ui/`
  - Verify `GlobeViz.tsx` is in `components/ui/`
  - Verify all UI components are in the correct location
  - _Requirements: 1.2_

- [x] 4. Move layout components to components/layout/
  - Move `Navbar.tsx` to `components/layout/`
  - Move `Footer.tsx` to `components/layout/`
  - Move `BackgroundMatrix.tsx` to `components/layout/`
  - Move `DebugLayoutWrapper.tsx` to `components/layout/`
  - Verify all layout components are in the correct location
  - _Requirements: 1.3_

- [x] 5. Verify section components in components/sections/
  - Verify `CleanHero.tsx` is in `components/sections/`
  - Verify `AboutSection.tsx` is in `components/sections/`
  - Verify `CleanExperience.tsx` is in `components/sections/`
  - Verify `CleanProjects.tsx` is in `components/sections/`
  - Verify `CleanSkills.tsx` is in `components/sections/`
  - Verify `ContactSection.tsx` is in `components/sections/`
  - Verify `PersonalWorld.tsx` is in `components/sections/`
  - _Requirements: 1.4_

- [x] 6. Move shared/utility components to components/shared/
  - Move `Providers.tsx` to `components/shared/`
  - Move `ContactForm.tsx` to `components/shared/`
  - Move `ContactButton.tsx` to `components/shared/`
  - Move `PortfolioView.tsx` to `components/shared/`
  - Move `ResumeView.tsx` to `components/shared/`
  - Move `ViewSwitcher.tsx` to `components/shared/`
  - Move `NavigationMenu.tsx` to `components/shared/`
  - Move `NavActions.tsx` to `components/shared/`
  - Move `ThemeToggle.tsx` to `components/shared/`
  - Move `DualModeToggle.tsx` to `components/shared/`
  - Move `TerminalOverlay.tsx` to `components/shared/`
  - Move `OceanicBackground.tsx` to `components/shared/`
  - Move `BugTrigger.tsx` to `components/shared/`
  - Move `ProjectCard.tsx` to `components/shared/`
  - Verify all shared components are in the correct location
  - _Requirements: 1.5_

- [x] 7. Identify and remove dead code
  - Scan for unused files in components directory
  - Scan for unused files in lib directory
  - Scan for unused files in context directory
  - Identify files that are not imported anywhere
  - Remove identified dead code files (e.g., PersonalInterests.tsx, content/copy.ts, scripts/)
  - Verify no remaining code depends on removed files
  - _Requirements: 2.1, 2.2_

- [x] 8. Centralize type definitions
  - Create `lib/types/components.ts` with all component prop interfaces
  - Create `lib/types/sections.ts` with all section component types
  - Create `lib/types/common.ts` with shared types
  - Create `lib/types/index.ts` as central export file
  - Extract type definitions from component files
  - Move extracted types to appropriate files in lib/types/
  - Verify all types are properly organized and exported
  - _Requirements: 3.1, 3.2, 3.4_

- [x] 9. Centralize custom hooks
  - Identify all custom hooks in the codebase
  - Create `lib/hooks/useDebug.ts` (extracted from context/DebugContext.tsx)
  - Create `lib/hooks/useView.ts` (extracted from context/ViewContext.tsx)
  - Create `lib/hooks/index.ts` as central export file
  - Extract hooks from context files
  - Move extracted hooks to lib/hooks/
  - Verify all hooks are properly organized and exported
  - _Requirements: 4.1, 4.2, 4.4_

- [x] 10. Update imports in app/layout.tsx
  - Update import for `Providers` to use new path `@/components/shared/Providers`
  - Update import for `DebugLayoutWrapper` to use new path `@/components/layout/DebugLayoutWrapper`
  - Update any other component imports to use @ alias
  - Verify all imports use @ alias
  - _Requirements: 6.1, 6.2_

- [x] 11. Update imports in app/page.tsx
  - Update all component imports to use new paths
  - Update all imports to use @ alias
  - Verify all imports are correct and resolve properly
  - _Requirements: 6.1, 6.2_

- [x] 12. Update imports in layout components
  - Update imports in `components/layout/Navbar.tsx`
  - Update imports in `components/layout/Footer.tsx`
  - Update imports in `components/layout/BackgroundMatrix.tsx`
  - Update imports in `components/layout/DebugLayoutWrapper.tsx`
  - Ensure all imports use @ alias (e.g., @/components/ui/Button)
  - Verify no relative imports remain (except for same-directory imports)
  - _Requirements: 6.1, 6.2_

- [x] 13. Update imports in section components
  - Update imports in all files in `components/sections/`
  - Ensure all imports use @ alias
  - Verify all component references are updated
  - _Requirements: 6.1, 6.2_

- [x] 14. Update imports in shared components
  - Update imports in all files in `components/shared/`
  - Ensure all imports use @ alias
  - Verify all component references are updated
  - _Requirements: 6.1, 6.2_

- [x] 15. Update imports in UI components
  - Update imports in all files in `components/ui/`
  - Ensure all imports use @ alias
  - Verify all component references are updated
  - _Requirements: 6.1, 6.2_

- [x] 16. Update imports in context files
  - Update imports in `context/DebugContext.tsx`
  - Update imports in `context/ViewContext.tsx`
  - Ensure all imports use @ alias
  - _Requirements: 6.1, 6.2_

- [x] 17. Update imports in lib files
  - Update imports in `lib/basePath.ts`
  - Update imports in `lib/github.ts`
  - Update imports in `lib/motion.ts`
  - Ensure all imports use @ alias
  - _Requirements: 6.1, 6.2_

- [x] 18. Update imports in test files
  - Update imports in `tests/portfolio.spec.ts` to reference new component paths
  - Update imports in `tests/responsive-layout.spec.ts` to reference new component paths
  - Update imports in all page object model files in `tests/pages/`
  - Verify test logic remains unchanged (only import paths updated)
  - Verify no test files are moved or deleted
  - _Requirements: 10.1, 10.2_

- [x] 19. Verify no broken imports remain
  - Scan all TypeScript files for import errors
  - Check for any references to old component paths
  - Verify all imports resolve correctly
  - Use TypeScript compiler to check for type errors: `npx tsc --noEmit`
  - _Requirements: 6.1, 6.2_

- [x] 20. Verify React Server Component preservation
  - Check `app/layout.tsx` - should be a Server Component (no 'use client')
  - Check `app/page.tsx` - should be a Server Component (no 'use client')
  - Verify no 'use client' directives were added to Server Components
  - Verify all Client Components still have 'use client' directives
  - Verify server/client component designations are preserved
  - _Requirements: 9.1_

- [x] 21. Checkpoint - Verify all imports and structure
  - Run TypeScript compiler to check for type errors: `npx tsc --noEmit`
  - Verify no import errors exist
  - Verify all components are in correct directories
  - Verify all types are centralized in lib/types/
  - Verify all hooks are centralized in lib/hooks/
  - Verify all imports use @ alias paths
  - Ensure all tests pass, ask the user if questions arise.

- [x] 22. Identify and remove unused dependencies
  - Analyze package.json dependencies
  - Check which dependencies are actually imported in the codebase
  - Verify all current dependencies are used (framer-motion, lucide-react, react-globe.gl, next-themes, etc.)
  - Document which dependencies are unused (if any)
  - Remove unused dependencies from package.json
  - _Requirements: 5.1_

- [x] 23. Build the application
  - Execute `npm run build` to build the application
  - Verify the build completes without errors
  - Check for any critical warnings in build output
  - Verify production artifacts are generated
  - If build fails, identify and fix the specific errors
  - _Requirements: 7.1_

- [x] 24. Run Playwright tests
  - Execute Playwright tests: `npx playwright test`
  - Verify all tests pass without modification to test logic
  - Check for any visual regression failures
  - If tests fail, investigate and resolve the failures
  - Verify test results match baseline screenshots
  - _Requirements: 8.1_

- [x] 25. Create refactoring summary document
  - Document all files that were moved (with old → new paths)
  - Document all files that were deleted (with reason)
  - Document all dependencies that were removed (with reason)
  - Document all import paths that were updated
  - Create a summary of the refactoring changes
  - Include rationale for each change
  - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [x] 26. Final checkpoint - Ensure all tests pass
  - Run full test suite: `npx playwright test`
  - Verify all tests pass
  - Verify build still succeeds: `npm run build`
  - Verify no TypeScript errors: `npx tsc --noEmit`
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- All tasks focus on code changes only (no user acceptance testing or deployment)
- Component reorganization maintains all existing functionality
- Import updates use the @ alias consistently throughout the codebase
- Test files are updated only for import paths, not test logic
- Verification checkpoints ensure nothing breaks during refactoring
- The refactoring is systematic and can be paused/resumed at checkpoints
- Dead code removal is conservative - only remove files that are definitely unused
- Dependency removal should be verified before removing from package.json
- All requirements are traced to specific tasks for full traceability

