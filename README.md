# cryptowallet-cli [![GitHub stars](https://img.shields.io/github/stars/yerofey/cryptowallet-cli.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/yerofey/cryptowallet-cli/stargazers/)

[![NPM package yearly downloads](https://badgen.net/npm/dt/@yerofey/cryptowallet-cli)](https://npmjs.com/@yerofey/cryptowallet-cli)
[![Minimum Node.js version](https://badgen.net/npm/node/@yerofey/cryptowallet-cli)](https://npmjs.com/@yerofey/cryptowallet-cli)
[![NPM package version](https://badgen.net/npm/v/@yerofey/cryptowallet-cli)](https://npmjs.com/package/@yerofey/cryptowallet-cli)

> Crypto wallet generator CLI tool (currently works only on Mac and Linux, sorry Windows users)

![Screenshot](https://i.imgur.com/uWuT4lF.png)

## Features

- [x] Generate new crypto wallet offline
- [x] Generate wallet address with prefix (string at the start): [`-p`]
- [x] Generate wallet address with suffix (string at the end): [`-s`]
- [x] Generate wallet with different formats (for Bitcoin: Legacy, SegWit, Bech32; for BNB: BEP2, BEP20): [`-f`]
- [x] Generate wallet from your desired mnemonic string: [`-m`]
- [x] Generate only mnemonic string: [`-m`]
- [x] Generate a lot of wallets at once: [`-n`]
- [x] Save result into a CSV file: [`--csv`]

*check the Options section for all supported commands*

## Install

```bash
# via NPM
$ npm i -g @yerofey/cryptowallet-cli

# via PNPM
$ pnpm add -g @yerofey/cryptowallet-cli

# via Yarn
$ yarn global add @yerofey/cryptowallet-cli
```

## Usage

```bash
# generate random ERC-like wallet (ETH, BNB, POLYGON, ...)
$ cw

# generate random BTC wallet (default format: bech32 - "bc1q...")
$ cw -c btc

# generate N random wallets (default coin is ETH/ERC-like)
$ cw -n 10

# generate random ERC-like wallet with desired prefix
$ cw -p aaa

# generate random BTC wallet with desired prefix (case-insensitive)
$ cw -c BTC -p ABC

# generate random BTC wallet with desired prefix (case-sensitive)
$ cw -c BTC -P abc

# generate random BTC wallet with desired suffix (case-insensitive)
$ cw -c BTC -s ABC

# generate random BTC wallet with desired suffix (case-sensitive)
$ cw -c BTC -S abc

# generate BTC legacy wallet ("1...")
$ cw -c BTC -f legacy

# generate BTC segwit wallet ("3...")
$ cw -c BTC -f segwit

# generate BTC bech32 wallet from mnemonic string
$ cw -c BTC -f bech32 -m "radio bright pizza pluck family crawl palm flame forget focus stock stadium"

# generate N of BTC bech32 wallets from mnemonic string
$ cw -c BTC -f bech32 -n 10 -m "radio bright pizza pluck family crawl palm flame forget focus stock stadium"

# generate ERC-like wallet from mnemonic string
$ cw -m "radio bright pizza pluck family crawl palm flame forget focus stock stadium"

# generate BNB (BEP2) wallet from mnemonic string
$ cw -c BNB -f BEP2 -m "radio bright pizza pluck family crawl palm flame forget focus stock stadium"

# generate BNB (BEP20) wallet from mnemonic string
$ cw -c BNB -f BEP20 -m "radio bright pizza pluck family crawl palm flame forget focus stock stadium"

# generate wallet and save the output into CSV file ("cw-output.csv" by default)
$ cw -c btc --csv

# generate few wallets and save the output into CSV file with custom name "new.csv"
$ cw -c btc -n 10 -D new

# generate just a mnemonic string (12 words) to import in any wallet app
$ cw -m

# list all supported blockchains
$ cw -l
```

## Blockchains supported

- `BTC` (Bitcoin) [legacy, segwit, bech32]
- `ETH` (Ethereum)
- `BNB` (Binance Coin) [BEP2, BEP20, ERC20]
- `DOGE` (Dogecoin) [legacy, segwit, bech32]
- `BCH` (Bitcoin Cash)
- `LTC` (Litecoin) [legacy, segwit, bech32]
- `POLYGON` (Polygon)
- `TRX` (Tron)
- `XTZ` (Tezos)
- `DASH` (Dash)
- `DCR` (Decred)
- `ZEC` (Zcash)
- `QTUM` (Qtum)
- `BTG` (Bitcoin Gold)
- `ONE` (Harmony)
- `DGB` (DigiByte)
- `RDD` (ReddCoin)
- `VTC` (Vertcoin)
- `MONA` (MonaCoin)
- `NMC` (NameCoin)
- `PPC` (PeerCoin)
- `BLK` (BlackCoin)
- `VIA` (Viacoin)
- `NBT` (NIX Bridge Token)

*all other cryptos that are tokens in the ecosystems like Ethereum, Binance Smart Chain or Polygon and others (EVM compatible) are supported too, you just need to create ERC wallet (that is set by default)*

## Options

- `-b` or `-c` or `--chain`: Specify the blockchain ticker to generate a wallet for
- `-D` or `--csv`: Save output into CSV file with custom or default name ("`cw-output.csv`") - this is a shorthand for `-o csv -F filename`
- `-f` or `--format`: Specify the blockchain wallet format (for BTC: legacy, segwit, bech32)
- `-g` or `--geek`: Display some additional "geeky" info
- `-l` or `--list`: List all supported blockchains
- `-m` or `--mnemonic`: Use a bip39 mnemonic phrase (if is set) to generate wallet, or leave it empty to generate new one
- `-n` or `--number`: Specify number of wallets to display (works for HD wallets only, like BTC/LTC/DOGE)
- `-p` or `--prefix`: Specify desired prefix for the wallet address (**case-insensitive**)
- `-P` or `--prefix-sensitive`: Specify desired prefix of the wallet address (**case-sensitive**)
- `-s` or `--suffix`: Specify desired suffix for the wallet address (**case-insensitive**)
- `-S` or `--suffix-sensitive`: Specify desired suffix for the wallet address (**case-sensitive**)
- `-v` or `--version`: Display current version of CW tool

**Currently not necessary options:**

- `-F` or `--filename`: Specify a filename (without extension) to output the data (works only with `-o` argument)
- `-o` or `--output`: Specify a file format (currently only `csv` supported) to output the generated data

## Node.js supported versions

- [x] v16.x ✅
- [ ] v17.x ⛔
- [x] v18.x ✅
- [x] v19.x ✅

*tested on Mac M1*

## TODO

- [ ] Windows support
- [ ] SegWit Bech32 wallet address support for all Bitcoin forks
- [ ] More EVM compatible cryptos
- [ ] tests

## Author

[Yerofey S.](https://github.com/yerofey)

Contact me: [Email](mailto:pm@yerofey.dev), [Telegram](https://t.me/etofej)

## License

[MIT](https://github.com/yerofey/cryptowallet-cli/blob/master/LICENSE)
