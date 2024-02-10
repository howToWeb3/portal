import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { getDataFromLocalStrg } from './common.utils';

const ENV = import.meta.env.MODE.toUpperCase();

export const API_CONFIG = {
    PRODUCTION: {
        default: import.meta.env.VITE_DEFAULT_URL,
    },
    DEVELOPMENT: {
        default: import.meta.env.VITE_DEFAULT_URL,
    },
}[ENV];

export const ApiCall = payload => {
    const _axios = axios.create();

    if (payload.auth) {
        const jwToken = getDataFromLocalStrg('token', import.meta.VITE_ENCRYPTION_KEY);
        if (payload.method.toLowerCase() === 'get') {
            payload.params = {
                ...payload.params,
                token: jwToken,
            };
        } else {
            payload.data = {
                ...payload.data,
                token: jwToken,
            };
        }
    }

    if (payload.baseURLKey) {
        const baseurl = API_CONFIG[payload.baseURLKey];
        payload.baseURL = baseurl ? baseurl : payload.baseURL;
        delete payload.baseURLKey;
    }

    if (payload.baseURL === null || payload.baseURL === undefined) {
        const baseurl = API_CONFIG['default'];
        payload.baseURL = baseurl;
    }

    let axiosPayload = {
        url: payload.url || '',
        method: payload.method || 'get',
        baseURL: payload.baseURL || '',
        headers: payload.headers || {},
        params: payload.params || {},
        data: payload.data || {},
        config: payload.config || {},
        responseType: payload.responseType,
    };

    console.log(
        `[${axiosPayload.method.toUpperCase()}] Request for API:`,
        ' ',
        axiosPayload.baseURL + axiosPayload.url,
        ' ',
        payload,
    );

    return new Promise(function (resolve, reject) {
        _axios(axiosPayload)
            .then(({ data }) => {
                // JWT Token Invalid or Expired Case
                if (data.message === 'JWT validation failed') {
                    enqueueSnackbar('Please login to continue', { variant: 'info' });
                    localStorage.removeItem('token');
                    window.location.href = window.location.origin;
                }

                resolve(data);
            })
            .catch(error => {
                if (error.response.data.message) {
                    enqueueSnackbar(error.response.data.message, { variant: 'error' });
                }
                reject(error);
            });
    });
};
