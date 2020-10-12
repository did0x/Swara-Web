const main_state = {
	login : false,
	loader: false,
	lang_json: false,
	popup_open: false,
	popup_type: false
}

const main = (state = main_state, action) => {
    switch (action.type) {
		case "PUT_DATA":
			return { ...state, [action.key]: action.data };
		case "TOGGLE_LOADER":
			return { ...state, loader: action.data}
		case "TOGGLE_POPUP":
			return { ...state, popup_open: action.bool, popup_type: action.tipe}
		default:
			return state;
	}
};

export default main;