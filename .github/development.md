# Development Guide

## 🏠 Use node version

Ensure you are on the right version of NodeJS. To see the active version, check [the .nvmrc file](../docs/.nvmrc).

```
nvm use
```

## 🏃 Running the project

To run the project, run:

```sh
pnpm dev
```

**On the first run** you also need to run the asset manager:

```sh
pnpm build:assets
```

**This also needs to be reran if you modify/add assets that are managed by the assets manager**

## 🏗️ Building the project

To build the project, run:

```sh
pnpm build
```

This both runs the asset manager and builds the project.
