import axios from 'axios';
import { getUrlParam } from 'helper';

const ls = window.localStorage;


const cdn = axios.create({
    baseURL: `https://cdngarenanow-a.akamaihd.net/webid/Localize/${process.env.REACT_APP_LOCALIZE_NAME}/`,
    withCredentials: false,
    transformRequest: [(data, headers) => {
        delete headers[process.env.REACT_APP_TOKEN_HEADER_NAME]
        return data
    }]
})


export const toggle_popup = (bool, tipe) => ({
    type: 'TOGGLE_POPUP',
    bool,
    tipe
})


export const toggle_loader = (data) => ({
    type: 'TOGGLE_LOADER',
    data : data
})


export const put_data = (key, data) => ({
    type: "PUT_DATA",
    key,
    data
})


/**
 * 
 * Example of how to call API
 * 
 */
export const login = () => {
    return dispatch => {
        dispatch(toggle_loader(true))

        axios.get(process.env.REACT_APP_API_ENDPOINT)
        .then((resp) => {
            dispatch(put_data('login', resp.data))
        })
        .catch((err) => {
            dispatch(catch_error(err?.response?.data?.msg));
        })
        .then(()=>{
            dispatch(toggle_loader(false))
        })
    }
}


/**
 * 
 * Example of how to implement multi language 
 * 
 */
export const get_translate = (lang) => {
    return dispatch => {
        cdn.get(`${lang}.json?${Math.random() * 10000}`)
        .then(resp => {
            dispatch(put_data('lang_json', resp.data))
        })
        .catch(err => {

        })
    }
}


/**
 * 
 * Example of how to catch error if not logged in
 * 
 */
export const catch_error = (err_msg) => {
    return (dispatch) => {
        if (err_msg === 'not_logged_in') {
            const param = {
                accessToken: getUrlParam("access_token") || "",
                accountId: getUrlParam("account_id") || "",
                region: getUrlParam("region") || ""
            };

            ls.removeItem('cache');
            ls.removeItem('hash');

            window.location.href = `${`${process.env.REACT_APP_BASE_URL}?access_token=${param.accessToken}&account_id=${param.accountId}&region=${param.region}`}`;
        } else {
            if (err_msg) {
                dispatch(put_data('err_msg', err_msg))
            }
            dispatch(toggle_popup(true, 'error'))
            dispatch(toggle_loader(false))
        }
    }
}