import CryptoJS from "crypto-js";

const ls = window.localStorage;


export const removeParamUrl = () => {
    const location = window.location;
    window.history.pushState({}, document.title, location.origin + location.pathname);
}


/**
 * 
 * @param {string} pa - Unique key of search string on url.
 */
export const getUrlParam = (pa) => {
    var url = window.location.href.replace(/#+.*$/,),
        params = url.substring(url.indexOf("?") + 1, url.length).split("&"),
        param = {};

    for (var i = 0; i < params.length; i++) {
        var pos = params[i].indexOf('='),
            key = params[i].substring(0, pos),
            val = params[i].substring(pos + 1);

        param[key] = val;
    }

    return (typeof (param[pa]) === "undefined") ? false : param[pa];
}


/**
 * 
 * @param {object} err - Error response object from axios.
 */
export const err_msg = (err) => {
    if (err.response) {
        switch (err.response.status) {
            case 500:
                return "Please Refresh Your Browser!";
            default:
                return err.response.data.msg;
        }
    } else if (err.request) {
        return "Please Refresh Your Browser!";
    } else {
        return "Please Refresh Your Browser!";
    }
}


/**
 * 
 * @param {string} key - Unique key for storing and identifying your data in local storage.
 * @param {*} values - Value of data you want store in local storage.
 */
export const setLsObject = (key, values) => {
    ls.setItem(key, JSON.stringify(values));
};


/**
 * 
 * @param {string} key - Unique key for accessing your stored data in local storage.
 * @returns {*} - Return any type of data you stored.
 */
export const getLsObject = key => {
    return JSON.parse(ls.getItem(key));
};


/**
 * 
 * @param {string} key - Unique key for storing your hash data in local storage.
 * @param {*} values - Value of data from hash endpoint you want store in local storage.
 */
export const setHash = (key, values) => {
    setLsObject('hash', {
        ...getLsObject('hash'),
        [key]: values,
    });
};


/**
 * 
 * @param {string} key - Unique key for accessing your hash data in local storage.
 * @returns {*} - Return any type of data you stored.
 */
export const getHash = key => {
    return getLsObject('hash')?.[key];
};


/**
 * 
 * @param {string} key - Uniue key for storing your cached data in local storage.
 * @param {*} values - Value of data from any endpoint you want to be cached.
 */
export const setCache = (key, values) => {
    setLsObject('cache', {
        ...getLsObject('cache'),
        [key]: {
            ...getLsObject('cache')[key],
            data: values,
        },
    });
};


/**
 * 
 * @param {string} key - Unique key for accessing your cached data in local storage.
 * @returns {*} - Return any type of data you cached.
 */
export const getCache = (key) => {
    return getLsObject('cache')?.[key]?.data;
};


/**
 * 
 * @param {string} key - Unique key for storing your PDC data in local storage.
 * @param {*} value - Value of data from PDC endpoint you want to store.
 */
export const setPdc = (key, value) => {
    setLsObject('pdc', {
        ...getLsObject('pdc'),
        [key]: value,
    });
};


/**
 * 
 * @param {string} key - Unique key for accessing your PDC data in local storage.
 * @returns {*} - Return any type of data you stored.
 */
export const getPdc = key => {
    return getLsObject('pdc')?.[key]?.value;
};


/**
 * 
 * @param {string} key - Reset cached data.
 */
export const resetThrottle = key => {
    setLsObject('cache', {
        ...getLsObject('cache'),
        [key]: {}
    });
};


/**
 * 
 * @param {string} key - Unique key for identifying your data on cache.
 * @param {number} ms - Number of miliseconds that data you want to throttle.
 */
export const throttle = (key, ms) => {
    const now = new Date();
    const item = getLsObject('cache');
    const lastTime = item?.[key]?.time || 0;

    const timeDiff = now.getTime() - lastTime;

    if (timeDiff < ms) {
        return true;
    } else {
        setLsObject('cache', {
            ...getLsObject('cache'),
            [key]: {
                ...getLsObject('cache')?.[key],
                time: now.getTime(),
            }
        });

        return false;
    }
};


/**
 * 
 * @param {*} payload - Payload that you want to encrypt
 * @param {string} type - Type of the payload.
 */
export const encryptPayload = (payload, type) => {
    let passphrase = "";

    if (type === 'standalone') {
        passphrase = 'WTXkexHGcqEnTRmjGHA5';
    } else if ((type = 'dtl')) {
        passphrase = 'PUTkexHGcqEnRmjAPS95';
    }

    const jsonPayload = JSON.stringify(payload);

    const ctObj = CryptoJS.AES.encrypt(jsonPayload, passphrase);
    const ctStr = ctObj.toString();

    return ctStr;
};