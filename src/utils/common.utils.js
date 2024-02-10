import { AES, enc } from 'crypto-js';
import { convertHexToString } from 'xrpl';

export const clearLocalStrg = () => {
    localStorage.removeItem('token');
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
    let data = localStorage.getItem(key);
    if (!data) {
        return null;
    }

    data = decryptJSON(data);
    return data;
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
