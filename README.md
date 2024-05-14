## Production app link:
[price-buddy-two.vercel.app](https://price-buddy-two.vercel.app)

## Getting Started

Firstly, install `bun`:

```bash
npm install -g bun
```

Install packages:

```bash
bun i
```

Pull development environment variables:
```bash
bunx dotenv-vault pull development 
```
to pull production environment variables run:
```bash
bunx dotenv-vault pull production 
```

Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Database
Run database locally (in wsl):

```bash
bun db:locally
```

Access drizzle studio locally:

```bash
bun db:studio
```

Push changes to database server:

```bash
bun db:push
```
## Auth
For our authentication system, we have chosen to utilize GitHub's OAuth provider. This decision is guided by the recommendations from Auth.js, which advocates for OAuth due to its robust and well-tested functionalities. By leveraging these pre-built solutions, we can avoid reinventing the wheel and ensure a secure, reliable authentication process. 

For more information, please refer to the Auth.js [getting started guide on authentication](https://authjs.dev/getting-started/authentication).

## Branch and commit naming

### Branch naming

In this project, we follow a branch naming convention to keep things organized:

1. All branch names should be in lowercase.
2. Use forward slashes to separate the branch type from its description.
3. The name should start with the branch type (e.g., `feat`, `fix`).
4. After the type, add a short description of the branch's purpose (e.g., `feat/user-authentication`, `fix/button-color`).

### Commit naming

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages. Here are the key rules:

1. The commit message should be structured as `<type>[optional scope]: <description>`
2. `<type>` is one of the following: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
3. `<optional scope>` can be anything specifying the place of the commit change.
4. `<description>` is a short description of the changes.
5. If the change introduces a breaking change, it should be noted as `BREAKING CHANGE:` in the footer or `!` after the type/scope.

Here are some examples of commit messages: (scope is optional)

- A new feature commit: `feat(user-auth): add login functionality`
- A bug fix commit: `fix(button-color): correct the primary button color`
- A commit for code style updates: `style(login-form): fix indentation`

Remember, these conventions aim to make the version control process smoother and the project easier to manage.

## Folder structure

Preferred folder structure we should stick to:

- `src`
  - `app`
    - `(app)` - defined pages, route groups etc.
  - `components`
    - `ui` - generally used components (button, dialog, input etc.) (mostly [shadcn](https://ui.shadcn.com/docs/components) - please check the link for example usage)
    - `component1.tsx`
    - `component2.tsx`
    - `feature` - folder grouping components for some feature
  - `lib` - useful functions
    - `hooks` - hooks used across the app
      - `use-toast.tsx`
    - `feature.ts` - functions related to some feature
  - `mutations` - tanstack queries/mutations (one query/mutation === one file)
    - `features.ts` - file grouping all mutations for some feature
  - `schema`
    - `feature.ts` - all schemas for some feature (eg. loginSchema, registerSchema)
    - `user.ts`
  - `server-actions`
    - `feature.ts` - file grouping all server actions for some feature

## App routes

**(unauthorized)**

- /signin

**(authorized)**

- /dashboard - first page, summary info, (statistics??) recent groups, recent transaction etc.
- /group - all users groups, filter groups, create group, invitation by email
- /group/[id] - group detail, members, expenses (filterable by category or payer)
- /profile - user info (edit)
- /balances - all expenses among two(or more) people
- /expenses - user recent expenses

## Entity Relationship Diagram

- in case you will edit the ERD file during the database initialisation (or for other reasons), don't forget to generate a new `png` using the following command:

```bash
plantuml erd.plantuml
```

![Entity Relationship Diagram](diagrams/erd/erd.png)
