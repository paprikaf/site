# Paprika - Personal Website

A modern, minimal personal website built with React, Vite, and Tailwind CSS. Features dark mode support, neobrutalism design, and a clean, distraction-free design.

## Features

- ⚡ **Fast & Minimal** - Built with Vite and React for optimal performance
- 🌓 **Dark Mode** - Automatic theme detection with manual toggle
- 📱 **Responsive Design** - Mobile-first approach for all screen sizes
- 🎨 **Neobrutalism Design** - Bold borders, high contrast, sharp corners inspired by [neobrutalism.dev](https://www.neobrutalism.dev/)
- 🔄 **Theme Persistence** - User's theme preference is saved to localStorage

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) - `npm install -g pnpm`
- ni (universal package manager) - `npm install -g @antfu/ni`

### Installation

```bash
# Using ni (recommended)
ni

# Or using pnpm directly
pnpm install

# Start development server
ni dev
# or
pnpm dev

# Build for production
ni build
# or
pnpm build

# Preview production build
ni preview
# or
pnpm preview
```

The development server will be available at `http://localhost:5173`

## Project Structure

```
site/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── button.tsx           # Neobrutalism Button component
│   │   └── ThemeToggle.tsx          # Dark/light mode toggle
│   ├── lib/
│   │   └── utils.ts                 # Utility functions
│   ├── App.tsx                      # Main App component
│   ├── App.css                      # App styles
│   ├── index.css                    # Global styles + CSS variables
│   └── main.tsx                     # Entry point
├── index.html                       # HTML template
├── tailwind.config.ts               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite configuration
├── pnpm-lock.yaml                   # pnpm lock file
└── package.json                     # Dependencies & scripts
```

## Technology Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Component Library**: shadcn/ui with Neobrutalism theme
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Package Manager CLI**: ni (@antfu/ni)

## Package Manager: ni

This project uses `ni` - a universal package manager CLI that works with npm, yarn, and pnpm.

### Common Commands

```bash
# Install packages (auto-detects your package manager)
ni react typescript

# Install globally
ni -g eslint

# Run scripts
nr dev
nr build
nr lint

# Upgrade packages interactively
nu

# Uninstall packages
nun react
```

## Customization

### Update Your Name

Edit `src/App.tsx` and replace "Your Name" with your actual name:

```typescript
<h1 className="text-4xl md:text-5xl font-bold mb-2">
  Your Name
</h1>
```

### Add Your Avatar

Replace the SVG icon in `src/App.tsx` with an actual image:

```typescript
<img
  src="/path/to/avatar.jpg"
  alt="Avatar"
  className="w-24 h-24 border-2 border-border bg-card"
/>
```

### Update Social Links

Update the social button links in `src/App.tsx`:

```typescript
<a href="https://github.com/YOUR_GITHUB" target="_blank" rel="noopener noreferrer">
  {/* GitHub icon */}
</a>
```

### Customize Colors

Edit `src/index.css` to change the neobrutalism colors:

```css
:root {
  --primary: #000000;
  --primary-foreground: #ffffff;
  --border: #000000;
  /* ... other colors ... */
}

html.dark {
  --primary: #ffffff;
  --primary-foreground: #000000;
  --border: #ffffff;
  /* ... other colors ... */
}
```

## Neobrutalism Design

This site uses the Neobrutalism design system with:

- **Bold 2px borders** on all interactive elements
- **Sharp corners** (no border radius)
- **High contrast** colors (black/white)
- **Color inversion** on hover
- **Bold typography**

All components use `shadcn/ui` with custom neobrutalism styling.

## Deployment

Build for production:

```bash
ni build
# Creates optimized files in dist/
```

### Deployment Options

- **Vercel** (Recommended): `pnpm add -g vercel && vercel`
- **Netlify**: Connect your Git repo
- **GitHub Pages**: Deploy the `dist/` folder
- **Any Static Host**: Upload the `dist/` folder

## Development Notes

- **HMR Enabled**: Changes auto-refresh in the browser
- **TypeScript**: Full type safety for all components
- **Tailwind**: All styling via utility classes
- **Responsive**: Mobile-first design with breakpoints
- **Performance**: Optimized build with code splitting
- **Dark Mode**: Automatic and persistent

## Available Scripts

```bash
ni dev       # Start dev server
ni build     # Build for production
ni preview   # Preview production build locally
ni lint      # Run ESLint
nr <script>  # Run any script in package.json
```

## Next Steps

- [ ] Update your name and avatar
- [ ] Customize social links (GitHub, X, Email)
- [ ] Adjust color scheme if desired
- [ ] Test dark mode toggle
- [ ] Deploy to your hosting platform
- [ ] Build out blog section with MDX
- [ ] Add projects showcase
- [ ] Implement SEO optimization

## License

MIT
