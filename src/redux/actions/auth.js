import axios from "axios";
import * as main from "./main";
import {
    getUrlParam,
    setLsObject,
    getLsObject,
    setHash,
    getHash,
    setCache,
    getCache,
    throttle,
    encryptPayload,
    resetThrottle,
    setPdc,
    analyticsAPICallErrorReporting
} from 'helper';

const ls = window.localStorage;

export const set_token = () => {
    return (dispatch) => {
        const param = {
            accessToken: getUrlParam("access_token") || "",
            accountId: getUrlParam("account_id") || "",
            region: getUrlParam("region") || "",
            nickname: getUrlParam("nickname") | ""
        };

        const isDifferentAccount = () => {
            return param.accountId &&
                param.accountId !== getLsObject("param")?.accountId
                ? true
                : false;
        };

        if (isDifferentAccount()) {
            ls.clear();
            setLsObject("param", param);
            dispatch(get_jwt(param));
        } else {
            if (param.accessToken && param.accountId) {
                setLsObject("param", param);
                dispatch(get_jwt(param));
            } else {
                const param = getLsObject("param");
                if (param?.accessToken && param?.accountId) {
                    dispatch(main.toggle_loader(true));
                    if (throttle("example", 1000)) {
                        dispatch(main.put_data('example', getCache('example')));
                    } else {
                        dispatch(get_hash('example'));
                    }
                } else {
                    // Toggle popup not logged in
                }
            }
        }
    };
};

export const get_jwt = (param) => {
    const { accessToken, accountId, nickname } = param;

    if (!getCache("jwt_token")) {
        resetThrottle("jwt_token");
    }

    return (dispatch) => {
        // 43200000 = 12 hours
        if (!throttle("jwt_token", 43200000)) {
            dispatch(main.toggle_loader(true));
            axios.get(`oauth/callback/?access_token=${accessToken}&account_id=${accountId}`)
                .then((resp) => {
                    setCache("jwt_token", resp.data.token);
                    dispatch(get_hash("dlt", param));
                }).catch((err) => {
                    dispatch(main.catch_error(err?.response?.data?.msg));

                    // Send error to analytics
                    analyticsAPICallErrorReporting(err);
                });
        } else {
            window.location.href = `${process.env.REACT_APP_BASE_URL}`;
        }
    };
};

const hash = axios.create({
    baseURL: process.env.REACT_APP_API_HASH,
});

export const get_hash = (key) => {
    const param = getLsObject("param");
    const setKey = () => {
        if (key === "dlt") {
            return `event.game.garena.com:dlt:${param.accountId}`;
        } else {
            return `event:api:${key}`;
        }
    };

    const data = {
        key: setKey(),
    };

    const payload = JSON.stringify(data);

    return (dispatch) => {
        const fetch_data = (fetch = true) => {
            switch (key) {
                case "dlt":
                    if (fetch) {
                        dispatch(get_dlt(param.accountId, param.region));
                    } else {
                        window.location.href = `${process.env.REACT_APP_BASE_URL}`;
                    }
                    break;
                case "example":
                    if (fetch) {
                        // Fetch new data from endpoint that match the key
                        // dispatch(main.example());
                    } else {
                        // If there's not required to fetch data from main API,
                        // Just simply get data for state from cache.
                        // Or, if theres no data in cache, just get data from PDC and set it to cache.
                        dispatch(get_pdc('example'));
                        dispatch(main.put_data('example', getCache('example')));

                        // You need to set loader to false in here to prevent infinite loader toggled
                        dispatch(main.toggle_loader(false));
                    }
                    break;
                default:
                    break;
            }
        };

        hash.post(`api/get_hash`, payload)
            .then((resp) => {
                if (resp.data.value === "Not Found") {
                    fetch_data(true);
                    dispatch(set_hash(key));
                } else {
                    if (key === "history") {
                        setHash(key, resp.data);
                        if (!getCache("history")) {
                            fetch_data(true);
                        } else if (resp.data.ttl > 0) {
                            fetch_data(false);
                        } else {
                            fetch_data(true);
                        }
                    } else {
                        if (getHash(key)?.value === resp.data.value) {
                            fetch_data(false);
                        } else {
                            setHash(key, resp.data);
                            fetch_data(true);
                        }
                    }
                }
            }).catch((err) => {
                console.log(err);
                analyticsAPICallErrorReporting(err);
            });
    };
};

export const set_hash = key => {
    const param = getLsObject("param");
    const setKey = () => {
        if (key === "dlt") {
            return `event.game.garena.com:dlt:${param.accountId}`;
        } else {
            return `event:api:${key}`;
        }
    };

    // 43200000 = 12 hours
    const data = {
        key: setKey(),
        timeout: 43200000
    };

    const payload = JSON.stringify(data);

    return dispatch => {
        hash.post(`api/set_hash`, payload)
            .then(resp => {
                setHash(key, resp.data);
            }).catch((err) => {
                console.log(err);
                analyticsAPICallErrorReporting(err);
            });
    }
};

const dlt = axios.create({
    baseURL: process.env.REACT_APP_API_DLT,
});

const get_dlt = () => {
    const param = getLsObject("param");
    const data = {
        account: param.accountId,
        region: param.region,
        event: "event.game.garena.com",
    };
    const payload = {
        payload: encryptPayload(data, "dlt"),
    };

    return (dispatch) => {
        dlt.post(`api/checkin/`, payload)
            .then((resp) => {
                console.log(resp.data);
            }).catch((err) => {
                console.log(err);
                analyticsAPICallErrorReporting(err);
            }).then(() => {
                window.location.href = `${process.env.REACT_APP_BASE_URL}`;
            });
    };
};

const pdc = axios.create({
    baseURL: process.env.REACT_APP_API_PDC,
});

const get_pdc = key => {
    const payload = {
        key: 'test'
    };

    return dispatch => {
        pdc.post('api/get_value', payload)
            .then(resp => {
                setPdc(key, resp.data);
            }).catch(err => {
                console.log(err);
                analyticsAPICallErrorReporting(err);
            });
    }
};

export const set_pdc = (key, value) => {
    const payload = {
        key: key,
        value: value,
        timeout: 3600
    };

    return dispatch => {
        pdc.post('api/set_value', payload)
            .then(resp => {
                console.log(resp.data);
            }).catch(err => {
                console.log(err);
                analyticsAPICallErrorReporting(err);
            });
    }
};