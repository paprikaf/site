# Using `ni` - Universal Package Manager CLI

`ni` automatically detects your package manager (npm, yarn, pnpm) and uses the right one.

## Installation

```bash
npm install -g @antfu/ni
```

## Commands

### `ni` - Install packages
```bash
# Install dependencies
ni

# Install specific package
ni react typescript

# Install multiple packages
ni react react-dom

# Install dev dependency
ni -D eslint

# Install globally
ni -g vercel
```

### `nr` - Run scripts
```bash
# Run dev server
nr dev

# Run build
nr build

# Run any script from package.json
nr lint
nr test

# Run without arguments to choose from available scripts
nr
```

### `nu` - Upgrade packages
```bash
# Interactive upgrade - select which packages to upgrade
nu

# Upgrade all packages
nu --latest
```

### `nun` - Uninstall packages
```bash
# Remove package
nun react

# Remove multiple packages
nun react react-dom

# Remove dev dependency
nun -D eslint
```

### `nlx` - Execute packages
```bash
# Run a package binary
nlx create-vite@latest
```

## Project Setup

```bash
# Clone/enter project
cd my-project

# Install with pnpm (auto-detected)
ni

# Start development
nr dev

# Build for production
nr build
```

## Why Use `ni`?

- ✅ One command for all package managers
- ✅ Auto-detects pnpm/npm/yarn from lock file
- ✅ Faster with pnpm (hard links, monorepo support)
- ✅ Consistent across projects
- ✅ Great for team workflows

## Our Setup

This project uses:
- **pnpm** - Fast, disk-space efficient package manager
- **ni** - Universal CLI that auto-detects pnpm
- **shadcn/ui** - Component library with neobrutalism theme
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool

## Quick Reference

| Task | Command |
|------|---------|
| Install | `ni` |
| Install package | `ni react` |
| Install dev package | `ni -D eslint` |
| Run dev server | `nr dev` |
| Build | `nr build` |
| Upgrade packages | `nu` |
| Uninstall | `nun react` |
| Choose script | `nr` |

That's it! Happy coding! 🚀
