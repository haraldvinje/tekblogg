## Install

You will need [Node](https://nodejs.org/en/download/package-manager/) and [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) to run this web app.
You need [tsc](https://www.npmjs.com/package/typescript) globally (`npm install -g typescript`) if you are pushing to a remote git repo, since [husky](https://typicode.github.io/husky/#/) runs a git pre-push hook that uses `tsc`.

Install dependcies with:

```bash
yarn
```

## Develop

Run a development server with:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy

Automatic deployment from changes in `master` on [GitHub](https://github.com/) can easliy be added by connecting your GitHub account and repo to [Vercel](https://vercel.com/). Small hobby projects are free to host. Sign up to Vercel [here](https://vercel.com/signup).
