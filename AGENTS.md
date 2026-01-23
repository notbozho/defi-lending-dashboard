## Commands

```bash
npm run dev # to start the development server
npm run build # to build the project for production
npm run lint # to lint the codebase
```

## Code Style Guidelines

## Dependencies

- You _must_ use aave-sdk to interact with Aave protocol
- You _must_ use wagmi or viem to interact with other than aave on-chain data
- You _must_ use tanstack/react-query for data fetching and caching

### TypeScript

- **Type imports**: Use `import type` for type-only imports
- **Props pattern**: Use namespace declarations for component props:

```typescript
export function MyComponent(props: MyComponent.Props): React.JSX.Element {
  // ...
}

export declare namespace MyComponent {
  type Props = {
    value: string;
    optional?: string | undefined;
  };
}
```

### React Components

- Function components only (no classes)
- Explicit return type `React.JSX.Element`
- Use `cn()` helper for conditional classNames (from `@lib/utils`)
- Icons from `react-icons` (tabler-icons or FontAwesome preferred)

### Tailwind CSS

- Use Tailwind v4 syntax
- Custom variants: `@custom-variant`, `@theme`
- Prefer utility classes over custom CSS

### Fetching Data

- Use the already established architecture of fetchers, mappers and hooks.
- Use `react-query` for caching and state management of fetched data.
- Use examples from existing hooks, mappers and fetchers as reference.

## Making Changes to an Application

### Before Starting Any Code Changes:

- [ ] Understand which files you're modifying
- [ ] Check existing patterns in similar files
- [ ] Identify affected tests

### After Completing Code Changes (BEFORE declaring "done"):

- [ ] Run `npm run lint` from repo root
- [ ] Run `npm run check` from repo root
- [ ] List all errors found
- [ ] Fix ALL auto-fixable lint errors via `npm run lint -- --fix`
- [ ] For TypeScript errors, investigate, identify the type issues
- [ ] Report summay of type issues
- [ ] Run tests: `npm test`
- [ ] Only THEN declare task complete IF no errors remain

### Before Any Commit:

- [ ] All above checks must pass
- [ ] All related tests must pass
- [ ] No outstanding type or lint errors
- [ ] No console.log statements left (except in tests)

### Guardrails:

- [ ] Do not modify tsconfig.json to suppress errors
- [ ] Do not add `// @ts-ignore` comments to suppress errors
- [ ] Report all issues found before attempting fixes

## Library Documentation

You can find the documentation for common libraries at the following links:

- [TanStack Table](https://context7.com/websites/tanstack_table/llms.txt?tokens=1000000)
- [TanStack Query](https://context7.com/websites/tanstack_query/llms.txt?tokens=1000000)
- [React](https://context7.com/websites/react_dev/llms.txt?tokens=1000000)
- [Next.js](https://context7.com/websites/nextjs/llms.txt?tokens=1000000)
- [Tailwind CSS v4](https://context7.com/websites/tailwindcss/llms.txt?tokens=1000000)
- [Wagmi React reference](https://context7.com/websites/wagmi_sh_react/llms.txt?tokens=1000000)
- [Viem general reference](https://viem.sh/llms.txt)
- [Aave SDK](https://context7.com/aave/aave-sdk/llms.txt?tokens=10000)
