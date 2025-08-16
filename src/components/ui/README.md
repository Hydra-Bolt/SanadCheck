# SanadCheck UI Components

This directory contains reusable UI components following DRY (Don't Repeat Yourself) principles and professional React/TypeScript practices.

## Components Overview

### Core Components

#### `Hero`
A reusable hero section component with customizable title, subtitle, and actions.

**Props:**
- `title`: Main heading text
- `subtitle`: Supporting description text
- `primaryAction`: Optional primary button with onClick handler
- `secondaryAction`: Optional secondary link with href
- `icon`: Optional icon component (defaults to BookOpenIcon)

**Usage:**
```tsx
<Hero
  title="SanadCheck"
  subtitle="Authenticate hadith chains with AI-powered analysis"
  primaryAction={{ text: "Try Analysis Tool", onClick: handleClick }}
  secondaryAction={{ text: "Learn More", href: "/about" }}
/>
```

#### `Section`
A wrapper component for consistent section layout and styling.

**Props:**
- `children`: Content to render
- `background`: Color scheme ('white' | 'gray' | 'gradient')
- `padding`: Spacing variant ('normal' | 'large')
- `className`: Additional CSS classes
- `id`: Optional section ID

#### `SectionHeader`
Standardized section headers with title, subtitle, and decorative elements.

**Props:**
- `title`: Section heading
- `subtitle`: Optional description text
- `centered`: Text alignment (default: true)
- `animationDelay`: Stagger animation timing

#### `FeatureCard`
Reusable card component for displaying features with icons.

**Props:**
- `icon`: Hero icon component
- `title`: Feature title
- `description`: Feature description
- `color`: Color theme ('deep-blue' | 'muted-green' | 'warm-tan')
- `animationDelay`: Stagger animation timing

#### `StepCard`
Component for step-by-step process visualization.

**Props:**
- `step`: Step number/identifier
- `title`: Step title
- `description`: Step description
- `icon`: Icon component
- `animationDelay`: Stagger animation timing

#### `Button`
Flexible button component with multiple variants and states.

**Props:**
- `variant`: Style variant ('primary' | 'secondary' | 'outline' | 'cta')
- `size`: Size variant ('sm' | 'md' | 'lg')
- `icon`: Optional icon component
- `iconPosition`: Icon placement ('left' | 'right')
- `fullWidth`: Full width button
- `loading`: Loading state with spinner

#### `IconWrapper`
Consistent icon container with theming and sizing.

**Props:**
- `icon`: Icon component to render
- `size`: Size variant ('sm' | 'md' | 'lg' | 'xl')
- `variant`: Style variant ('primary' | 'secondary' | 'feature')
- `className`: Additional CSS classes

## Data Constants

### `FEATURES`
Array of feature objects used in the features section.

### `STEPS` 
Array of step objects used in the process explanation section.

## Utilities

### `scrollToElement(elementId: string)`
Smoothly scrolls to an element by ID with error handling.

### `getStaggerDelay(index: number, maxDelay?: number)`
Generates staggered animation delay classes for list items.

### `combineClasses(...classes)`
Utility for combining CSS classes while filtering out undefined values.

### `debounce(func, wait)`
Performance optimization utility for debouncing function calls.

### `prefersReducedMotion()`
Checks user preference for reduced motion accessibility.

## Professional Practices Implemented

### 1. **TypeScript Integration**
- Comprehensive type definitions in `types/common.ts`
- Proper interface definitions for all component props
- Type-safe prop validation

### 2. **Component Composition**
- Single Responsibility Principle - each component has one clear purpose
- Composable design allowing flexible combinations
- Consistent API patterns across components

### 3. **Performance Optimization**
- Minimal re-renders through proper prop structure
- Efficient animation handling
- Debounced functions for performance-critical operations

### 4. **Accessibility**
- Semantic HTML structure
- ARIA labels where appropriate
- Reduced motion preference support
- Keyboard navigation support

### 5. **Maintainability**
- Clear component organization
- Consistent naming conventions
- Comprehensive documentation
- Separation of data and presentation logic

### 6. **Design System Approach**
- Consistent spacing and sizing scales
- Unified color palette
- Standardized component variants
- Theme-aware components

### 7. **Error Handling**
- Graceful degradation for missing elements
- Safe defaults for optional props
- TypeScript compile-time error prevention

## Usage Patterns

### Basic Section Structure
```tsx
<Section background="gray">
  <SectionHeader
    title="Section Title"
    subtitle="Section description"
  />
  {/* Section content */}
</Section>
```

### Feature Grid
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {FEATURES.map((feature, index) => (
    <FeatureCard
      key={feature.title}
      {...feature}
      animationDelay={(index + 1) as AnimationDelay}
    />
  ))}
</div>
```

### Button Variants
```tsx
<Button variant="primary" size="lg" icon={ArrowRightIcon}>
  Primary Action
</Button>

<Button variant="secondary" loading={isLoading}>
  Secondary Action  
</Button>
```

## File Structure
```
src/
├── components/
│   └── ui/
│       ├── Button.tsx
│       ├── FeatureCard.tsx
│       ├── Hero.tsx
│       ├── IconWrapper.tsx
│       ├── Section.tsx
│       ├── SectionHeader.tsx
│       ├── StepCard.tsx
│       └── index.ts
├── constants/
│   └── homepage.ts
├── types/
│   └── common.ts
└── utils/
    └── common.ts
```

This refactoring transforms the original monolithic page component into a maintainable, reusable component system that follows React and TypeScript best practices.
