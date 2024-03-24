import { AES, enc } from 'crypto-js';
import { convertHexToString } from 'xrpl';

export const clearLocalStrg = () => {
    localStorage.removeItem('how_to_web3_token');
};

export const encryptJSON = data => {
    const encrypt = AES.encrypt(JSON.stringify(data), import.meta.env.VITE_ENCRYPTION_KEY).toString();
    return encrypt;
};

export const updateArrayAtIndex = (arr, index, newValue) => {
    return arr.map((value, i) => (i === index ? newValue : value));
};

export const decryptJSON = data => {
    const bytes = AES.decrypt(data, import.meta.env.VITE_ENCRYPTION_KEY);
    const str = enc.Utf8.stringify(bytes);
    return JSON.parse(str);
};

export const saveInLocalStrg = (key, data) => {
    data = encryptJSON(data);
    localStorage.setItem(key, data);
};

export const getDataFromLocalStrg = key => {
    try {
        let data = localStorage.getItem(key);
        if (!data) {
            return null;
        }

        data = decryptJSON(data);
        return data;
    } catch (err) {
        return null;
    }
};

export const numberWithCommas = x => {
    if (x === undefined || x === null) return;

    let parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 4);
    }

    return parts.join('.');
};

export const renderValue = value => {
    if (value === undefined || value === null) return '-';

    if (typeof value === 'string') {
        return value;
    }

    if (typeof value === 'number') {
        return numberWithCommas(value);
    }

    if (typeof value === 'object') {
        return JSON.stringify(value);
    }

    return value;
};

export const xrplTokenName = value =>
    value?.length === 40 ? convertHexToString(value).replaceAll('\u0000', '') : value;

export const getIPFSUrl = ipfsHash => {
    if (!ipfsHash) {
        return '';
    }

    if (ipfsHash.startsWith('https://ipfs.io/ipfs/')) {
        return ipfsHash;
    }

    if (ipfsHash.startsWith('http://') || ipfsHash.startsWith('https://')) {
        // If the input is already a valid URL, return it as is
        return ipfsHash;
    }

    // Check if the input starts with "ipfs://"
    if (ipfsHash.startsWith('ipfs://ipfs/')) {
        // get everything after "ipfs://ipfs" there can be more things before ipfs://
        const hash = ipfsHash.split('ipfs://ipfs/')[1];
        console.log(hash, ipfsHash);
        ipfsHash = hash;
    } else if (ipfsHash.startsWith('ipfs://')) {
        // get everything after "ipfs://"
        const hash = ipfsHash.split('ipfs://')[1];
        ipfsHash = hash;
    }

    // Construct the URL using the ipfs.io gateway
    const url = `https://ipfs.io/ipfs/${ipfsHash}`;
    return url;
};
