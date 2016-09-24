import keyMirror from "keymirror";
const CURRENCY = keyMirror({
	UAH : null,
	USD : null,
	EUR : null,
	RUR : null,
	BTC : null
});

const ACTIONS = keyMirror({
	UPDATE_ENTERED_VALUE: null,
	UPDATE_ENTERED_CCY: null,
});

const URLS = {
	GET_CURRENCIES: "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
};

export {
	CURRENCY, ACTIONS, URLS
};