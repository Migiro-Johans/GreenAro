# Green Arrow SACCO - CSS Style Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Component Classes](#component-classes)
5. [Utility Classes](#utility-classes)
6. [Animations](#animations)
7. [Responsive Design](#responsive-design)
8. [Usage Examples](#usage-examples)

---

## Overview

The Green Arrow SACCO website uses a combination of:
- **Tailwind CSS** - Utility-first framework
- **Custom CSS** - Brand-specific styles
- **CSS Variables** - For theming and consistency

### File Structure
```
client/src/
├── index.css      # Global styles, Tailwind directives, base styles
└── App.css        # App-specific component styles
```

---

## Color System

### Primary Colors
```css
--primary-color: #22c55e;      /* Green - Main brand color */
--primary-dark: #16a34a;       /* Dark Green - Hover states */
--primary-light: #86efac;      /* Light Green - Backgrounds */
--secondary-color: #16a34a;    /* Secondary brand color */
--accent-color: #15803d;       /* Accent color */
```

### Semantic Colors
```css
--success-color: #10b981;      /* Success messages */
--warning-color: #f59e0b;      /* Warnings */
--error-color: #ef4444;        /* Errors */
--info-color: #3b82f6;         /* Information */
```

### Text Colors
```css
--text-primary: #111827;       /* Main text */
--text-secondary: #6b7280;     /* Secondary text */
--text-tertiary: #9ca3af;      /* Tertiary text */
```

### Usage Example
```jsx
// Using Tailwind classes
<button className="bg-primary text-white hover:bg-secondary">
  Apply Now
</button>

// Using CSS variables
<div style={{ color: 'var(--primary-color)' }}>
  Green Arrow SACCO
</div>
```

---

## Typography

### Font Family
**Primary Font:** Inter (Google Fonts)
- Clean, modern, highly legible
- Excellent for financial services

### Heading Scale
```css
h1: text-4xl sm:text-5xl lg:text-6xl
h2: text-3xl sm:text-4xl lg:text-5xl
h3: text-2xl sm:text-3xl lg:text-4xl
h4: text-xl sm:text-2xl lg:text-3xl
h5: text-lg sm:text-xl lg:text-2xl
h6: text-base sm:text-lg lg:text-xl
```

### Usage Example
```jsx
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
  Welcome to Green Arrow
</h1>

<p className="text-lg text-gray-600 leading-relaxed">
  Your trusted financial partner
</p>
```

---

## Component Classes

### Buttons

#### Primary Button
```jsx
<button className="btn btn-primary">
  Get Started
</button>
```
**Result:** Green background, white text, hover effects

#### Secondary Button
```jsx
<button className="btn btn-secondary">
  Learn More
</button>
```
**Result:** White background, green text, green border

#### Outline Button
```jsx
<button className="btn btn-outline">
  Cancel
</button>
```

#### Button Sizes
```jsx
<button className="btn btn-primary btn-lg">Large</button>
<button className="btn btn-primary">Normal</button>
<button className="btn btn-primary btn-sm">Small</button>
```

#### Button with Ripple Effect
```jsx
<button className="btn btn-primary btn-ripple">
  Click Me
</button>
```

---

### Cards

#### Basic Card
```jsx
<div className="card">
  <div className="card-header">
    <h3>Card Title</h3>
  </div>
  <div className="card-body">
    <p>Card content goes here</p>
  </div>
  <div className="card-footer">
    <button>Action</button>
  </div>
</div>
```

#### Product Card with Hover
```jsx
<div className="card product-card">
  <div className="p-6">
    <h3 className="text-2xl font-bold mb-2">Personal Loans</h3>
    <p className="text-gray-600">Up to KES 500,000</p>
  </div>
</div>
```
**Features:**
- Lifts on hover
- Smooth shadow transition
- Green gradient overlay

#### Card with Shimmer Effect
```jsx
<div className="card card-shimmer">
  <div className="p-6">
    <h3>Featured Product</h3>
  </div>
</div>
```

---

### Forms

#### Input Field
```jsx
<div className="form-field">
  <label className="form-label">Your Name</label>
  <input 
    type="text"
    className="form-input"
    placeholder="Enter your name"
  />
  <p className="form-helper">We'll never share your information</p>
</div>
```

#### Input with Error
```jsx
<div className="form-field">
  <label className="form-label">Email</label>
  <input 
    type="email"
    className="form-input border-red-500"
  />
  <p className="form-error">Please enter a valid email</p>
</div>
```

#### Custom Checkbox
```jsx
<input type="checkbox" className="custom-checkbox" />
<label>I agree to terms</label>
```

#### Custom Radio
```jsx
<input type="radio" name="option" className="custom-radio" />
<label>Option 1</label>
```

---

### Badges

```jsx
<span className="badge badge-primary">New</span>
<span className="badge badge-success">Active</span>
<span className="badge badge-warning">Pending</span>
<span className="badge badge-danger">Declined</span>
<span className="badge badge-info">Info</span>
```

---

### Alerts

```jsx
<div className="alert alert-success">
  Successfully submitted!
</div>

<div className="alert alert-warning">
  Please verify your information
</div>

<div className="alert alert-error">
  An error occurred
</div>

<div className="alert alert-info">
  New features available
</div>
```

---

## Utility Classes

### Text Utilities

#### Gradient Text
```jsx
<h1 className="text-gradient">
  Green Arrow SACCO
</h1>
```
**Result:** Green gradient text effect

#### Truncate Text
```jsx
<p className="truncate-2-lines">
  Long text that will be truncated after 2 lines...
</p>

<p className="truncate-3-lines">
  Long text that will be truncated after 3 lines...
</p>
```

---

### Layout Utilities

#### Section Container
```jsx
<section className="section">
  <div className="container-custom">
    <div className="section-header">
      <h2 className="section-title">Our Services</h2>
      <p className="section-subtitle">Comprehensive financial solutions</p>
    </div>
    {/* Content */}
  </div>
</section>
```

#### Glass Effect
```jsx
<div className="glass-effect p-6 rounded-xl">
  Modern glass morphism design
</div>
```

---

### Hover Effects

#### Lift on Hover
```jsx
<div className="hover-lift card">
  <p>This card lifts on hover</p>
</div>
```

#### Glow on Hover
```jsx
<div className="hover-glow card">
  <p>This card glows on hover</p>
</div>
```

---

### Animation Classes

#### Fade In
```jsx
<div className="animate-fade-in">
  Content fades in
</div>
```

#### Slide Up
```jsx
<div className="animate-slide-up">
  Content slides up from bottom
</div>
```

#### Slide Down
```jsx
<div className="animate-slide-down">
  Content slides down from top
</div>
```

#### Scale In
```jsx
<div className="animate-scale-in">
  Content scales in
</div>
```

---

### Loading States

#### Spinner
```jsx
<div className="loading-spinner"></div>
```

#### Loading Dots
```jsx
<div className="loading-dots">
  <span></span>
  <span></span>
  <span></span>
</div>
```

#### Skeleton Loader
```jsx
<div className="skeleton" style={{ height: '200px' }}></div>
<div className="skeleton-text"></div>
<div className="skeleton-text"></div>
<div className="skeleton-circle" style={{ width: '50px', height: '50px' }}></div>
```

---

## Animations

### Chatbot Float
```jsx
<div className="chatbot-bubble">
  <MessageCircle />
</div>
```
**Effect:** Gentle floating animation

### Message Slide In
```jsx
<div className="chatbot-message">
  Message content
</div>
```
**Effect:** Slides in from bottom

### Button Ripple
```jsx
<button className="btn-ripple">
  Click Me
</button>
```
**Effect:** Ripple effect on click

### Timeline Animation
```jsx
<div className="timeline-item">
  <div className="w-20 h-20 bg-primary rounded-full">
    <span>2010</span>
  </div>
  <p>Company founded</p>
</div>
```
**Effect:** Vertical line connecting items

---

## Responsive Design

### Breakpoints
```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

### Mobile-First Approach
```jsx
<div className="text-sm sm:text-base md:text-lg lg:text-xl">
  Responsive text
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Grid items */}
</div>
```

### Hide/Show Elements
```jsx
<div className="mobile-only">
  Visible only on mobile
</div>

<div className="mobile-hide">
  Hidden on mobile
</div>

<div className="hidden md:block">
  Visible from medium screens up
</div>
```

---

## Usage Examples

### Hero Section
```jsx
<section className="hero-section py-20">
  <div className="container-custom">
    <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
      Your Journey to Financial Freedom
    </h1>
    <p className="text-xl text-gray-600 mb-8 animate-slide-up">
      Join thousands of satisfied members
    </p>
    <button className="btn btn-primary btn-lg btn-ripple">
      Get Started Today
    </button>
  </div>
</section>
```

### Feature Card
```jsx
<div className="card hover-lift hover-glow">
  <div className="p-6">
    <div className="icon-container-lg mb-4">
      <TrendingUp className="w-12 h-12 text-primary" />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">
      Competitive Rates
    </h3>
    <p className="text-gray-600">
      Get the best interest rates on loans and savings
    </p>
  </div>
</div>
```

### Product Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {products.map(product => (
    <div key={product.id} className="card product-card">
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <button className="btn btn-primary w-full">
          Learn More
        </button>
      </div>
    </div>
  ))}
</div>
```

### Stats Section
```jsx
<section className="section bg-white">
  <div className="container-custom">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div className="text-center">
        <div className="stat-number text-4xl font-bold mb-2">
          10,000+
        </div>
        <div className="text-gray-600">Happy Members</div>
      </div>
      {/* More stats */}
    </div>
  </div>
</section>
```

### Form with Validation
```jsx
<form className="space-y-6">
  <div className="form-field">
    <label className="form-label">Email Address</label>
    <input
      type="email"
      className="form-input focus-ring"
      placeholder="you@example.com"
      required
    />
  </div>
  
  <div className="form-field">
    <label className="form-label">Message</label>
    <textarea
      className="form-input"
      rows="5"
      required
    ></textarea>
  </div>
  
  <button type="submit" className="btn btn-primary w-full">
    Send Message
  </button>
</form>
```

---

## Accessibility Features

### Focus Styles
All interactive elements have visible focus indicators:
```css
:focus-visible {
  outline: 3px solid #22c55e;
  outline-offset: 3px;
}
```

### Screen Reader Only
```jsx
<span className="sr-only">
  Screen reader only text
</span>
```

### Reduced Motion
Respects user's motion preferences:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### High Contrast Mode
Enhanced borders for better visibility:
```css
@media (prefers-contrast: high) {
  .btn-primary {
    border: 2px solid currentColor;
  }
}
```

---

## Best Practices

### 1. **Use Semantic HTML**
```jsx
// ✅ Good
<button className="btn btn-primary">Submit</button>

// ❌ Avoid
<div className="btn btn-primary" onClick={...}>Submit</div>
```

### 2. **Maintain Consistency**
Use predefined classes rather than inline styles:
```jsx
// ✅ Good
<p className="text-gray-600 leading-relaxed">Text</p>

// ❌ Avoid
<p style={{ color: '#6b7280', lineHeight: 1.625 }}>Text</p>
```

### 3. **Responsive First**
Always consider mobile users:
```jsx
// ✅ Good
<div className="px-4 sm:px-6 lg:px-8">

// ❌ Avoid
<div className="px-8">
```

### 4. **Optimize Performance**
```jsx
// ✅ Use transitions sparingly
<div className="transition-transform hover:-translate-y-1">

// ❌ Avoid excessive animations
<div className="transition-all duration-1000 ease-in-out">
```

### 5. **Accessibility First**
```jsx
// ✅ Include focus states
<button className="focus-ring">

// ✅ Provide alt text
<img src="..." alt="Descriptive text" />

// ✅ Use semantic HTML
<nav>, <main>, <footer>
```

---

## Testing Your Styles

### Browser Testing
Test on:
- Chrome
- Firefox
- Safari
- Edge

### Device Testing
- Mobile (320px - 640px)
- Tablet (641px - 1024px)
- Desktop (1025px+)

### Accessibility Testing
- Keyboard navigation
- Screen reader compatibility
- Color contrast (WCAG AA)

---

## Troubleshooting

### Styles Not Applying?
1. Check Tailwind config
2. Clear cache: `npm run build`
3. Verify class names (no typos)
4. Check CSS specificity

### Animation Not Working?
1. Check `prefers-reduced-motion` setting
2. Verify animation class is applied
3. Check browser compatibility

### Responsive Issues?
1. Use browser dev tools
2. Test actual devices
3. Check breakpoint syntax
4. Verify mobile-first approach

---

## Resources

- **Tailwind Documentation:** https://tailwindcss.com/docs
- **Color Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **CSS Tricks:** https://css-tricks.com/
- **MDN Web Docs:** https://developer.mozilla.org/

---

**Last Updated:** November 4, 2025  
**Version:** 1.0.0  
**Maintained by:** Green Arrow Development Team
