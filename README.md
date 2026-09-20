# Ram Ghimire — portfolio

React + Vite site with a home introduction and three top tabs:

- **Resume** opens `public/resume.pdf` in a new tab
- **Blog** at `/blog`
- **Contact** at `/contact`

```bash
npm install
npm run dev
```

## Resume PDF

`public/resume.pdf` is generated from `resume/resume.html`. Edit the HTML, then
reprint it with headless Chrome on macOS:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=public/resume.pdf resume/resume.html
```

Keep it to one page: the layout currently ends about an inch above the bottom
margin.
