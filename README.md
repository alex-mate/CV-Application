# CV Application

A responsive, customizable CV builder built with **React** and **Vite** as part of [The Odin Project](https://www.theodinproject.com/). Create a CV with multiple education and work experience entries, customize its appearance, and see changes reflected instantly in a live preview.

**[View source on GitHub](https://github.com/alex-mate/cv-application)**

## Features

- **Live CV preview** — updates as you edit your personal information and manage entries.
- **Personal information** — enter your name, email address, and phone number.
- **Education and experience management** — add, edit, and delete multiple entries.
- **Per-entry visibility** — hide or show individual education and experience entries in the CV preview without deleting them.
- **Collapsible editor sections** — expand Education and Experience only when you need them.
- **Customizable appearance** — choose an accent color, font family, and alignment for the contact header.
- **Load Example** — populate the builder with sample data to explore the interface.
- **Clear All** — reset CV information after a confirmation prompt.
- **Responsive layout** — side-by-side editor and document preview on larger screens, stacked layout on smaller screens.
- **Chronological ordering** — education and experience appear newest first in the preview.

## Built With

- React (functional components, hooks, and props)
- JavaScript (ES6+)
- HTML / JSX
- CSS (Grid, Flexbox, responsive media queries, custom properties)
- Vite

## Getting Started

### Prerequisites

Install a version of Node.js supported by your Vite release and npm.

### Run locally

```bash
git clone https://github.com/alex-mate/cv-application.git
cd cv-application
npm install
npm run dev
```

Open the local URL shown in your terminal (typically `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

The optimized build is generated in `dist/`.

## How to Use

1. Enter your name, email, and phone number in **General Information**.
2. Expand **Education** or **Experience** and add as many entries as you need.
3. Use **Edit**, **Delete**, or **Hide/Show** on individual entries. Hidden entries remain available in the editor.
4. Open **Configuration** to choose a font, accent color, and contact-header alignment.
5. Watch your changes appear in the **CV Preview**. Use **Load Example** to explore the app or **Clear All** to start over.

## Project Structure

```text
src/
├── components/
│   ├── GeneralInfo.jsx     # Personal details form
│   ├── Education.jsx       # Education entry management
│   ├── Experience.jsx      # Work experience entry management
│   └── CVPreview.jsx       # Formatted, read-only CV
├── App.jsx                 # Shared state, toolbar, configuration
├── App.css                 # Layout and component styles
├── index.css               # Global styles
└── main.jsx                # React entry point
```

## Implementation Notes

- **Shared state:** `App.jsx` owns the general information, education, and experience data and passes them down through props.
- **Immutable updates:** entries are added with array spread, updated with `.map()`, and deleted with `.filter()`.
- **Draft editing:** Education and Experience keep a separate draft so **Cancel** discards unsaved edits.
- **Stable IDs:** entries receive IDs generated with `crypto.randomUUID()`.
- **Visibility:** each entry has a `hidden` flag; the preview filters hidden entries without removing them from the editor.
- **Separation of concerns:** `CVPreview.jsx` displays data and configuration but does not own or change CV data.

## Current Limitations & Roadmap

This is a frontend learning project. **CV data is held in React state and is not yet saved between page refreshes.** There is currently no PDF export.

Planned enhancements:

- [ ] Save and restore CV data using `localStorage`
- [ ] Print-friendly layout and PDF export
- [ ] Improve multi-page CV handling
- [ ] Refine accessibility and mobile experience
- [ ] Deploy the finished application to GitHub Pages

## Project Background

Built for **The Odin Project's React CV Application assignment** to practice component composition, props, state management, controlled forms, conditional rendering, and immutable array updates. The project was extended beyond the base assignment with configurable styling, collapsible sections, per-entry visibility controls, and a live document preview.

## Author

Created by [alex-mate](https://github.com/alex-mate).
