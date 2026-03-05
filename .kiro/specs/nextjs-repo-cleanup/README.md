# Next.js Repository Cleanup and Restructuring Spec

## Overview

This spec defines a comprehensive cleanup and restructuring of a Next.js (App Router) portfolio application. The goal is to organize the codebase into a maintainable, enterprise-standard structure while maintaining full functionality and test coverage.

## Spec Documents

This spec consists of three documents:

### 1. Requirements Document (`requirements.md`)
Defines what needs to be accomplished:
- Component organization into logical categories (ui, layout, sections, shared)
- Dead code removal
- Type centralization
- Hooks centralization
- Dependency cleanup
- Import path updates
- Build and test verification
- React Server Component preservation
- Test directory preservation
- Documentation of changes

### 2. Design Document (`design.md`)
Describes how the refactoring will be accomplished:
- Current state analysis
- Target state architecture
- Component categorization strategy
- Type centralization structure
- Hooks centralization structure
- Correctness properties for validation
- Error handling approach
- Testing strategy with verification checkpoints

### 3. Implementation Plan (`tasks.md`)
Provides specific coding tasks to execute:
- 23 discrete tasks organized in phases
- Component reorganization tasks
- Type and hook centralization tasks
- Import update tasks
- Dependency cleanup tasks
- Verification checkpoints
- Build and test verification tasks
- Documentation tasks

## Key Constraints

- DO NOT convert React Server Components to Client Components
- DO NOT alter the tests/ or pages/ (POM) directories except for import path updates
- Verify the application builds successfully after refactoring
- Ensure all Playwright tests continue to pass

## Target Structure

```
components/
├── ui/              # Atomic UI components
├── layout/          # Layout components (Navbar, Footer, etc.)
├── sections/        # Page sections (Hero, About, Projects, etc.)
└── shared/          # Utility and provider components

lib/
├── types/           # Centralized type definitions
├── hooks/           # Centralized custom hooks
├── basePath.ts
├── github.ts
└── motion.ts
```

## Execution

To execute this spec:

1. Open the `tasks.md` file
2. Click "Start task" next to the first task
3. Follow the task instructions
4. Complete each task before moving to the next
5. Use the verification checkpoints to ensure nothing breaks

## Success Criteria

The refactoring is successful when:
- All components are organized into correct directories
- All dead code is removed
- All types are centralized in lib/types/
- All hooks are centralized in lib/hooks/
- All unused dependencies are removed
- All import paths are updated to use @ alias
- The application builds without errors
- All Playwright tests pass
- Documentation of changes is complete

