async function generateWallet(coin, options = {}) {
    let coinData = options.coinData || {};
    let coinRow = options.coinRow || {};
    let format = options.format || '';
    let mnemonicString = options.mnemonic || '';
    let number = options.number || 1;

    let result = {};

    if (coinRow.formats !== undefined) {
        Object.assign(result, {
            formats: Object.keys(coinRow.formats)
        });
    }

    if (coinData == []) {
        return {
            error: 'coin not found'
        }
    }

    if (coinData.script == 'coinkey') {
        const CoinKey = require('coinkey');
        const CoinInfo = require('coininfo');

        const wallet = CoinKey.createRandom(CoinInfo(coin).versions);

        result = Object.assign(result, {
            format,
            address: wallet.publicAddress,
            privateKey: wallet.privateWif,
        });
    } else if (coin == 'BTC') {
        const bip39 = require('bip39');
        const bip84 = require('bip84');

        if (mnemonicString != '' && !bip39.validateMnemonic(mnemonicString)) {
            return {
                error: 'mnemonic is not valid'
            }
        }

        const mnemonic = mnemonicString || bip39.generateMnemonic();
        const root = new bip84.fromSeed(mnemonic);
        const child = root.deriveAccount(0);
        const account = new bip84.fromZPrv(child);

        let addresses = [];
        if (number >= 1) {
            for (let i = 0; i < number; i++) {
                addresses.push({
                    index: i,
                    address: account.getAddress(i, false, coinData.purpose),
                    privateKey: account.getPrivateKey(i)
                });
            }
        }

        Object.assign(result, {
            format: coinData.format,
            addresses,
            privateExtendedKey: account.getAccountPrivateKey(),
            mnemonic
        });
    } else if (coin == 'DOGE' || coin == 'LTC') {
        const bip39 = require('bip39');
        const bip84 = require(coinRow.title.toLowerCase() + '-bip84');

        if (mnemonicString != '' && !bip39.validateMnemonic(mnemonicString)) {
            return {
                error: 'mnemonic is not valid'
            }
        }

        const mnemonic = mnemonicString || bip39.generateMnemonic();
        const root = new bip84.fromMnemonic(mnemonic, '');
        const child = root.deriveAccount(0);
        const account = new bip84.fromZPrv(child);

        let addresses = [];
        if (number >= 1) {
            for (let i = 0; i < number; i++) {
                addresses.push({
                    index: i,
                    address: account.getAddress(i, false, coinData.purpose),
                    privateKey: account.getPrivateKey(i)
                });
            }
        }

        Object.assign(result, {
            format: coinData.format,
            addresses,
            privateExtendedKey: account.getAccountPrivateKey(),
            mnemonic
        });
    } else if (coinData.format == 'BEP2') {
        const bip39 = require('bip39');
        const bCrypto = require('@binance-chain/javascript-sdk/lib/crypto');

        if (mnemonicString != '' && !bip39.validateMnemonic(mnemonicString)) {
            return {
                error: 'mnemonic is not valid'
            }
        }

        const mnemonic = mnemonicString || bip39.generateMnemonic();
        const privateKey = bCrypto.getPrivateKeyFromMnemonic(mnemonic, true, 0);

        Object.assign(result, {
            format: 'BEP2',
            address: bCrypto.getAddressFromPrivateKey(privateKey, 'bnb'),
            privateKey,
            mnemonic
        });
    } else if (coinData.network == 'EVM') {
        const bip39 = require('bip39');
        const pkutils = require('ethereum-mnemonic-privatekey-utils');
        const { Account } = require('eth-lib/lib');

        if (mnemonicString != '' && !bip39.validateMnemonic(mnemonicString)) {
            return {
                error: 'mnemonic is not valid'
            }
        }

        const mnemonic = mnemonicString || bip39.generateMnemonic();
        const privateKey = pkutils.getPrivateKeyFromMnemonic(mnemonic);
        const account = Account.fromPrivate('0x' + privateKey);

        Object.assign(result, {
            format: coinData.format || '',
            address: account.address,
            privateKey: privateKey,
            mnemonic
        });
    } else if (coin == 'ONE') {
        const bip39 = require('bip39');
        const { Wallet } = require('@harmony-js/account');

        if (mnemonicString != '' && !bip39.validateMnemonic(mnemonicString)) {
            return {
                error: 'mnemonic is not valid'
            }
        }

        const wallet = new Wallet();
        const mnemonic = mnemonicString || bip39.generateMnemonic();
        wallet.addByMnemonic(mnemonic);
        const publicKey = wallet.accounts[0];
        const account = wallet.getAccount(publicKey);

        Object.assign(result, {
            address: account.bech32Address,
            privateKey: account.privateKey,
            mnemonic
        });
    } else if (coin == 'TRX') {
        // TODO: add mnemonic
        const tronWeb = require('tronweb');

        try {
            const wallet = await tronWeb.createAccount();

            Object.assign(result, {
                address: wallet.address.base58,
                privateKey: wallet.privateKey
            });
        } catch (error) {
            return {
                error
            }
        }
    } else if (coin == 'XTZ') {
        const tezos = require('tezos-sign');
        const wallet = tezos.generateKeysNoSeed();

        return {
            address: wallet.pkh,
            privateKey: wallet.sk
        }
    } else {
        return {
            error: 'coin is not supported yet'
        }
    }

    if (coinData.tested !== undefined && coinData.tested == false) {
        Object.assign(result, {
            tested: false
        });
    }

    return result;
}

function generateMnemonicString() {
    const bip39 = require('bip39');

    return bip39.generateMnemonic();
}

module.exports.generateWallet = generateWallet;
module.exports.generateMnemonicString = generateMnemonicString;