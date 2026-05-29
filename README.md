# Chathuranga Kumarasinghe — Personal Portfolio

A premium dark-themed personal portfolio website for a Senior Software Engineer with 11+ years experience.
Built with Vite + React + TypeScript + Tailwind CSS v3 + Framer Motion.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v3 (dark terminal/VS Code aesthetic)
- **Animations:** Framer Motion 12
- **Type Animation:** react-type-animation
- **Icons:** react-icons

## Getting Started

### Prerequisites
- Node.js 18+ installed

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Production build

```bash
npm run build
```

The output will be in the `dist/` folder.

### Preview production build locally

```bash
npm run preview
```

## Customization

### Add your CV / Resume

Place your CV file at `public/cv.pdf`. The "Download CV" button and "Download Full CV / Resume" button in the Contact section will serve this file.

### Replace profile image

The hero section displays gradient initials "CK" as a placeholder. To replace with a real photo:

1. Add your image to `public/profile.jpg` (or any path you prefer)
2. Open `src/components/Hero.tsx`
3. Find the profile circle section and replace the gradient circle with an `<img>` tag:

```tsx
<img
  src="/profile.jpg"
  alt="Chathuranga Kumarasinghe"
  className="w-full h-full rounded-full object-cover"
/>
```

### Update personal info

All content is centralized in `src/data/portfolioData.ts`. Edit:
- `personalInfo` — name, email, phone, links
- `stats` — headline statistics
- `skillCategories` — tech skills grouped by category
- `experiences` — work history
- `projects` — portfolio projects
- `education` — degrees
- `certifications` — professional certifications

### Open Graph image

Place a 1200x630px image at `public/og-image.png` for social media link previews.

## Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel --prod
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments.

### Netlify

```bash
npm run build
# Drag the dist/ folder to netlify.com/drop
```

Or connect via Git at [netlify.com](https://netlify.com).

### GitHub Pages

```bash
npm run build
# Push dist/ contents to the gh-pages branch
```

## Project Structure

```
src/
  components/
    Navigation.tsx      — Sticky glass nav with mobile menu
    Hero.tsx            — Full-screen hero with animations
    About.tsx           — About section with terminal code block
    Skills.tsx          — Skills grid with animated badges
    Experience.tsx      — Animated vertical timeline
    Projects.tsx        — Project cards with terminal header
    Contact.tsx         — Contact links + form
    Footer.tsx          — Footer with quick links
    LoadingScreen.tsx   — Animated terminal loading screen
    ScrollProgress.tsx  — Scroll progress bar
  data/
    portfolioData.ts    — All content data (centralized)
  App.tsx               — Root component
  index.css             — Global styles + Tailwind
```

## License

MIT — feel free to use as a template for your own portfolio.
