# GitHub Copilot Instructions

## Project Overview

This is **SunoAI Music Muse** - a creative tool that generates original song lyrics and SunoAI-style prompts based on user-specified musical styles, languages, and additional context. The application is powered by a configurable LLM API (OpenRouter) and built with modern web technologies.

### Target Users
Musicians, content creators, and songwriters who want to quickly generate creative, production-ready lyrics and prompts for use with SunoAI.

### Key Features
- API key configuration with secure KV storage
- Music style input with multi-genre support
- Language selection for lyrics (20+ languages)
- Additional context input for creative direction
- Content generation with structured lyrics and SunoAI prompts
- Copy-to-clipboard functionality for easy use

## Technology Stack

### Frontend Framework & Language
- **React 19.0.0** with TypeScript 5.7.2
- Use functional components with hooks (useState, useEffect, custom hooks)
- Prefer React hooks over class components
- Use TypeScript for all new code with proper type definitions

### Build Tools & Development
- **Vite 6.3.5** - Build tool and dev server
- **@vitejs/plugin-react-swc** - Fast React refresh with SWC
- **TypeScript** with strict null checks enabled
- Base path: `/sunoai-music-muse/`

### Styling & UI Components
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI primitives
- **@phosphor-icons/react** - Primary icon library
- **Framer Motion** - Animation library for smooth transitions
- Use the `cn()` utility from `@/lib/utils` for conditional class names

### State Management & Data
- **@github/spark/hooks** - Custom hooks including `useKV` for key-value storage
- React's built-in state management (useState, useContext)
- **@tanstack/react-query** - For server state management (if needed)

### Key Dependencies
- **@github/spark** - GitHub Spark framework (v0.39.0)
- **sonner** - Toast notifications
- **zod** - Schema validation
- **react-hook-form** + **@hookform/resolvers** - Form management

## Coding Guidelines

### TypeScript Standards
- Always use TypeScript for new files (`.tsx`, `.ts`)
- Define interfaces for all component props and data structures
- Use explicit return types for functions when not obvious
- Enable and respect `strictNullChecks` setting
- Use proper type imports: `import type { Type } from 'module'`

### React Component Patterns
- Use functional components exclusively
- Prefer named exports for components
- Use `React.FC` or explicit prop types
- Structure components: imports → interfaces → component → exports
- Extract complex logic into custom hooks

### Code Style & Naming
- **Variables/Functions**: camelCase
- **Components**: PascalCase
- **Constants**: UPPER_SNAKE_CASE
- **Interfaces**: PascalCase with descriptive names (e.g., `GeneratedContent`, `OpenRouterModel`)
- **File names**: kebab-case for utilities, PascalCase for components

### Import Aliases
- Use `@/` prefix for imports from `src/` directory
- Example: `import { cn } from '@/lib/utils'`
- Example: `import { Button } from '@/components/ui/button'`

### Component Organization
```
src/
├── components/
│   └── ui/           # shadcn/ui components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── styles/           # Global styles
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

### UI Component Usage
- Use shadcn/ui components from `@/components/ui/`
- Available components: Button, Card, Dialog, Input, Textarea, Select, Label, Badge, Alert, Separator, Popover, Command, and more
- Customize components using Tailwind utility classes
- Use Phosphor Icons for iconography: `import { IconName } from '@phosphor-icons/react'`

### State Management Patterns
- Use `useKV` hook from `@github/spark/hooks` for persistent storage (API keys, settings)
- Use `useState` for component-local state
- Use `toast` from `sonner` for user feedback/notifications
- Handle loading states explicitly in UI

### Animation Guidelines
- Use Framer Motion for animations: `motion` components and `AnimatePresence`
- Keep animations subtle and purposeful (feedback, state changes)
- Hierarchy: Generate button → Results fade-in → Copy buttons feedback

### Error Handling
- Use `ErrorFallback.tsx` component for error boundaries
- Display user-friendly error messages in UI
- Use Alert component for validation hints and errors
- Handle API errors gracefully with clear feedback

### Accessibility
- Use semantic HTML elements
- Include proper ARIA labels where needed
- Ensure keyboard navigation works
- Maintain color contrast ratios (per design system)
- Use Label components with form inputs

## Design System

### Color Palette
- **Primary**: Deep purple (oklch(0.45 0.15 300)) - Creativity and artistry
- **Secondary**: Muted slate backgrounds
- **Accent**: Vibrant cyan (oklch(0.75 0.15 200)) - CTAs and interactive elements
- All color pairings meet WCAG accessibility standards

### Typography
- **Font Family**: Inter (geometric sans-serif)
- **H1 (App Title)**: Inter Bold/32px/tight/-0.02em
- **H2 (Section Headers)**: Inter Semibold/20px/normal
- **Body (Form Labels)**: Inter Medium/14px/normal
- **Input Text**: Inter Regular/16px/1.6 line-height
- **Button Text**: Inter Semibold/14px/normal

### Spacing
- Container padding: p-6 (desktop), p-4 (mobile)
- Form field spacing: gap-6 (vertical), gap-4 (related groups)
- Card internal padding: p-6
- Section spacing: space-y-8

### Responsive Design
- Mobile-first approach
- Single column layout on mobile
- Full-width cards and buttons on mobile
- Larger touch targets (min-h-12 for buttons)
- Dialogs take full screen on mobile

## Build, Test & Development

### Development Commands
```bash
npm run dev         # Start development server with Vite
npm run build       # Build for production (TypeScript + Vite)
npm run lint        # Run ESLint (note: config needs setup)
npm run preview     # Preview production build
npm run optimize    # Optimize dependencies
```

### Build Requirements
- Node.js and npm installed
- Run `npm install` to install dependencies
- TypeScript compilation with `tsc -b --noCheck`
- Vite build for production bundle

### Testing
- No test framework currently configured
- Manual testing recommended for all changes:
  - Test form inputs and validation
  - Verify API key storage and retrieval (KV storage)
  - Test content generation flow with valid/invalid inputs
  - Check copy-to-clipboard functionality
  - Test all button states (hover, active, disabled, loading)
  - Verify toast notifications appear correctly
  - Test responsive behavior on mobile (< 768px) and desktop
  - Check keyboard navigation and accessibility

### Linting
- ESLint 9.28.0 is installed but requires an `eslint.config.js` file (ESLint flat config format)
- If creating the ESLint config, use:
  - `eslint-plugin-react-hooks` for React hooks rules
  - `eslint-plugin-react-refresh` for fast refresh compatibility
  - `typescript-eslint` for TypeScript-specific linting
  - Follow ESLint v9 flat config format (not legacy .eslintrc)

## Best Practices

### When Adding New Features
1. Review PRD.md for design requirements and user flows
2. Use existing shadcn/ui components where possible
3. Follow the established component patterns
4. Maintain TypeScript type safety
5. Test responsive behavior
6. Add loading and error states
7. Use toast notifications for user feedback

### API Integration
- Store API keys in KV storage via `useKV` hook
- Handle API errors with user-friendly messages
- Show loading states during API calls
- Validate API responses before using

### Performance Considerations
- Use React.memo for expensive components if needed
- Lazy load components with React.lazy if bundle size grows
- Optimize images and assets
- Use Vite's code splitting features

### Security
- Never commit API keys or secrets
- Use environment variables for sensitive config
- Validate and sanitize user inputs
- Follow secure coding practices for API calls

## Additional Resources

- **PRD**: See `PRD.md` for complete product requirements and design specifications
- **README**: See `README.md` for project overview
- **Component Library**: [shadcn/ui documentation](https://ui.shadcn.com/)
- **Tailwind CSS**: [Tailwind documentation](https://tailwindcss.com/docs)
- **React**: [React documentation](https://react.dev/)
- **TypeScript**: [TypeScript documentation](https://www.typescriptlang.org/docs/)

## Common Patterns in This Project

### Using KV Storage
```typescript
import { useKV } from '@github/spark/hooks'

const [apiKey, setApiKey, isLoading] = useKV<string>('api-key', '')
```

### Toast Notifications
```typescript
import { toast } from 'sonner'

toast.success('Operation successful!')
toast.error('Something went wrong')
```

### Conditional Styling
```typescript
import { cn } from '@/lib/utils'

<Button className={cn("base-classes", condition && "conditional-classes")} />
```

### Component Structure
```typescript
import React, { useState } from 'react'
import { ComponentProps } from '@/components/ui/component'

interface MyComponentProps {
  title: string
  onAction: () => void
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  const [state, setState] = useState(false)
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}
```
