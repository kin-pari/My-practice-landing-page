# Sakha - Digital Companion Landing Page

A warm, trust-building landing page for **Sakha** (meaning friend/companion in Hindi) - a digital companion platform specifically designed for Indian seniors aged 60+.

## 🌟 Features

- **13 Complete Sections**: Header, Hero, Problem, Solution, How It Works, Features, Testimonials, Social Proof, Families, Pricing, FAQ, CTA, and Footer
- **Warm Color Palette**: Orange (#FF6B35), saffron, cream, and warm whites - culturally resonant Indian colors
- **Large, Readable Fonts**: Minimum 18px body text for senior-friendly readability
- **Fully Responsive**: Mobile-first design optimized for all devices
- **Accessibility**: WCAG 2.1 AA compliant with proper focus states and skip links
- **Bilingual Support**: English + Hindi transliterations throughout
- **Interactive Elements**: Smooth scrolling, accordions, form validation, WhatsApp share
- **Indian Phone Validation**: Automatic formatting and validation for Indian phone numbers
- **Click-to-Call**: Direct phone number links for easy contact
- **WhatsApp Integration**: Share button for easy sharing on WhatsApp

## 🎨 Design Principles

- **Visual Design**: Warm colors, high contrast, generous white space, soft shadows, rounded corners
- **Trust & Credibility**: Testimonials, security badges, social proof, professional but warm tone
- **Simplicity**: Clear linear journey, one primary CTA per section, simple language
- **Cultural Context**: Family-focused messaging, multilingual support, culturally relevant examples

## 📁 File Structure

```
My-practice-landing-page/
├── index.html      # Main HTML structure with all 13 sections
├── styles.css      # Complete styling with warm color palette
├── script.js       # Interactive functionality and form validation
└── README.md       # Project documentation
```

## 🚀 Getting Started

1. Open `index.html` in a web browser
2. No build process required - works directly in the browser
3. All assets are self-contained (using emoji icons and placeholder images)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (single column, stacked layout)
- **Tablet**: 768px - 967px (2-column grids)
- **Desktop**: > 968px (full multi-column layouts)

## ✨ Key Features Implemented

### Navigation
- Sticky header with smooth scroll
- Mobile hamburger menu
- Bilingual tagline

### Hero Section
- Large, readable headline with Hindi translation
- Dual CTAs (Primary + Secondary)
- Trust badges

### Interactive Elements
- Expandable accordions for Features and FAQ
- Smooth scroll navigation
- Form validation with Indian phone format
- WhatsApp share functionality
- Click-to-call buttons

### Form Features
- Indian phone number validation (+91 format)
- Auto-formatting as user types
- Required field validation
- Success message on submission

### Accessibility
- Skip to main content link
- Proper ARIA labels on accordions
- Focus states on all interactive elements
- High contrast colors
- Large touch targets

## 🎯 Target Audience

- **Primary**: Indian seniors (60-80 years old)
- **Secondary**: Adult children (35-55 years old) who are decision-makers

## 📊 Performance Optimizations

- Lazy loading ready (for future image implementation)
- Debounced scroll events
- CSS transitions for smooth animations
- Minimal JavaScript footprint
- Fast loading (< 3 seconds target)

## 🔧 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --color-primary: #FF6B35;
    --color-saffron: #FF9933;
    --color-cream: #FFF8F0;
    /* ... */
}
```

### Content
All content is in `index.html` - easily editable sections with clear structure.

### Phone Number
Update phone numbers in:
- Header CTA
- CTA section
- Footer (if needed)

## 📝 Notes

- Images are currently placeholder divs with emoji icons - replace with actual photos of Indian seniors
- Form submission currently shows success message - integrate with your backend API
- WhatsApp share uses current page URL - customize message as needed
- All testimonials are example content - replace with real testimonials

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This is a practice project. Customize and use as needed.

---

**Built with ❤️ for Indian seniors and their families**
