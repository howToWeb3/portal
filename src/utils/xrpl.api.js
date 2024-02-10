import { ApiCall } from './api';

export async function fetchAccountDetails(address) {
    return new Promise((resolve, reject) => {
        ApiCall({
            url: 'user/account/details/',
            method: 'GET',
            params: {
                address,
            },
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export async function fetchAccountNfts(address) {
    return new Promise((resolve, reject) => {
        ApiCall({
            url: 'user/account/nfts/',
            method: 'GET',
            params: {
                address,
            },
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export async function fetchTrustlines(address) {
    return new Promise((resolve, reject) => {
        ApiCall({
            url: 'user/account/lines/',
            method: 'GET',
            params: {
                address,
            },
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}
