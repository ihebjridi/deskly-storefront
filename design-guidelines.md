# BR Store Design System Guidelines

## Overview
This design system captures the clean, modern aesthetic of the BR store interface - a contemporary e-commerce platform with emphasis on minimalism, excellent typography, and sophisticated user experience.

## Typography

### Primary Font: Satoshi
- **Font Family**: Satoshi (modern geometric sans-serif)
- **Character Set**: Full Latin alphabet support (Aa-Zz, 0-9)
- **Usage**: All headings, body text, and UI elements
- **Fallbacks**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

### Typography Scale
```css
/* Headers */
h1: 48px, font-weight: 700, line-height: 1.2
h2: 32px, font-weight: 600, line-height: 1.3  
h3: 24px, font-weight: 600, line-height: 1.4
h4: 20px, font-weight: 600, line-height: 1.4

/* Body Text */
Body Large: 18px, font-weight: 400, line-height: 1.6
Body Regular: 16px, font-weight: 400, line-height: 1.5
Body Small: 14px, font-weight: 400, line-height: 1.4
Caption: 12px, font-weight: 400, line-height: 1.3

/* Prices */
Price Large: 32px, font-weight: 700, color: #010101
Price Small: 18px, font-weight: 600, color: #010101
```

## Color Palette

### Core Colors
- **Primary Black**: #010101 (text, buttons, key elements)
- **Light Gray**: #f2f0ea (backgrounds, subtle dividers)  
- **Accent Yellow**: #edcf5d (highlights, CTAs, ratings)
- **Medium Gray**: #a4a404 (secondary text, inactive states)

### Extended Palette
```css
/* Grays */
--gray-50: #f9f9f9
--gray-100: #f2f0ea  
--gray-200: #e5e5e5
--gray-300: #d4d4d4
--gray-400: #a3a3a3
--gray-500: #737373
--gray-600: #525252
--gray-900: #010101

/* Accent Colors */
--yellow-400: #edcf5d
--yellow-500: #d4af37

/* Status Colors */
--success: #22c55e
--warning: #f59e0b  
--error: #ef4444
--info: #3b82f6
```

## Layout & Spacing

### Grid System
- **Container Max Width**: 1200px
- **Grid Columns**: 12-column system
- **Gutters**: 24px between columns
- **Breakpoints**:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px  
  - Desktop: 1024px+

### Spacing Scale
```css
/* Use 8px base unit system */
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
```

### Common Spacing Applications
- **Card Padding**: 24px
- **Section Margins**: 48px vertical
- **Element Spacing**: 16px between related elements
- **Button Padding**: 12px vertical, 24px horizontal
- **Input Padding**: 12px vertical, 16px horizontal

## Border Radius

### Radius Scale
```css
--radius-sm: 4px    /* Small elements, tags */
--radius-md: 8px    /* Buttons, inputs, cards */
--radius-lg: 12px   /* Large cards, modals */
--radius-xl: 16px   /* Hero sections, major containers */
--radius-2xl: 24px  /* Special cases */
--radius-full: 9999px /* Pills, circular elements */
```

### Usage Guidelines
- **Buttons**: 8px border-radius
- **Input Fields**: 8px border-radius
- **Product Cards**: 12px border-radius
- **Images**: 8px border-radius (maintain consistency)
- **Size Selectors**: 8px border-radius (or 4px for smaller)

## Component Specifications

### Buttons
```css
/* Primary Button */
background: #010101
color: white
padding: 12px 24px
border-radius: 8px
font-weight: 600
font-size: 16px
transition: all 0.2s ease

/* Secondary Button */
background: transparent
border: 1px solid #010101  
color: #010101
padding: 11px 23px /* Account for border */

/* Button States */
hover: opacity 0.9, slight scale(1.02)
active: opacity 0.8
disabled: opacity 0.5, cursor not-allowed
```

### Product Cards
```css
background: white
border-radius: 12px
padding: 16px
box-shadow: 0 1px 3px rgba(0,0,0,0.1)
transition: all 0.3s ease

/* Hover State */
hover: box-shadow: 0 8px 25px rgba(0,0,0,0.15), transform: translateY(-2px)
```

### Form Elements
```css
/* Input Fields */
border: 1px solid #d4d4d4
border-radius: 8px
padding: 12px 16px
font-size: 16px
transition: border-color 0.2s ease

/* Focus State */
focus: border-color: #010101, outline: none

/* Size Selector Buttons */
min-width: 48px
height: 48px
border: 1px solid #d4d4d4
background: white
border-radius: 8px

/* Selected State */
selected: background: #010101, color: white
```

### Navigation
```css
/* Top Navigation */
background: white
border-bottom: 1px solid #f2f0ea
padding: 16px 0
position: sticky, top: 0, z-index: 100

/* Nav Links */
font-size: 16px
font-weight: 500
color: #010101
padding: 8px 16px
transition: color 0.2s ease

/* Active/Hover State */
color: #edcf5d or background: rgba(237,207,93,0.1)
```

## Interactive States & Animations

### Hover Effects
- **Scale Transform**: `transform: scale(1.02)` for buttons
- **Shadow Elevation**: Increase box-shadow on cards
- **Color Transitions**: 0.2s ease for color changes
- **Opacity**: Reduce to 0.9 for subtle hover feedback

### Transitions
```css
/* Standard Transition */
transition: all 0.2s ease

/* Card Hover */
transition: all 0.3s ease

/* Button Press */
transition: all 0.1s ease
```

### Loading States
- Use subtle skeleton screens with `#f2f0ea` background
- Pulse animation: `animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`

## Rating & Review System

### Star Ratings
- **Active Stars**: #edcf5d (yellow)
- **Inactive Stars**: #d4d4d4 (light gray)  
- **Size**: 16px for small, 20px for large
- **Spacing**: 2px between stars

### Review Bars
```css
background: #f2f0ea
height: 8px
border-radius: 4px

/* Fill Color */
background: #edcf5d
```

## Image Guidelines

### Product Images
- **Aspect Ratio**: 1:1 (square) for grid views
- **Background**: Pure white (#ffffff) or transparent
- **Border Radius**: 8px consistent across all product images
- **Loading**: Use placeholder with brand colors

### Image Optimization
- **Format**: WebP with JPG fallback
- **Compression**: 80-85% quality
- **Responsive**: Multiple sizes for different viewports

## Accessibility Considerations

### Color Contrast
- **Text on White**: Minimum 4.5:1 ratio (our black #010101 passes)
- **Interactive Elements**: Minimum 3:1 ratio
- **Focus Indicators**: High contrast outline, 2px minimum

### Interactive Elements  
- **Minimum Touch Target**: 44px × 44px
- **Focus Management**: Clear focus indicators
- **Keyboard Navigation**: All interactive elements accessible

## Implementation Notes for AI Assistant

When applying these guidelines to your Medusa storefront:

### Priority Order
1. **Typography**: Implement Satoshi font family first - this has the biggest visual impact
2. **Color System**: Apply the 4-color palette systematically
3. **Spacing**: Use the 8px-based spacing system consistently  
4. **Border Radius**: Apply consistent rounding (8px standard)
5. **Component Styling**: Focus on buttons, cards, and form elements
6. **Interactive States**: Add hover effects and transitions

### Key Design Principles
- **Minimalism**: Clean, uncluttered interfaces with plenty of white space
- **Consistency**: Consistent spacing, typography, and interaction patterns
- **Modern Feel**: Contemporary design with subtle shadows and smooth transitions
- **User-Friendly**: Clear hierarchy, readable text, and intuitive interactions

### Aesthetic Description
The BR design system embodies modern e-commerce sophistication with:
- Clean geometric typography (Satoshi font)
- Restrained color palette emphasizing blacks, whites, and warm yellows
- Generous white space and consistent 8px-based spacing
- Subtle shadows and smooth micro-interactions
- Contemporary card-based layouts with gentle rounded corners
- Professional product photography with clean backgrounds
- Intuitive navigation with clear visual hierarchy

This creates a premium, trustworthy shopping experience that feels both contemporary and timeless.