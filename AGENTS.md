# Coding rules

These apply to every change in this repo, by any agent or human.

<!-- BEGIN:shared-rules -->
<!-- Identical in every haraldvinje app repo (virtual-rowing-norway, rowing-calculator, resume-pro, vintech, tekblogg). Change it in all of them or none. -->

## Before calling anything done

Run `pnpm verify` (format check, lint incl. `tsc --noEmit`, unit tests,
build), plus any extra check the repo-specific sections below list. Don't
consider work finished until they pass.

## Style

- Formatting and lint rules (Prettier + ESLint) are non-negotiable. Never
  disable a rule to get past it -- fix the underlying issue. If a rule is
  genuinely wrong for this codebase, change the rule in `eslint.config.mjs`
  and say so, don't suppress it inline.
- When the linter flags something as unused or dead, delete it. Don't
  silence the warning and don't leave it "just in case." `pnpm lint` fails
  on warnings too.
- Comments explain _why_, never _what_ -- if a comment just restates what
  the code already says, delete the comment. Reserve them for non-obvious
  constraints, workarounds, or invariants a reader couldn't infer from the
  code itself.
- Keep files and components small and single-purpose. If a component is
  doing more than one job (e.g. fetching data _and_ rendering a form _and_
  handling three unrelated interactions), split it. There's no line-count
  threshold -- use judgment, but "I can't describe this file in one
  sentence" is a signal to split it.
- No premature abstraction. Don't build a generic version of something for
  a single caller. Three similar lines beat a speculative helper.

## Accessibility

`eslint-plugin-jsx-a11y` (recommended config) is wired into
`eslint.config.mjs` and catches the mechanical stuff (missing `alt`,
unlabeled inputs, invalid ARIA, non-interactive elements with click
handlers, etc.) -- lint failures here are treated the same as any other
lint failure, not warnings to route around. Beyond what the linter catches,
use judgment: semantic HTML over `<div>` soup, visible focus states, and
keyboard-operability for anything interactive.

## Testing

- Unit tests live next to the code they test (`*.test.ts` beside the
  source file), run via `pnpm test` (Vitest).

## Commits and PRs

- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)
  (`feat:`, `fix:`, `docs:`, `test:`, `chore:`, ...) -- enforced by
  commitlint on the `commit-msg` hook, so a malformed message fails locally
  before it fails in CI.
- Keep commits small and single-purpose -- one logical change per commit,
  not a squash of everything done in a session. If a change touches
  several unrelated concerns (e.g. a security fix and an unrelated
  refactor), split it into separate commits.
- Small fixes and typical incremental work can go straight to `master`.
  For anything medium/large -- a new feature, a behavior change affecting
  more than a couple of files, anything touching security rules, auth or
  deploy workflows -- open a PR instead of pushing directly, so there's a
  review point before it lands.

## Dependencies

- pnpm only. `.tool-versions` pins Node and pnpm; `packageManager` and
  `engines.node` in `package.json` match it, and Vercel builds with the
  `engines.node` major. Change all three together.
- Renovate groups every minor/patch update into one PR and automerges it
  once CI passes, after a 3-day release age. Majors get their own PR and
  wait for a human.
- Security fixes for transitive dependencies go in `overrides` in
  `pnpm-workspace.yaml`, scoped by version range to the vulnerable versions
  and staying within the same major (e.g. `pkg@<1.2.3: ^1.2.3`). Drop each
  once `pnpm audit` passes without it. Renovate deliberately ignores these
  entries.

## Secrets

- Never commit a secret. Local secrets go in `.env.local` (gitignored);
  production and preview values live in the Vercel project's environment
  variables, never in a committed `.env*` file.
- Prefer no stored credential over a stored one where the platform supports
  it. Where a static key is unavoidable, scope it to the minimum role it
  actually needs -- never `Editor`/`Owner`.

<!-- END:shared-rules -->

# This repo

## Layout

A pnpm workspace with two packages: `tekblogg-web` (the Next.js site) and
`tekblogg-cms` (the Sanity Studio). Tooling (Prettier, husky, commitlint,
lint-staged) and the single lockfile live at the root; run `pnpm verify`
from the root. `tekblogg-cms` uses Sanity's own ESLint config instead of
the shared Next.js one, since it isn't a Next.js app.

## Deploys

Deploys are manual and explicit, never automatic on push. The web app's
`vercel.json` disables Vercel's git-integration auto-deploy.
`.github/workflows/deploy-web.yml` (Vercel) and `deploy-cms.yml` (Sanity)
only run on `workflow_dispatch`, restricted to `master`, and both run
`pnpm verify` first.
