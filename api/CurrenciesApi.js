import {URLS} from "./../constants"

export function getCurrencies(callback) {
	fetch(URLS.GET_CURRENCIES, {method: "GET"})
		.then(response => response.json())
		.then((json) => {
			return callback(json);
		})
		.catch((error) => {
			console.error(error);
		});
}