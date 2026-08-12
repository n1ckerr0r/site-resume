# LaTeX Resume

This folder contains a standalone LaTeX version of the resume based on the website content.

## Files

- `resume.tex` - main LaTeX source

## Build

From the project root:

```bash
cd resume
xelatex resume.tex
```

This produces `resume.pdf`.

If you want a cleaner rebuild:

```bash
cd resume
rm -f *.aux *.log *.out *.pdf
xelatex resume.tex
```

## Customize

Update the following sections in `resume.tex` when adapting the resume for another person:

- header and contact links
- summary
- experience
- projects
- education
- achievements
- skills

The current template is intentionally simple and ATS-friendly:

- standard `article` class
- no custom LaTeX resume framework
- one-page layout
- text-first structure with clickable links
