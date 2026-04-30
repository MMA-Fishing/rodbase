# RodBase

Brand-first fishing rod database preview.

## Run locally

Open PowerShell in this folder, then run:

```powershell
npm install
npm run dev
```

Then open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

## Project structure

```text
RodBase/
├── src/
│   ├── data/
│   │   ├── brands.js
│   │   ├── rods.js
│   │   ├── useCases.js
│   │   ├── categories.js
│   │   └── articles.js
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Pill.jsx
│   │   ├── StatCard.jsx
│   │   └── RodCard.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── BrandsPage.jsx
│   │   ├── SearchPage.jsx
│   │   ├── ComparePage.jsx
│   │   └── RodPage.jsx
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```
