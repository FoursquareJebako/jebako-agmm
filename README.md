# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Database Configuration
> **⚠ Sensitive information: <br>
> Delete this section before this repo becomes public.**

This project requires a Supabase instance to be fully functional and hosting is done on Netlify.
- Add .env config on Netlify with the Supabase db URL and key
- Create a local .env file at root, containing Supabase db URL and key, for local development
- This project uses one database with two tables - 'members' and 'voters'
- members schema - id (unique password), name, sex, address, email, phone, dept
- voters schema - id (unique password), candidates, timestamp.
- Set true for RLS policy for the database operations

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
