# Project Folder Structure

```text
vehiql/
├── actions
│   ├── admin.js
│   ├── car-listing.js
│   ├── car.js
│   ├── home.js
│   ├── settings.js
│   └── test-drive.js
├── app
│   ├── (admin)
│   │   └── admin
│   │       ├── _components
│   │       │   └── sidebar.js
│   │       ├── cars
│   │       │   ├── _components
│   │       │   │   ├── add-car-form.jsx
│   │       │   │   └── car-list.jsx
│   │       │   ├── create
│   │       │   │   └── page.jsx
│   │       │   └── page.jsx
│   │       ├── settings
│   │       │   ├── _components
│   │       │   │   └── settings-form.jsx
│   │       │   └── page.jsx
│   │       ├── layout.js
│   │       └── page.js
│   ├── (auth)
│   │   ├── sign-in
│   │   │   └── [[...sign-in]]
│   │   │       └── page.jsx
│   │   ├── sign-up
│   │   │   └── [[...sign-up]]
│   │   │       └── page.jsx
│   │   └── layout.jsx
│   ├── (main)
│   │   ├── cars
│   │   │   ├── _components
│   │   │   │   ├── car-filters.jsx
│   │   │   │   ├── car-listing.jsx
│   │   │   │   ├── car-listings-loading.jsx
│   │   │   │   └── filter-controls.jsx
│   │   │   ├── [id]
│   │   │   │   ├── _components
│   │   │   │   │   ├── car-details.jsx
│   │   │   │   │   └── emi-calculator.jsx
│   │   │   │   └── page.jsx
│   │   │   └── page.jsx
│   │   ├── reservations
│   │   │   ├── _components
│   │   │   │   └── reservations-list.jsx
│   │   │   └── page.jsx
│   │   ├── saved-cars
│   │   │   ├── _components
│   │   │   │   └── saved-cars-list.jsx
│   │   │   └── page.jsx
│   │   ├── test-drive
│   │   │   └── [id]
│   │   │       ├── _components
│   │   │       │   └── test-drive-form.jsx
│   │   │       └── page.jsx
│   │   └── layout.js
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   ├── not-found.jsx
│   └── page.jsx
├── components
│   ├── ui
│   │   ├── accordion.jsx
│   │   ├── alert.jsx
│   │   ├── badge.jsx
│   │   ├── button.jsx
│   │   ├── calendar.jsx
│   │   ├── card.jsx
│   │   ├── checkbox.jsx
│   │   ├── dialog.jsx
│   │   ├── dropdown-menu.jsx
│   │   ├── input.jsx
│   │   ├── label.jsx
│   │   ├── pagination.jsx
│   │   ├── popover.jsx
│   │   ├── select.jsx
│   │   ├── sheet.jsx
│   │   ├── skeleton.jsx
│   │   ├── slider.jsx
│   │   ├── sonner.jsx
│   │   ├── table.jsx
│   │   ├── tabs.jsx
│   │   └── textarea.jsx
│   ├── car-card.jsx
│   ├── Header.jsx
│   ├── home-search.jsx
│   └── test-drive-card.jsx
├── hooks
│   └── use-fetch.jsx
├── lib
│   ├── arcjet.js
│   ├── checkUser.js
│   ├── data.js
│   ├── helper.js
│   ├── prisma.js
│   ├── supabase.js
│   └── utils.js
├── prisma
│   ├── migrations
│   │   ├── 20260326073656_create_models
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── public
│   ├── body
│   │   ├── convertible.webp
│   │   ├── hatchback.webp
│   │   ├── sedan.webp
│   │   └── suv.webp
│   ├── make
│   │   ├── bmw.webp
│   │   ├── ford.webp
│   │   ├── honda.webp
│   │   ├── hyundai.webp
│   │   ├── mahindra.webp
│   │   └── tata.webp
│   ├── 1.png
│   ├── 2.webp
│   ├── 3.jpg
│   ├── file.svg
│   ├── globe.svg
│   ├── logo-black.png
│   ├── logo-white.png
│   ├── logo.png
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── .env
├── .env.local
├── .gitignore
├── components.json
├── debug-gemini.js
├── eslint.config.mjs
├── jsconfig.json
├── middleware.js
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── prisma.config.ts
├── README.md
└── temp_tree_gen.js

```
