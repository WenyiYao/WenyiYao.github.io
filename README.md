# WenyiYao.github.io

Personal academic homepage built with the [al-folio](https://github.com/alshedivat/al-folio) theme.

- **Live site**: `https://wenyiyao.github.io`

## Content locations

- **About (home)**: `_pages/about.md`
- **CV**: `_pages/cv.md` (page settings), `_data/cv.yml` (resume content, RenderCV format)
- **Publications**: `_pages/publications.md` + `_bibliography/papers.bib`
- **News (home page news list)**: `_news/*.md`
- **Social links (email / LinkedIn, etc.)**: `_data/socials.yml`

## Local preview

This repository is a Jekyll site. Docker is recommended (least setup), or use Ruby locally.

### Docker (recommended)

```bash
docker compose pull
docker compose up
```

The site runs at `http://localhost:8080`.

### Local Ruby (optional)

```bash
bundle install
bundle exec jekyll serve
```

## Troubleshooting

- **GitHub Actions / CI reports invalid YAML in `cv.yml`**: Check indentation (list items `-` must be nested correctly), spaces after colons, and quote strings that contain special characters.
- **BibTeX parse errors (e.g. failing on `selected`)**: Usually a missing comma between fields (e.g. `doi={...},`).

## Theme docs

For more theme configuration and features, see:

- `CUSTOMIZE.md`
- `INSTALL.md`
