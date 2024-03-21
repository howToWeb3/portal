import { jwtDecode } from 'jwt-decode';
import { enqueueSnackbar } from 'notistack';
import { Client } from 'xrpl';
import { ApiCall } from './api';
import { clearLocalStrg, getDataFromLocalStrg, saveInLocalStrg } from './common.utils';

export default function useXaman() {
    const autoLogin = async () => {
        try {
            const { token } = getDataFromLocalStrg('mb589_token', import.meta.VITE_ENCRYPTION_KEY);
            if (!token) {
                return false;
            }

            let decodedToken = jwtDecode(token);
            let currentDate = new Date();

            // JWT expires in 1 day
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                enqueueSnackbar('Please login to continue', { variant: 'info' });
                clearLocalStrg();
                return false;
            } else {
                return true;
            }
        } catch (err) {
            clearLocalStrg();
            return false;
        }
    };

    const handleLogin = async (setState, setContextState) => {
        try {
            const payload = {
                method: 'POST',
                url: 'xaman/qr-generate',
                encrypt: false,
                auth: false,
                data: {
                    TransactionType: 'SignIn',
                },
            };
            enqueueSnackbar('Scan using XUMM', { variant: 'info' });
            setState({ loading: true, openModal: true });
            const { data } = await ApiCall(payload);

            setState({ img: data.refs.qr_png });
            const { message, success } = await createWebSocketConnectionForLogin({ data, setState, setContextState });
            if (!success) {
                enqueueSnackbar(message, { variant: 'error' });
            }
            setState({
                img: '',
                opened: false,
                loading: false,
                openModal: false,
            });
        } catch (err) {
            setState({
                img: '',
                opened: false,
                loading: false,
                openModal: false,
            });
            setContextState({ address: '' });
            throw new Error(err);
        }
    };

    const createWebSocketConnectionForLogin = ({ data, setState, setContextState }) => {
        return new Promise((resolve, reject) => {
            let isOpened = false;
            const ws = new WebSocket(data.refs.websocket_status);

            ws.onmessage = async function (event) {
                const json = JSON.parse(event.data);

                if (json.signed != null && json.signed === false && isOpened) {
                    setContextState({ address: '' });
                    ws.close();
                    resolve({ success: false, message: 'Login request cancelled. Please try again' });
                    return;
                } else if (json.payload_uuidv4) {
                    const payload = {
                        method: 'GET',
                        url: 'xaman/validate',
                        params: {
                            uuid: json.payload_uuidv4,
                        },
                    };
                    const { data: validateUuidResponse, success } = await ApiCall(payload);

                    if (!success || !validateUuidResponse.token) {
                        ws.close();
                        setContextState({ address: '' });
                        resolve({ success: false, message: 'Please try again using XUMM' });
                        return;
                    }
                    if (validateUuidResponse.token) {
                        setContextState({
                            address: validateUuidResponse.address,
                            xamanToken: validateUuidResponse.xamanToken,
                        });
                        saveInLocalStrg('mb589_token', validateUuidResponse);
                        enqueueSnackbar('Success!', { variant: 'success' });
                        ws.close();
                        resolve({ success: true });
                        return;
                    }
                } else if (json.opened && !isOpened) {
                    isOpened = true;
                    enqueueSnackbar('Awesome!! swipe to accept', { variant: 'info' });
                    setState({ opened: true });
                }
            };

            ws.onerror = function (error) {
                setContextState({ address: '' });
                resolve({ success: false, message: 'Connection error: ' + error });
                return;
            };

            ws.onclose = function () {
                if (!isOpened) {
                    setContextState({ address: '' });
                    resolve({ success: false, message: 'Connection closed unexpectedly' });
                    return;
                }
            };
        });
    };

    // handle Create Order

    const handleCreateOrder = async (payload, setState) => {
        try {
            const client = new Client(import.meta.env.VITE_XRPL_WS_URL);
            await client.connect();
            payload.data = await client.autofill(payload.data);
            await client.disconnect();
            enqueueSnackbar('Scan using XUMM', { variant: 'info' });
            setState({ loading: true, openModal: true });
            const { data } = await ApiCall(payload);
            setState({ img: data.refs.qr_png, loading: false });
            const { message, success } = await wsForSwap({ data, setState });
            if (!success) {
                enqueueSnackbar(message, { variant: 'error' });
                return false;
            }
            setState({ loading: false });
            return true;
        } catch (err) {
            setState({
                img: '',
                openModal: false,
            });
            throw new Error(err);
        }
    };

    const wsForSwap = ({ data, setState }) => {
        return new Promise((resolve, reject) => {
            let isOpened = false;
            const ws = new WebSocket(data.refs.websocket_status);

            ws.onmessage = async function (event) {
                const json = JSON.parse(event.data);

                if (json.signed != null && json.signed === false && isOpened) {
                    ws.close();
                    resolve({ success: false, message: 'Request cancelled. Please try again' });
                } else if (json.payload_uuidv4) {
                    const payload = {
                        method: 'GET',
                        url: 'xaman/validate',
                        params: {
                            uuid: json.payload_uuidv4,
                            jwt: false,
                        },
                    };
                    const { success } = await ApiCall(payload);

                    ws.close();
                    if (!success) {
                        resolve({ success: false, message: 'Please try again using XUMM' });
                    } else {
                        enqueueSnackbar('Success!', { variant: 'success' });
                        resolve({ success: true });
                    }
                } else if (json.opened && !isOpened) {
                    isOpened = true;
                    enqueueSnackbar('Awesome!! swipe to accept', { variant: 'info' });
                    setState({ opened: true, loading: true });
                }
            };

            ws.onerror = function (error) {
                resolve({ success: false, message: 'Connection error: ' + error });
            };

            ws.onclose = function () {
                if (!isOpened) {
                    resolve({ success: false, message: 'Connection closed unexpectedly' });
                }
            };
        });
    };

    return { autoLogin, handleLogin, handleCreateOrder };
}
