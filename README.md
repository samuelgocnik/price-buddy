This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Firstly, install `bun`:

```bash
npm install -g bun
```

Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Folder structure

Preferred folder structure we should stick to:

- `src`
  - `app`
    - `(app)` - defined pages, route groups etc.
    - `api` - api related stuff, routes
  - `components`
    - `ui` - generally used components (button, dialog, input etc.) (mostly [shadcn](https://ui.shadcn.com/docs/components) - please check the link for example usage)
    - `component1.tsx`
    - `component2.tsx`
    - `feature` - folder grouping components for some feature
  - `lib` - useful functions
    - `hooks` - hooks used across the app
      - `use-toast.tsx`
    - `feature.ts` - functions related to some feature
  - `queries` - tanstack queries (one query/mutation === one file)
    - `expenses` - folder grouping all queries for some feature
      - `useGetExpenses.ts`
      - `usePatchExpenses.ts`
  - `store` - contexts folder
    - `auth-context.tsx`
  - `schema`
    - `auth.ts` - all schemas for some feature (eg. loginSchema, registerSchema)
    - `feature.ts`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
