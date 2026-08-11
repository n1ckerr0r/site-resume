# Resume Site Template

This project is a static one-page resume website built with plain HTML, CSS, and JavaScript.
It is designed to be easy to reuse as a personal resume template for other developers, designers, or candidates who want a polished landing page without a framework or build step.

The current version includes:

- a single-page resume layout in `index.html`
- a custom visual system in `styles.css`
- GSAP-based motion and interactions in `script.js`
- linting and formatting with HTMLHint, Stylelint, ESLint, and Prettier

## Preview Locally

You can open `index.html` directly in a browser, or run a small local server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Use This Site As a Template

To adapt this project for another resume, update the content in these files:

- `index.html`: name, title, city, experience, projects, education, achievements, and contact links
- `styles.css`: colors, spacing, typography, layout details, and responsive behavior
- `script.js`: GSAP animations, hover effects, scroll reveals, and motion behavior

In practice, most resume-specific work happens in `index.html`.

### What to Replace in `index.html`

Update the following content areas:

- page `<title>` and meta description
- hero section: name, role, location, short summary, CTA links
- about section
- work experience section
- projects section
- technology stack section
- education section
- achievements section
- final contact section

Also replace external links such as:

- GitHub
- Telegram
- email
- phone
- project repository URLs
- competition or award links

### What to Adjust in `styles.css`

Use `styles.css` to make the template feel like a different personal brand:

- change CSS variables in `:root` for colors and theme
- adjust font sizes and spacing
- tune section widths and card styles
- edit responsive rules for mobile layouts
- simplify or expand visual effects depending on the target audience

The quickest way to re-theme the site is usually to change:

- `--bg`
- `--text`
- `--muted`
- `--accent`
- `--accent-2`
- `--accent-3`

### What to Adjust in `script.js`

The JavaScript is optional from a content perspective, but it controls most of the motion design:

- intro loader sequence
- split-text animation
- scroll-triggered reveals
- magnetic hover effect
- 3D tilt effect for cards
- orbit and marquee animations

If you want a simpler template, you can reduce or remove some GSAP effects here.

## Project Structure

```text
.
├── index.html          # Resume page markup
├── styles.css          # Visual system, layout, responsive styles
├── script.js           # GSAP animations and interactions
├── package.json        # Scripts and dev dependencies
├── package-lock.json   # Locked dependency versions
├── eslint.config.js    # ESLint flat config for JavaScript
├── .stylelintrc.json   # Stylelint rules for CSS
├── .htmlhintrc         # HTMLHint rules for HTML
├── .prettierrc.json    # Prettier formatting rules
└── README.md
```

## Install Dependencies

Before running checks, install the dev dependencies:

```bash
npm install
```

## Available Commands

Run all lint checks:

```bash
npm run lint
```

Run checks separately:

```bash
npm run lint:html
npm run lint:css
npm run lint:js
```

Format files:

```bash
npm run format
```

Check formatting without modifying files:

```bash
npm run format:check
```

## Linting and Formatting Setup

This project uses a simple quality toolchain for a static frontend site.

### HTMLHint

HTMLHint validates `index.html`.

Config file:

```text
.htmlhintrc
```

Main responsibilities:

- enforce HTML5 doctype
- require lowercase tags and attributes
- require double quotes in attribute values
- detect duplicate `id` attributes
- catch missing `title`, empty `src`, and unclosed tags

Script:

```json
"lint:html": "htmlhint \"*.html\""
```

If you later split the site into multiple pages, change the glob to something like:

```json
"lint:html": "htmlhint \"**/*.html\""
```

### Stylelint

Stylelint validates `styles.css`.

Config file:

```text
.stylelintrc.json
```

Base config:

```json
"extends": ["stylelint-config-standard"]
```

This gives you:

- CSS syntax validation
- property and selector checks
- consistent formatting-oriented style rules

Some rules are intentionally relaxed so the template remains practical for hand-written CSS:

- `custom-property-pattern`
- `selector-class-pattern`
- `declaration-empty-line-before`
- `no-descending-specificity`
- `color-function-notation`
- `alpha-value-notation`
- `color-hex-length`
- `media-feature-range-notation`

Script:

```json
"lint:css": "stylelint \"*.css\""
```

If the project grows, you can switch to broader patterns such as:

```json
"lint:css": "stylelint \"**/*.css\""
```

### ESLint

ESLint validates `script.js`.

Config file:

```text
eslint.config.js
```

This project uses ESLint 9 flat config and includes:

- `@eslint/js` recommended rules
- browser globals via `globals.browser`
- `gsap` and `ScrollTrigger` as readonly globals
- `ecmaVersion: "latest"`
- `sourceType: "script"`

Custom rules currently enabled:

- `no-console: "warn"`
- `prefer-const: "error"`

Script:

```json
"lint:js": "eslint script.js"
```

If you later move to modules or a bundler, you will likely want to:

- change `sourceType` to `"module"`
- lint more files, for example `src/**/*.js`

### Prettier

Prettier formats HTML, CSS, JS, JSON, and Markdown files.

Config file:

```text
.prettierrc.json
```

It is responsible only for code style, not for correctness.

Current formatting preferences include:

- `printWidth: 100`
- `tabWidth: 2`
- `semi: true`
- `singleQuote: false`
- `trailingComma: "es5"`

Scripts:

```json
"format": "prettier --write \"*.{html,css,js,json,md}\"",
"format:check": "prettier --check \"*.{html,css,js,json,md}\""
```

## Recommended Workflow

For content edits:

1. Update `index.html`
2. Adjust styles in `styles.css` if needed
3. Tweak motion in `script.js` if needed
4. Run `npm run lint`
5. Run `npm run format`

For turning this into a reusable template for multiple resumes, keep the structure stable and only replace content, links, theme tokens, and motion intensity between versions.
