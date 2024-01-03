# bId
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/bid/mod.ts)

build IME dictionary. Working in progress.  
Created by Deno.

## Language Support

- Japanese

## Dictionary Support

- Google Japanese IME
- Kotoeri

## Dictionary Table

| Name                | Split Type | Can Set Genre | Can Set Word class |
| ------------------- | ---------- | ------------- | ------------------ |
| Google Japanese IME | TSV        | ✔             | ✔                  |
| Kotoeri             | CSV        | ✗             | ✗                  |
| Gboard              | TSV        | ✗             | ✗                  |
| Microsoft IME       | TSV        | ✗             | ✔                  |

## Feature

- [ ] API
- [x] CLI
- [ ] Web App

## Build dictionary workflow example
``` yml
name: Build IME dictionary
on:
  pull_request:
    types: [closed]

jobs:
  upload:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
      - name: Setup Deno
        uses: denolib/setup-deno@v2
        with:
          deno-version: v1.x
      - name: Output dictionary data
        run: |
          deno install --allow-read --allow-write -n bid https://deno.land/x/bid/cli.ts
          bid --dir=test/mock --all
      - name: Archive production artifacts
        uses: actions/upload-artifact@v2
        with:
          name: dictionary
          path: bid_output
          retention-days: 30
```
