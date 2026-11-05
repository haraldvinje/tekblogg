# TekBlogg

<a href="https://www.tekblogg.dev/" target="_blank">TekBlogg</a> is a blog about technology and programming. The source code for the website is located in the `tekblogg-web` directory. The code used for the CMS (<a href="https://www.sanity.io/" target="_blank">Sanity</a>) is located in the `tekblogg-cms` directory.

## Development

This is a pnpm workspace. With the Node.js and pnpm versions from `.tool-versions` installed (e.g. `asdf install`):

```bash
pnpm install                         # installs both packages
pnpm --filter tekblogg-web dev       # the website
pnpm --filter tekblogg-cms dev       # the Sanity Studio
pnpm verify                          # format check, lint, tests and builds for both
```
