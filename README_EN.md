# bId
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/bid/mod.ts)
[![codecov](https://codecov.io/github/windchime-yk/bid/graph/badge.svg?token=CVL3AFDJQQ)](https://codecov.io/github/windchime-yk/bid)

build IME dictionary.  
Created by Deno.

The goal is to create all IME user dictionaries from a single file.

## Language Support
- Japanese

## Dictionary Support
- Google Japanese IME
- macOS Japanese Input Method
- Gboard
- Microsoft IME

## Dictionary Table
| Name                          | Split Type | Can Set Genre | Can Set Word class |
| ----------------------------- | ---------- | ------------- | ------------------ |
| Google IME                    | TSV        | ✔             | ✔                  |
| macOS Japanese Input Method   | CSV        | ✗             | ✔                  |
| Gboard                        | TSV        | ✗             | ✗                  |
| Microsoft IME                 | TSV        | ✗             | ✔                  |

## Feature
- [ ] API
- [x] CLI
- [ ] Web App

## Install
``` bash
deno install --allow-read --allow-write --allow-run -n bid https://deno.land/x/bid/cli.ts
```

## Input File Extensions Support
- CSV
- JSON

Example files in `.xlsx` and `.ods` are included for use with spreadsheet software such as Microsoft Excel.  
Please check `example/input` for details.

## Usage
### All dictionaries
``` bash
bid --dir=example/input/raw --all
```

### Specific dictionaries
``` bash
bid --dir=example/input/raw --google --macos --microsoft --gboard
```

### Compress dictionaries
``` bash
bid --dir=example/input/raw --all --compress
```

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
        uses: actions/checkout@v4
      - name: Setup Deno
        uses: denoland/setup-deno@v1
        with:
          deno-version: v1.x
      - name: Output dictionary data
        run: |
          deno install --allow-read --allow-write -n bid https://deno.land/x/bid/cli.ts
          bid --dir=example/input/raw --all
      - name: Archive production artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dictionary
          path: bid_output
          retention-days: 30
```
