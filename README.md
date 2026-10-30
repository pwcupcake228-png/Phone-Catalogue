# Phone Catalogue

A responsive online storefront for browsing Apple phones, tablets, and accessories. Explore product catalogs and details, save favourites, and manage a shopping cart. Supabase powers product data, authentication, reviews, and account-synced favourites.

## Live Preview

[Phone Catalogue Demo](https://pwcupcake228-png.github.io/Phone-Catalogue/)

## Design Reference

[Phone Catalogue (Figma)](https://www.figma.com/design/T5ttF21UnT6RRmCQQaZc6L/Phone-catalog--V2--Original?node-id=0-1&p=f&t=ZJg60vJt3xhXDnQ4-0)

## Technologies Used

**Core**

- React 19 and TypeScript for the interface and application logic
- Vite for development and production builds
- Tailwind CSS 4 and Radix UI Themes for styling and interface components
- React Router for client-side navigation
- Zustand for shared and persisted application state

**Services and UI**

- Supabase for product data, authentication, reviews, and synced favourites
- Embla Carousel for product and promotional carousels
- Motion for interface animations
- Lucide React for icons

## Getting Started

1. Clone the repository and move into the project directory:

   ```bash
   git clone https://github.com/pwcupcake228-png/Phone-Catalogue.git
   cd Phone-Catalogue
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

Vite prints the local URL in the terminal, usually `http://localhost:5173`.

## Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Type-check the project and create a production build
- `npm run preview` - Preview the production build locally
- `npm test` - Run the TypeScript check and ESLint
- `npm run lint` - Run ESLint with automatic fixes
- `npm run format` - Format project files with Prettier

## Features

- **Product catalogs:** Browse phones, tablets, and accessories with product cards, images, prices, and specifications.
- **Search, filtering, and sorting:** Find products by model or capacity, filter catalog results, sort by price, release year, or rating, and navigate results with pagination or load more. Catalog state is reflected in the URL.
- **Product details:** View product galleries, technical specifications, available colors and capacities, and related products.
- **Shopping cart:** Add products, change quantities, remove items, and review cart totals. A checkout form is available from the cart.
- **Favourites:** Save products locally and sync favourites with Supabase when signed in.
- **Accounts and ratings:** Sign in with Supabase authentication, submit product ratings, and view average review scores.
- **Home page:** Explore promotional banners, featured products, categories, and discounted items.
- **Responsive storefront:** Use the catalog, product pages, carousels, and cart across mobile, tablet, and desktop layouts, with light and dark themes.
