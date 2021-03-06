# Particula Project Documentation

[![Markdown Linter](https://github.com/vives-projectwerk-2-2020/particula.devbitapp.be/workflows/Markdown%20Linter/badge.svg)](https://github.com/vives-projectwerk-2-2020/particula.devbitapp.be/actions?query=workflow%3A%22Markdown+Linter%22)
[![Netlify Status](https://api.netlify.com/api/v1/badges/e993b907-a2e3-4e18-84dc-82dafae876eb/deploy-status)](https://app.netlify.com/sites/particula/deploys)

This project is using markdown and VuePress to generate a static site.

## Development

Clone this project and install dependencies

```shell
git clone git@github.com:vives-projectwerk-2-2020/particula.devbitapp.be.git
cd particula.devbitapp.be
npm install
```

Setup local dev server

```shell
npm run docs:dev
```

Open your browser and go to [http://localhost:8080](http://localhost:8080) to
preview the result.

## Checking for Markdown errors

Run the linter tool to check if any Markdown syntax errors in your files:

```bash
npm run lint
```
