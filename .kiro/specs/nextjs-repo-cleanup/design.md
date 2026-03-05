# Design Document: Next.js Repository Cleanup and Restructuring

## Overview

This design document outlines the approach for comprehensively cleaning up and restructuring a Next.js (App Router) portfolio application. The refactoring will organize components into logical categories, remove dead code, centralize types and hooks, clean up unused dependencies, and update all import statements while maintaining full functionality and test coverage.

The refactoring follows a systematic, verification-driven approach that ensures no breaking changes are introduced and all tests continue to pass throughout the process.

## Architecture

### Current State Analysis

The current project structure has:
- Components scattered across `components/`, `components/sections/`, and `components/ui/`
- Types potentially defined inline or scattered across files
- Hooks potentially defined in context files or scattered across the codebase
- Unused files and dependencies that accumulate over development
- Import statements using both relative and alias paths inconsistently

### Target State Architecture

```
project/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (Server Component)
│   ├── page.tsx                 # Home page (Server Component)
│   └── globals.css              # Global styles
├── components/
│   ├── ui/                      # Atomic UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── layout/                  # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── sections/                # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   └── ...
│   └── shared/                  # Utility components
│       ├── Providers.tsx
│       └── ...
├── lib/
│   ├── types/                   # Centralized type definitions
│   │   ├── components.ts
│   │   ├── sections.ts
│   │   └── ...
│   ├── hooks/                   # Centralized custom hooks
│   │   ├── useTheme.ts
│   │   ├── useViewMode.ts
│   │   └── ...
│   ├── basePath.ts
│   ├── github.ts
│   └── motion.ts
├── context/                     # Context providers (minimal)
│   ├── DebugContext.tsx
│   └── ViewContext.tsx
├── public/                      # Static assets
├── tests/                       # Playwright tests (unchanged)
│   ├── pages/                   # Page Object Models (unchanged)
│   └── *.spec.ts               # Test files (import paths updated)
└── [config files]
```

### Refactoring Strategy

The refactoring follows a phased, verification-driven approach:

1. **Analysis Phase**: Identify all unused files, dead code, and dependencies
2. **Planning Phase**: Map current components to target categories
3. **Reorganization Phase**: Move components to new locations
4. **Centralization Phase**: Consolidate types and hooks
5. **Import Update Phase**: Update all import statements
6. **Cleanup Phase**: Remove unused dependencies
7. **Verification Phase**: Build and test to ensure nothing broke

## Components and Interfaces

### Component Categorization Strategy

#### UI Components (`components/ui/`)
Atomic, reusable presentation components that are framework-agnostic and highly reusable:
- `FadeInUp.tsx` - Animation wrapper component
- `GlobeLoader.tsx` - Loading indicator with globe visualization
- `GlobeViz.tsx` - Interactive globe visualization
- `HoverEffectCard.tsx` - Card with hover effects
- `SectionDivider.tsx` - Visual section separator
- `ScrollToTopButton.tsx` - Scroll-to-top utility button

#### Layout Components (`components/layout/`)
Components that define page structure and composition:
- `Navbar.tsx` - Navigation bar
- `Footer.tsx` - Footer section
- `DebugLayoutWrapper.tsx` - Debug layout wrapper (if kept)
- `BackgroundMatrix.tsx` - Background visual effect

#### Section Components (`components/sections/`)
Page-level components representing major content sections:
- `CleanHero.tsx` - Hero section
- `AboutSection.tsx` - About section
- `CleanExperience.tsx` - Experience/skills section
- `CleanProjects.tsx` - Projects section
- `CleanSkills.tsx` - Skills section
- `ContactSection.tsx` - Contact section
- `PersonalWorld.tsx` - Personal interests section
- `PersonalInterests.tsx` - Additional interests section

#### Shared Components (`components/shared/`)
Utility and provider components:
- `Providers.tsx` - Theme and context providers
- `ContactForm.tsx` - Contact form component
- `ContactButton.tsx` - Contact button component
- `PortfolioView.tsx` - Portfolio view switcher
- `ResumeView.tsx` - Resume view component
- `ViewSwitcher.tsx` - View mode switcher
- `Navbar.tsx` - Navigation (if not in layout)
- `NavigationMenu.tsx` - Navigation menu
- `NavActions.tsx` - Navigation actions
- `ThemeToggle.tsx` - Theme toggle
- `DualModeToggle.tsx` - Dual mode toggle
- `TerminalOverlay.tsx` - Terminal overlay (if kept)
- `OceanicBackground.tsx` - Background effect (if kept)
- `BugTrigger.tsx` - Debug component (if kept)
- `ProjectCard.tsx` - Project card component

### Type Centralization Structure

#### `lib/types/components.ts`
- Component prop interfaces
- Component-specific types
- UI component type definitions

#### `lib/types/sections.ts`
- Section component prop types
- Section-specific data types

#### `lib/types/common.ts`
- Shared types used across components
- Domain models
- API response types

### Hooks Centralization Structure

#### `lib/hooks/useTheme.ts`
- Theme management hook (if extracted from context)

#### `lib/hooks/useViewMode.ts`
- View mode management hook (if extracted from context)

#### `lib/hooks/useDebug.ts`
- Debug mode hook (if extracted from context)

## Data Models

### Component Props Structure

All component props will be defined in `lib/types/components.ts` with clear interfaces:

```typescript
// UI Components
export interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export interface HoverEffectCardProps {
  children: React.ReactNode;
  className?: string;
  // ... other props
}

// Layout Components
export interface NavbarProps {
  // navbar-specific props
}

export interface FooterProps {
  // footer-specific props
}

// Section Components
export interface HeroSectionProps {
  // hero-specific props
}

// Shared Components
export interface ProvidersProps {
  children: React.ReactNode;
}
```

### Context and State Structure

Existing contexts will be preserved but may be refactored:
- `DebugContext.tsx` - Debug mode state
- `ViewContext.tsx` - View mode state (portfolio vs resume)

These will remain in the `context/` directory but may have hooks extracted to `lib/hooks/`.

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property-Based Testing Overview

Property-based testing validates software correctness by testing universal properties across many generated inputs. Each property is a formal specification that should hold for all valid inputs.

### Acceptance Criteria Testing Prework

1.1 WHEN examining the components directory, THE System SHALL have components organized into three main categories: ui, layout, and sections
  Thoughts: This is a structural requirement about how files should be organized. We can verify this by checking that all components are in the correct directories and that no components exist in the root components/ directory.
  Testable: yes - example

1.2 WHEN a component is a reusable atomic element, THE System SHALL place it in the components/ui/ directory
  Thoughts: This is a categorization rule that should apply to all atomic components. We can verify this by checking that all UI components are in the ui/ directory.
  Testable: yes - property

1.3 WHEN a component defines page structure or composition, THE System SHALL place it in the components/layout/ directory
  Thoughts: This is a categorization rule for layout components. We can verify this by checking that all layout components are in the layout/ directory.
  Testable: yes - property

1.4 WHEN a component represents a major content section, THE System SHALL place it in the components/sections/ directory
  Thoughts: This is a categorization rule for section components. We can verify this by checking that all section components are in the sections/ directory.
  Testable: yes - property

1.5 WHEN a component does not fit into the above categories, THE System SHALL place it in the components/shared/ directory
  Thoughts: This is a catch-all rule for utility components. We can verify this by checking that all remaining components are in the shared/ directory.
  Testable: yes - property

2.1 WHEN scanning the codebase, THE System SHALL identify all unused files that are not imported or referenced anywhere
  Thoughts: This is about identifying dead code. We can verify this by checking that no unused files remain in the codebase.
  Testable: yes - property

2.2 WHEN a file is identified as unused, THE System SHALL remove it from the repository
  Thoughts: This is about removing dead code. We can verify this by checking that no unused files exist after cleanup.
  Testable: yes - property

3.1 WHEN examining type definitions, THE System SHALL have a centralized types directory at lib/types/
  Thoughts: This is a structural requirement. We can verify this by checking that lib/types/ exists and contains type definitions.
  Testable: yes - example

3.2 WHEN type definitions exist in multiple files, THE System SHALL consolidate them into appropriate files within lib/types/
  Thoughts: This is about consolidation. We can verify this by checking that types are not scattered across multiple files.
  Testable: yes - property

4.1 WHEN examining custom hooks, THE System SHALL have a centralized hooks directory at lib/hooks/
  Thoughts: This is a structural requirement. We can verify this by checking that lib/hooks/ exists and contains hook definitions.
  Testable: yes - example

4.2 WHEN custom hooks exist in multiple locations, THE System SHALL consolidate them into lib/hooks/
  Thoughts: This is about consolidation. We can verify this by checking that hooks are not scattered across multiple files.
  Testable: yes - property

5.1 WHEN scanning package.json, THE System SHALL identify all dependencies that are not imported or used in the codebase
  Thoughts: This is about identifying unused dependencies. We can verify this by checking that no unused dependencies remain.
  Testable: yes - property

6.1 WHEN files are moved to new locations, THE System SHALL update all import statements that reference those files
  Thoughts: This is about import consistency. We can verify this by checking that all imports are updated and no broken imports remain.
  Testable: yes - property

6.2 WHEN import paths are updated, THE System SHALL use the @ alias path consistently
  Thoughts: This is about import style consistency. We can verify this by checking that all imports use the @ alias.
  Testable: yes - property

7.1 WHEN the refactoring is complete, THE System SHALL execute the Next.js build process
  Thoughts: This is about build verification. We can verify this by checking that the build completes without errors.
  Testable: yes - example

8.1 WHEN the refactoring is complete, THE System SHALL execute all Playwright tests
  Thoughts: This is about test verification. We can verify this by checking that all tests pass.
  Testable: yes - example

9.1 WHEN examining components, THE System SHALL NOT convert any existing React Server Components to Client Components
  Thoughts: This is about preserving server component designations. We can verify this by checking that no 'use client' directives are added to server components.
  Testable: yes - property

10.1 WHEN refactoring is performed, THE System SHALL NOT modify the tests/ directory structure
  Thoughts: This is about test preservation. We can verify this by checking that the tests/ directory structure remains unchanged.
  Testable: yes - property

10.2 WHEN component selectors change due to reorganization, THE System SHALL update only the import paths in test files
  Thoughts: This is about test import updates. We can verify this by checking that only import paths are updated in test files.
  Testable: yes - property

### Correctness Properties

Property 1: Component Directory Organization
*For any* component file in the components directory, it should be located in one of the following subdirectories: ui/, layout/, sections/, or shared/
**Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5**

Property 2: No Dead Code Remains
*For any* file in the codebase, if it is not imported or referenced anywhere, it should not exist in the repository
**Validates: Requirements 2.1, 2.2**

Property 3: Types Centralization
*For any* type definition in the codebase, it should be defined in lib/types/ and not scattered across component files
**Validates: Requirements 3.1, 3.2**

Property 4: Hooks Centralization
*For any* custom hook in the codebase, it should be defined in lib/hooks/ and not scattered across context or component files
**Validates: Requirements 4.1, 4.2**

Property 5: No Unused Dependencies
*For any* dependency in package.json, it should be imported and used somewhere in the codebase
**Validates: Requirements 5.1**

Property 6: Import Path Consistency
*For any* import statement in the codebase, it should use the @ alias path (e.g., @/components/ui/Button) and not use relative paths
**Validates: Requirements 6.1, 6.2**

Property 7: Server Component Preservation
*For any* React Server Component, it should not have a 'use client' directive added during refactoring
**Validates: Requirements 9.1**

Property 8: Test Directory Integrity
*For any* test file, its structure and logic should remain unchanged, with only import paths updated
**Validates: Requirements 10.1, 10.2**

Property 9: Build Success
*For any* refactoring step, the Next.js build process should complete without errors
**Validates: Requirements 7.1**

Property 10: Test Pass Rate
*For any* refactoring step, all Playwright tests should pass without modification to test logic
**Validates: Requirements 8.1**

## Error Handling

### Build Errors
- If the build fails, the refactoring process should halt and report specific errors
- Error messages should indicate which files or imports are causing the failure
- The developer should review and fix the issues before proceeding

### Test Failures
- If Playwright tests fail, the refactoring process should halt and report specific failures
- Visual regression failures should be reviewed to determine if they are expected or indicate a problem
- Test failures should be investigated and resolved before proceeding

### Import Errors
- If import statements are broken, the build will fail with specific error messages
- All import errors should be fixed before proceeding to the next phase
- A verification step should check for broken imports before building

### Dependency Errors
- If a removed dependency is still used somewhere, the build will fail
- The developer should either restore the dependency or remove the usage
- A verification step should check for unused dependencies before removing them

## Testing Strategy

### Dual Testing Approach

The refactoring will use both unit testing and property-based testing to ensure correctness:

1. **Unit Tests**: Verify specific examples and edge cases
   - Verify that specific components are in the correct directories
   - Verify that specific imports are updated correctly
   - Verify that the build completes successfully
   - Verify that all Playwright tests pass

2. **Property-Based Tests**: Verify universal properties across all inputs
   - For all components, verify they are in the correct directory
   - For all imports, verify they use the @ alias
   - For all dependencies, verify they are used somewhere
   - For all tests, verify they pass without modification

### Verification Checkpoints

The refactoring will include verification checkpoints at key stages:

1. **After Component Reorganization**: Verify all components are in correct directories
2. **After Import Updates**: Verify all imports are updated and no broken imports exist
3. **After Dependency Cleanup**: Verify the build completes successfully
4. **After All Changes**: Verify all Playwright tests pass

### Build Verification

- Execute `npm run build` to verify the application builds successfully
- Check for any errors or critical warnings in the build output
- Verify that the build produces optimized production artifacts

### Test Verification

- Execute `npm run test` (or equivalent Playwright command) to run all tests
- Verify that all tests pass without modification to test logic
- Check for any visual regression failures and investigate if needed

